/* eslint-disable no-unused-vars */
import React,{useState} from 'react'
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
export default function NewsEditor(props) {
  const [editorState, setEditorState] = useState('')
  return (
    <div>
      <Editor
        editorClassName="editorClassName"
        editorState={editorState}
        onBlur={()=>{
          // eslint-disable-next-line react/prop-types
          props.getContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        }}
        onEditorStateChange={(editorState)=>setEditorState(editorState)}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
      />
    </div>
  )
}
