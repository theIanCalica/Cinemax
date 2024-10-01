import React, { useRef, useCallback } from "react";

// import tools for editor config
import { EDITOR_JS_TOOLS } from "./Tools/Tools";

// create editor instance
import { createReactEditorJS } from "react-editor-js";

export default function Editor({ data, setData }) {
  const editorCore = useRef(null);
  const ReactEditorJS = createReactEditorJS();

  const handleInitialize = useCallback((instance) => {
    // await instance._editorJS.isReady;
    instance._editorJS.isReady
      .then(() => {
        // set reference to editor
        editorCore.current = instance;
      })
      .catch((err) => console.log("An error occured", err));
  }, []);

  const handleSave = useCallback(async () => {
    // retrieve data inserted
    const savedData = await editorCore.current.save();
    // save data
    setData(savedData);
  }, [setData]);

  return (
    <div className="editor-container">
      <h4 className="edit-mode-alert">! Edit Mode Enabled</h4>
      <ReactEditorJS
        onInitialize={handleInitialize}
        tools={EDITOR_JS_TOOLS}
        onChange={handleSave}
        defaultValue={data}
      />
    </div>
  );
}
