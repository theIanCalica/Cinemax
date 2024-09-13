import { useState } from "react";
import Editor from "../../components/admin/Editor/Editor";
import EditorTextParser from "../../components/admin/Editor-Parser/EditorTextParser";
import exampleData from "../../components/admin/Editor/Tools/Data/Data";

const Article = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [data, setData] = useState(exampleData);

  const toggleEditMode = () => {
    setIsEditMode((prevMode) => {
      const newMode = !prevMode;
      console.log(
        newMode ? "Edit mode is now enabled" : "Edit mode is now disabled"
      );
      return newMode;
    });
  };

  console.log("Article Component Data:", data);

  return (
    <div className="App">
      <button id="toggle-edit-btn" onClick={toggleEditMode}>
        Toggle Edit Mode
      </button>

      <div className="app-content">
        {isEditMode ? (
          <Editor data={data} setData={setData} />
        ) : (
          <EditorTextParser data={data} />
        )}
      </div>
    </div>
  );
};

export default Article;
