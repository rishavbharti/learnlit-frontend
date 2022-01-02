import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import classnames from 'classnames';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const htmlToDraft =
  typeof window === 'object' && require('html-to-draftjs').default;

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const RichTextEditor = ({
  label,
  required,
  error,
  helperText,
  onChange,
  value,
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    if (!updated) {
      const defaultValue = value ? value : '';
      const blocksFromHtml = htmlToDraft(defaultValue);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHtml.contentBlocks,
        blocksFromHtml.entityMap
      );
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const onEditorStateChange = (editorState) => {
    setUpdated(true);
    setEditorState(editorState);

    return onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  return (
    <React.Fragment>
      <div className='editor'>
        {label && (
          <p
            className={classnames('text-labelText mb-1', {
              'text-error': error,
            })}
          >
            {label} {required && '*'}
          </p>
        )}
        <Editor
          spellCheck
          stripPastedStyles
          toolbar={{
            options: ['inline', 'list'],
            inline: { options: ['bold', 'italic'] },
            list: { options: ['unordered', 'ordered'] },
          }}
          wrapperStyle={{
            border: `1px solid #e7e9ed`,
            borderRadius: '6px',
            height: 'auto',
            padding: '10px',
            overflow: 'hidden',
          }}
          editorStyle={{
            backgroundColor: '#fcfcfb',
            padding: '0 1rem 0 1rem',
          }}
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
        />
        {error && <p className='text-error text-xs mx-4 mt-1'>{helperText}</p>}
      </div>
    </React.Fragment>
  );
};

export default RichTextEditor;
