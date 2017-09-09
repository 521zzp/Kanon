import React from 'react';
import styles from './Editor.less';
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertFromHTML, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

function KanonEditor( {change, initState, config} ) {
	
	const StateChange = (editorContent) => {
		change(editorContent ? draftToHtml(convertToRaw(editorContent.getCurrentContent())) : '')
	}
	
	const blocksFromHTML = convertFromHTML(initState ? initState : '');
	const state = ContentState.createFromBlockArray(
	  blocksFromHTML.contentBlocks,
	  blocksFromHTML.entityMap
	);
		
	const editorState = EditorState.createWithContent(state)
	
  return (
    <Editor 
	        toolbarClassName={styles.toolbar} 
	        wrapperClassName={styles.wrapper} 
	        onEditorStateChange={ StateChange }
	        editorClassName={styles.editor}
	        defaultEditorState={editorState} 
	        {...config}
	        />
  );
}

export default KanonEditor;
