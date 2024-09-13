// edjsHTML transforms Editor.js blocks to HTML
import edjsHTML from "editorjs-html";
// This function parses strings (HTML elements) to React components
import parse from "html-react-parser";

const edjsParser = edjsHTML();

export default function EditorTextParser({ data }) {
  // Log the incoming data to ensure it's correctly formatted
  console.log("EditorTextParser received data:", data);

  // Parse data to HTML elements
  const html = edjsParser.parse(data);

  // Log the parsed HTML to ensure it's generated correctly
  console.log("Parsed HTML:", html);

  // Check if html.join("") is creating a valid HTML string
  const htmlString = html.join("");
  console.log("HTML String:", htmlString);

  return <div className="text-container">{parse(htmlString)}</div>;
}
