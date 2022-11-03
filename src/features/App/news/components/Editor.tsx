import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

import tinymce from 'tinymce/tinymce';
// Theme
import 'tinymce/themes/silver';
// Toolbar icons
import 'tinymce/icons/default';
// Editor styles
import 'tinymce/skins/ui/oxide/skin.min.css';

// importing the plugin js.
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/table';
import 'tinymce/plugins/template';
import 'tinymce/plugins/help';

const NewsEditor = () => {
    const editorRef: any = React.useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    return (
        <Editor
            apiKey="hjuz02bsvcykwi6ruki9xpuarsd6l8txzaouzknog6xef2w5"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
                height: 500,
                content_style: 'body { font-family:Quicksand,sans-serif; font-size:14px }',
                plugins: [
                    'advlist',
                    'autolink',
                    'lists',
                    'link',
                    'image',
                    'preview',
                    'searchreplace',
                    'fullscreen',
                    'insertdatetime',
                    'media',
                    'table',
                    'help',
                    'wordcount',
                ],
                toolbar:
                    'undo redo | blocks | ' +
                    'image media ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',

                default_link_target: '_blank',
                entity_encoding: 'raw',
                menubar: true,
                statubar: true,
                branding: false,
                file_picker_callback: async function (callback, value, meta) {
                    console.log('🚀 ~ file: Editor.tsx ~ line 74 ~ meta', meta);
                    if (meta?.filetype === 'image') {
                        let input: any = document.getElementById('my-file-upload');
                        input.click();
                        input.onchange = async () => {
                            var file = input.files[0];

                            callback(
                                'https://content.altexsoft.com/media/2017/05/The-HTML-DOM-tree-of-objects.jpg.webp',
                                {
                                    alt: '123',
                                }
                            );
                        };
                    }
                },
            }}
        />
    );
};

export default NewsEditor;
