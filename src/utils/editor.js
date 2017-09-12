import { EditorState, convertFromHTML, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html'

export const htmlToEditor = (initState) => {
	const blocksFromHTML = convertFromHTML(initState ? initState : '');
	const state = ContentState.createFromBlockArray(
	  blocksFromHTML.contentBlocks,
	  blocksFromHTML.entityMap
	);
	return EditorState.createWithContent(state)
}


export const editorToHtml = (editorContent) => editorContent ? draftToHtml(convertToRaw(editorContent.getCurrentContent())) : ''
