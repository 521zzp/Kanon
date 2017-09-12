import React from 'react';
import styles from './Editor.less';
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertFromHTML, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

function KanonEditor( {change, initState, config} ) {
	
  return (
    <Editor 
	        toolbarClassName={styles.toolbar} 
	        wrapperClassName={styles.wrapper} 
	        onEditorStateChange={ change }
	        editorClassName={styles.editor}
	        editorState={ initState }
	        {...config}
	        />
  );
}

export default KanonEditor;
