import {
  BtnBold,
  BtnItalic,
  Editor,
  EditorProvider,
  Toolbar,
  BtnBulletList,
} from "react-simple-wysiwyg";
export default function TextEditor({ value1, setValue }) {
  const onChange = (e) => setValue(e.target.value);
  return (
    <EditorProvider>
      <Editor value={value1} onChange={onChange}>
        <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnBulletList />
        </Toolbar>
      </Editor>
    </EditorProvider>
  );
}
