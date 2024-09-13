import React, { useRef, useCallback } from "react";
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./Tools/Tools";

export default function Editor({ data, setData }) {
  const editorCore = useRef(null);
  const ReactEditorJS = createReactEditorJS();

  console.log("Editor Component data:", data);

  const handleInitialize = useCallback(
    (instance) => {
      editorCore.current = instance;
      console.log("Editor initialized");

      // Check if the editor instance has a `load` or similar method to set initial data
      if (data) {
        // Use instance.render or similar method based on the documentation
        instance.saver
          .save()
          .then(() => {
            console.log("Data rendered in editor");
          })
          .catch((err) => {
            console.error("An error occurred during data rendering", err);
          });
      }
    },
    [data]
  );

  const handleSave = useCallback(async () => {
    if (editorCore.current) {
      try {
        const savedData = await editorCore.current.save();
        setData(savedData);
      } catch (err) {
        console.error("An error occurred during saving", err);
      }
    }
  }, [setData]);

  return (
    <div className="editor-container">
      <h4 className="edit-mode-alert">! Edit Mode Enabled</h4>
      <ReactEditorJS
        onInitialize={handleInitialize}
        tools={EDITOR_JS_TOOLS}
        onChange={handleSave}
      />
    </div>
  );
}
