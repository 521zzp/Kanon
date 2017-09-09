import React from 'react';
import { connect } from 'dva';
import styles from './Product.less';
import { EditorState, convertFromHTML, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html'
import Editor from '../../components/common/Editor'


 /*toolbarClassName={styles.toolbar} wrapperClassName={styles.wrapper} editorClassName={styles.editor} {...props}*/
function Product() {
	
	const change = (result) => {
		console.log(result)
	}
	
	const html =
	  '<b>Bold text</b>, <i>Italic text</i><br/ ><br />' +
	  '<a href="http://www.facebook.com">Example link</a>';
	
	
  return (
    <div className={styles.normal}>
      Route Component: Product
      <Editor change = {change} initState = { html } />
      
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Product);
