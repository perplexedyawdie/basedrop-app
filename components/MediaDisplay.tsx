import React, { useEffect, useState } from 'react'
import { Handle, Position } from 'reactflow';
import { MetaTags, urlPreviewData } from '../utils/gmeta';
import LinkPreview from './LinkPreview';
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, useCreateBlockNote, lightDefaultTheme } from "@blocknote/react";
import "@blocknote/react/style.css";
import Markdown from 'react-markdown'
import axios from 'axios';

interface ContentTypeSplit {
    primaryType: string;
    subType: string;
}
// Function to extract MIME types
function extractMIME(contentType: string): ContentTypeSplit {
    // Step 1: Isolate MIME type
    const mimeType = contentType.split(';')[0].trim();

    // Step 2: Split into primary and subtype
    const [primaryType, subType] = mimeType.split('/');
    console.log(`Primary Type: ${primaryType}, Subtype: ${subType}`);
    return {
        primaryType,
        subType
    }

}

export interface MediaData {
    contentType: string;
    content: string;
}
//TODO save notes to node data
function MediaDisplay({ data }: { data: MediaData }) {
    const [componentToRender, setComponentToRender] = useState<JSX.Element | null>(null);
    const editor = useCreateBlockNote();

    useEffect(() => {
        const { primaryType, subType } = extractMIME(data.contentType)
        switch (primaryType) {
            case 'text': {
                console.log("parsing text")
                console.log(primaryType)
                // Special handling for HTML content that might be a video URL playable by ReactPlayer
                //TODO: parse meta tag
                switch (subType) {
                    case "html": {
                        console.log("parsing subtype")
                        console.log("html")
                        axios.post("/api/get-url-preview", { url: data.content })
                            .then((resp) => {
                                if (!resp.data.error && resp.data.meta) {
                                    console.log(resp.data.meta)
                                    if (resp.data.meta && !resp.data.error) {
                                        console.log("rendering html")
                                        console.log(resp.data.meta)
                                        setComponentToRender(<LinkPreview
                                            content={data.content}
                                            description={resp.data.meta.description}
                                            image={resp.data.meta.image}
                                            title={resp.data.meta.title} />)
                                    } else {
                                        setComponentToRender(<div>nothing to see </div>)
                                        //todo react hot toast nothing to see
                                    }
                                } else {
                                    throw resp.data.error
                                }
                            })
                            .catch((error) => {
                                console.error(error)

                            })
                        break;
                    }
                    case "plain": {
                        console.log("rendering plain")
                        setComponentToRender(<Markdown className="nodrag w-full p-4 text-left max-h-96 overflow-scroll" >{data.content}</Markdown>)
                        break
                    }


                    default:
                        break;
                }
                break;
            }
            case 'image':
                setComponentToRender(<img src={data.content} alt="content" />)
                break;
            case 'video':
                setComponentToRender(<video src={data.content} controls />)
                break;
            case 'audio': {
                setComponentToRender(<audio src={data.content} controls />)
                break;
            }
            case 'application':
                setComponentToRender(<Markdown className="nodrag w-full p-4 text-left max-h-96 overflow-scroll" >{data.content}</Markdown>)
                break;
            default:
                setComponentToRender(<div>Unsupported content type</div>)
        }



    }, [data]);

    return (
        <>
            <Handle type="target" position={Position.Top} />
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="rounded-lg nopan nodrag nowheel">
                    {componentToRender}
                </div>
                <div className="card-body px-0">
                    <span className="label-text text-left">Notes</span>
                    <BlockNoteView editor={editor} className="w-full text-left nodrag" theme={lightDefaultTheme} />;
                </div>
            </div>
        </>
    )
}

export default MediaDisplay