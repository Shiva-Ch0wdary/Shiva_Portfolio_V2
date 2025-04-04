import Head from "next/head";
import ReactMarkdown from 'react-markdown';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Spinner from './Spinner';
import { text } from '@cloudinary/url-gen/qualifiers/source';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for styling
import { ReactSortable } from 'react-sortablejs';
import { MdDeleteSweep } from "react-icons/md";


export default function Shop(
    {
        _id,
        title: existingTitle,
        slug: existingslug,
        images: existingimages,
        description: existingdescription,
        tags: existingtags,
        price: existingprice,
        status: existingstatus,
        aflink: existingaflink,
    }
) {

    const [redirect, setRedirect] = useState(false);
    const router = useRouter();

    const [title, setTitle] = useState(existingTitle || '');
    const [slug, setslug] = useState(existingslug || '');
    const [images, setimages] = useState(existingimages || []);
    const [description, setdescription] = useState(existingdescription || '');
    const [price, setprice] = useState(existingprice || '');
    const [tags, settags] = useState(existingtags || []);
    const [status, setstatus] = useState(existingstatus || '');
    const [aflink, setaflink] = useState(existingaflink || '');

    const [isUploading, setIsUploading] = useState(false);
    const uploadImagesQueue = [];

    async function createExperience(ev) {
        ev.preventDefault();

        if (isUploading) {
            await Promise.all(uploadImagesQueue)
        }

        const data = { title, slug, images, description, aflink, price, tags, status };

        if (_id) {
            await axios.put('/api/shops', { ...data, _id })
            toast.success('Data updated')
        } else {
            await axios.post('/api/shops', data)
            toast.success('Product Created')
        }

        setRedirect(true);
    };

    async function uploadImages(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);
            for (const file of files) {
                const data = new FormData();
                data.append('file', file);

                uploadImagesQueue.push(
                    axios.post('/api/upload', data).then(res => {
                        setimages(oldImages => [...oldImages, ...res.data.links])
                    })
                )
            }

            await Promise.all(uploadImagesQueue);

            setIsUploading(false);
            toast.success('Images Upploaded')
        } else {
            toast.error('An error occured!')
        }
    }

    if (redirect) {
        router.push('/shops')
        return null;
    }

    function updateImagesOrder(images) {
        setimages(images)
    }

    function handleDeleteImages(index) {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setimages(updatedImages);
        toast.success('Image Deleted Sucsessfully')
    }

    const handleSlugChange = (ev) => {
        const inputValue = ev.target.value;
        const newSlug = inputValue.replace(/\s+/g, '-')
        setslug(newSlug);
    }

    return <>
        <Head>
            <title>Add Product</title>
        </Head>
        <form className='addWebsiteform' onSubmit={createExperience}>
            {/* experience title*/}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="title">Name</label>
                <input type="text" id="title" placeholder='Enter Company name'
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}
                />
            </div>

            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="slug">Project URL</label>
                <input type="text" id="slug" placeholder='Enter Project URL'
                    value={slug}
                    onChange={handleSlugChange}
                />
            </div>

            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="aflink">Afilate Link</label>
                <input type="text" id="aflink" placeholder='Enter Afilate Link'
                    value={aflink}
                    onChange={ev => setaflink(ev.target.value)}
                />
            </div>

            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="price">Price</label>
                <input type="text" id="price" placeholder='Enter Price'
                    value={price}
                    onChange={ev => setprice(ev.target.value)}
                />
            </div>

            
            <div className="w-100 flex flex-col flex-left mb-2">
                <div className="w-100">
                    <label htmlFor="image">Images</label>
                    <input type="file" id='fileInput' className='mt-1' accept='image/*' multiple onChange={uploadImages} />
                </div>
                <div className='w-100 flex flex-left mt-1'>
                    {isUploading && <Spinner />}
                </div>
            </div>

            {!isUploading && (
                <div className="flex">
                    <ReactSortable list={Array.isArray(images) ? images : []} setList={updateImagesOrder} animation={200} className='flex gap-1'>
                        {images?.map((link, index) => (
                            <div key={link} className="uploadedimg">
                                <img src={link} alt="image" className='object-cover' />
                                <div className="deleteimg">
                                    <button onClick={() => handleDeleteImages(index)}>
                                        <MdDeleteSweep />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </ReactSortable>
                </div>
            )}

            <div className="description w-100 flex flex-col flex-left mb-2">
                <label htmlFor="description"> Content </label>
                <MarkdownEditor
                    value={description}
                    onChange={({ text }) => setdescription(text)} // <-- Fixed this line
                    style={{ width: '100%', height: '400px' }}
                    renderHTML={(text) => (
                        <ReactMarkdown components={{
                            code: ({ node, inline, className, children, ...props }) => {
                                const match = /language-(\w+)/.exec(className || '');

                                if (inline) {
                                    return <code>{children}</code>;
                                } else if (match) {
                                    return (
                                        <div style={{ position: 'relative' }}>
                                            <pre style={{
                                                padding: '0', borderRadius: '5px', overflowX: 'auto',
                                                whiteSpace: 'pre-wrap'
                                            }}{...props}>
                                                <code>{children}</code>
                                            </pre>
                                            <button style={{ position: 'absolute', top: '0', right: '0', zIndex: '1' }}
                                                onClick={() => navigator.clipboard.writeText(children)}>
                                                Copy code
                                            </button>
                                        </div>
                                    );
                                } else {
                                    return <code {...props}>{children}</code>;
                                }
                            }
                        }}>
                            {text}
                        </ReactMarkdown>
                    )}
                />
            </div>


            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="status">Status</label>
                <select onChange={ev => setstatus(ev.target.value)} value={status}
                    name="status" id="status">
                    <option value="">No Select</option>
                    <option value="draft">Draft</option>
                    <option value="publish">Publish</option>
                </select>
            </div>

            <div className="w-100 mb-1">
                <button type="submit" className="w-100 addwebbtn flex-center">Save</button>
            </div>
        </form>
    </>

}

