import React, { useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnUnderline,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";

function RichTextEditor({ onTextEditorChange }) {
  const [value, setValue] = useState();
  return (
    <EditorProvider>
      <Editor
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onTextEditorChange(e);
        }}
      >
        <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
          <HtmlButton />
        </Toolbar>
      </Editor>
    </EditorProvider>
  );
}

export default RichTextEditor;
