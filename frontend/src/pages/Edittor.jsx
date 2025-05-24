import React, { useEffect, useState } from 'react';
import EditorNavbar from '../components/EditorNavbar';
import Editor from '@monaco-editor/react';
import { MdLightMode } from "react-icons/md";
import { FaExpandAlt } from "react-icons/fa";

const Edittor = () => {
  const [isLightMode, setIsLightMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [tab, setTab] = useState("HTML");
  //in useSate 2nd state variable is a function to update the first state variable

  const [htmlCode, setHtmlCode] = useState("<h1>Hello World</h1>");
  const [cssCode, setCssCode] = useState("body { background-color : #f4f4f4; }");
  const [jsCode, setJsCode] = useState("//comment");

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

  const run = () => {
    const html = htmlCode;
    const css = `<style>${cssCode}</style>`;
    const js = `<script>${jsCode}</script>`;
    const iframe = document.getElementById("iframe");

    if (iframe) {
      iframe.srcdoc = html + css + js;
    }
  };

  useEffect(() => {
    run();
  }, [htmlCode, cssCode, jsCode]);

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

          {
            tab === "HTML" ?
              <Editor
                onChange={(e) => { setHtmlCode(e || ""); }}
                height="80vh"
                theme={isLightMode ? "vs-light" : "vs-dark"}
                language="html"
                value={htmlCode}
              />
              : tab === "CSS" ?
                <Editor
                  onChange={(e) => { setCssCode(e || ""); }}
                  height="80vh"
                  theme={isLightMode ? "vs-light" : "vs-dark"}
                  language="css"
                  value={cssCode}
                />
                :
                <Editor
                  onChange={(e) => { setJsCode(e || ""); }}
                  height="80vh"
                  theme={isLightMode ? "vs-light" : "vs-dark"}
                  language="javascript"
                  value={jsCode}
                />
          }
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
