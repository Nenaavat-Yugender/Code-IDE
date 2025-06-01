var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');       // Importing bcrypt for password hashing
var jwt = require('jsonwebtoken');     // Importing jsonwebtoken for token generation
var projectModule = require('../models/projectModel'); // Importing the project model
var userModel = require('../models/userModel'); // Importing the user model
const projectModel = require('../models/projectModel');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

const secret = "secret";                                                  // Secret key for JWT signing, should be stored in an environment variable in production


//signUp API
router.post('/signUp', async (req, res) => {
  let { username, name, email, password } = req.body;                   // getting user details from the request body
  console.log("signup info",req.body);
  let emailCondition = await userModel.findOne({ email: email });          // Check if the username already exists
  if (emailCondition) {
    res.json({ success: false, message: "Email already exists" });
  }
  else {                                                            //if the email does not exist, create a new user
    bcrypt.genSalt(10, (err, salt) => {                              // Hashing the password before saving it to the database
      bcrypt.hash(password, salt, function (err, hash) {
        let user = userModel.create({
          name: name,
          userName: username,
          email: email,
          password: hash,                                         // Storing the hashed password
        });
      });
    });

    res.json({ success: true, message: "User created successfully" }); // Respond with success message and user details
  }
})

//login API
router.post('/login', async (req, res) => {
  let { email, password } = req.body;                                                 // getting user details from the request body
  console.log("login info",req.body);
  let user = await userModel.findOne({ email: email });                               // Check if the users email exists in the database

  if (user) {                                                                           //if user exists in DB
    bcrypt.compare(password, user.password, (err, result) => {                         //hashing the provided password and Comparing it with the hashed password in DB 
      //if res === true then provided password is correct
      if (result) {
        let token = jwt.sign({ email: user.email, userId: user._id }, secret);        // Generate a JWT token with user email and ID
        return res.json({ success: true, message: "Login successful", token: token, userId: user._id });             // Respond with success message and user details
      }
      else {
        return res.json({ success: false, message: "Invalid credentials" });
      }
    });
  }
  else {
    res.json({ success: false, message: "User not found" });                          //if user does not exist in DB
  }
})

//userDetails API
router.post('/getUserDetails', async (req, res) => {
  let { userId } = req.body;
  console.log("user detail info",userId);
  let user = await userModel.findOne({ _id: userId });        // Fetch user details from the database using the user ID
  console.log(user);
  if (user) {
    return res.json({ success: true, message: "User details fetched successfully", user: user });          // Respond with success message and user details
  }
  else {
    return res.json({ success: false, message: "User not found" });          //if user does not exist in DB
  }
})

//createProject API
router.post('/createProject', async (req, res) => {
  let { title, userId } = req.body;                                                                   // getting project details from the request body
  console.log("crrate project info",req.body);
  let user = await userModel.findOne({ _id: userId });                                                // Check if the user exists in the database
  if(user){
    let project =  await projectModule.create({
      title: title,
      createdBy: userId                                                                        
    })

    return res.json({ success: true, message: "Project Created Successfully", projectId: project._id})
  }
  else{
    return res.json({ success: false, message: "user not found" });          //if user does not exist in DB
  }
 
});

//getProjects API
router.post('/getProjects', async (req, res) => {
  let { userId } = req.body;                                                                   // getting user ID from the request body
  console.log("get project info",req.body);
  let user = await userModel.findOne({ _id: userId });                                                // Check if the user exists in the database
  if(user){
    let projects = await projectModule.find({ createdBy: userId });                                // Fetch projects created by the user
    return res.json({ success: true, message: "Projects fetched successfully", projects: projects });
  }
  else{
    return res.json({ success: false, message: "user not found" });          //if user does not exist in DB
  }
});

//deleteProject API
router.post('/deleteProject', async (req, res) => {
  let { userId , projectId } = req.body;                                                                   // getting project ID from the request body
  console.log("delete project ifo" ,req.body);
  let user = await userModel.findOne({ _id: userId });                                                // Check if the project exists in the database
  if(user){
    let project = await projectModule.findByIdAndDelete({ _id: projectId });                                // Delete the project from the database
    return res.json({ success: true, message: "Project deleted successfully" });
  }
  else{
    return res.json({ success: false, message: "User not found" });           //if project does not exist in DB
  }
});

//getProjectCode API      (to get the default code og html,css and js)
router.post("/getProject", async (req, res) => {
  let {userId,projId} = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    let project = await projectModel.findOne({ _id: projId });
    return res.json({ success: true, message: "Project fetched successfully", project: project });
  }
  else{
    return res.json({ success: false, message: "User not found!" });
  }
});

//updateProject API        (to save the code written by the user in the editor)
router.post("/updateProject", async (req, res) => {
  let { userId, htmlCode, cssCode, jsCode, projId } = req.body;
  let user = await userModel.findOne({ _id: userId });

  if (user) {
    let project = await projectModel.findOneAndUpdate(
      { _id: projId },
      { htmlCode: htmlCode, cssCode: cssCode, jsCode: jsCode },
      { new: true } // This option returns the updated document
    );

    if (project) {
      return res.json({ success: true, message: "Project updated successfully" });
    } else {
      return res.json({ success: false, message: "Project not found!" });
    }
  } else {
    return res.json({ success: false, message: "User not found!" });
  }
});




module.exports = router;
