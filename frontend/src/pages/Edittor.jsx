import React, { useEffect, useState } from 'react';
import EditorNavbar from '../components/EditorNavbar';
import Editor from '@monaco-editor/react';
import { MdLightMode } from "react-icons/md";
import { FaExpandAlt } from "react-icons/fa";
import { api_base_url } from '../helper';
import { useParams } from 'react-router-dom'; // Importing useParams to access URL parameters

const Edittor = () => {
  const [isLightMode, setIsLightMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [tab, setTab] = useState("HTML");

  // useState 2nd variable is a function to update the state
  const [htmlCode, setHtmlCode] = useState("<h1>Hello World</h1>");
  const [cssCode, setCssCode] = useState("body { background-color : #f4f4f4; }");
  const [jsCode, setJsCode] = useState("//comment");

  // Extract projectID from URL using useParams
  const { projectID } = useParams();

  // Function to toggle light/dark mode
  const changeTheme = () => {
    const editorNavbar = document.querySelector(".EditorNavbar");
    if (isLightMode) {
      editorNavbar.style.background = "#141414";
      document.body.classList.remove("lightMode");
      setIsLightMode(false);
    } else {
      editorNavbar.style.background = "#f4f4f4";
      document.body.classList.add("lightMode");
      setIsLightMode(true);
    }
  };

  // Function to update the iframe with code
  const run = () => {
    const html = htmlCode;
    const css = `<style>${cssCode}</style>`;
    const js = `<script>${jsCode}<\/script>`;
    const iframe = document.getElementById("iframe");

    if (iframe) {
      iframe.srcdoc = html + css + js;
    }
  };

  // Update iframe whenever any code changes
  useEffect(() => {
    const timeout = setTimeout(run, 200);
    return () => clearTimeout(timeout);
  }, [htmlCode, cssCode, jsCode]);

  // Fetch existing code from backend when component loads
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId || !projectID) return;

    fetch(api_base_url + "/getProject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId,
        projId: projectID
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data?.project) {
          setHtmlCode(data.project.htmlCode || "");
          setCssCode(data.project.cssCode || "");
          setJsCode(data.project.jsCode || "");
        } else {
          console.error("Project not found or invalid response");
        }
      })
      .catch(err => {
        console.error("Failed to fetch project:", err);
      });
  }, [projectID]);

  // Save code to backend on Ctrl + S
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault(); // Prevent the default save file dialog

        // Ensure that projectID and code states are updated and passed to the fetch request
        fetch(api_base_url + "/updateProject", {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: localStorage.getItem("userId"),
            projId: projectID,  // Make sure projectID is correct
            htmlCode: htmlCode,  // Passing the current HTML code
            cssCode: cssCode,    // Passing the current CSS code
            jsCode: jsCode       // Passing the current JS code
          })
        })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              alert("Project saved successfully");
            } else {
              alert("Something went wrong");
            }
          })
          .catch((err) => {
            console.error("Error saving project:", err);
            alert("Failed to save project. Please try again.");
          });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [projectID, htmlCode, cssCode, jsCode]);

  return (
    <>
      <EditorNavbar />
      <div className="flex">
        <div className={`left ${isExpanded ? "w-full" : "w-1/2"}`}>
          <div className='tabs flex items-center justify-between gap-2 w-full bg-[#1A1919] h-[45px]'>
            <div className='tabs flex items-center gap-2'>
              <div onClick={() => setTab("HTML")} className="tab cursor-pointer bg-[#1E1E1E]  !mx-[3px] !p-[6px] !px-[20px] text-[14px]">HTML</div>
              <div onClick={() => setTab("CSS")} className="tab cursor-pointer bg-[#1E1E1E]  !mx-[3px] !p-[6px] !px-[20px] text-[14px]">CSS</div>
              <div onClick={() => setTab("JS")} className="tab cursor-pointer bg-[#1E1E1E]  !mx-[3px] !p-[6px] !px-[20px] text-[14px]">JavaScript</div>
            </div>

            <div className='flex items-center gap-3 !mx-[15px]'>
              <i className='text-[20px] cursor-pointer' onClick={changeTheme}><MdLightMode /></i>
              <i className='text-[18px] cursor-pointer' onClick={() => setIsExpanded(!isExpanded)}><FaExpandAlt /></i>
            </div>
          </div>

          {tab === "HTML" && (
            <Editor
              onChange={(e) => setHtmlCode(e || "")}
              height="80vh"
              theme={isLightMode ? "vs-light" : "vs-dark"}
              language="html"
              value={htmlCode}
            />
          )}
          {tab === "CSS" && (
            <Editor
              onChange={(e) => setCssCode(e || "")}
              height="80vh"
              theme={isLightMode ? "vs-light" : "vs-dark"}
              language="css"
              value={cssCode}
            />
          )}
          {tab === "JS" && (
            <Editor
              onChange={(e) => setJsCode(e || "")}
              height="80vh"
              theme={isLightMode ? "vs-light" : "vs-dark"}
              language="javascript"
              value={jsCode}
            />
          )}
        </div>

        <iframe
          id='iframe'
          className={`${isExpanded ? "hidden" : "w-1/2"} min-h-[80vh] bg-[#fff] text-black`}
          title="Output"
        />
      </div>
    </>
  );
};

export default Edittor;
