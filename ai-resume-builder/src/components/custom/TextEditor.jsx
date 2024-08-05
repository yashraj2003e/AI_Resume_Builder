import { useState } from "react";
import {
  BtnBold,
  BtnItalic,
  Editor,
  EditorProvider,
  Toolbar,
  BtnBulletList,
} from "react-simple-wysiwyg";
export default function TextEditor() {
  const [value, setValue] = useState("");
  const onChange = (e) => setValue(e.target.value);
  return (
    <EditorProvider>
      <Editor value={value} onChange={onChange}>
        <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnBulletList />
        </Toolbar>
      </Editor>
    </EditorProvider>
  );
}
