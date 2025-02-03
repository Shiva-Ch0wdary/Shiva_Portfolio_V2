// pages/experiences/[slug].js

import { SlCalender } from "react-icons/sl";
import { CiRead } from "react-icons/ci";
import { RiFacebookFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { BiLogoLinkedin } from "react-icons/bi";
import { BsCopy } from "react-icons/bs";
import Link from "next/link";
import Head from "next/head";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import axios from "axios";
import { useRouter } from "next/router";
import useFetchData from "@/hooks/useFetchData";
import { useEffect, useState } from "react";
import experiences from ".";
import Spinner from "@/components/Spinner";

const ExperiencePage = () => {

    const router = useRouter();

    const { slug } = router.query;

    const { alldata } = useFetchData('/api/experiences');

    const [experienceData, setExperienceData] = useState({ experience: {}, comments: [] })
    const [newComment, setNewComment] = useState({
        name: '',
        email: '',
        title: '',
        contentpera: '',
        maincomment: true,
        parent: null,
        parentName: '',

    })

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [messageok, setMessageok] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchExperienceData = async () => {
            if (slug) {
                try {
                    const response = await axios.get(`/api/experiences/${slug}`);
                    setExperienceData(response.data);
                    setLoading(false);
                } catch (error) {
                    setError('Failed to fetch Experinces Data. Please try again later.')
                    setLoading(false);
                }
            }
        };

        fetchExperienceData();

    }, [slug]);

    if (loading) {
        return <div className="flex flex-center wh_100"><Spinner /></div>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    const createdAtDate = experienceData && experienceData.experience.createdAt ? new Date(experienceData && experienceData.experience.createdAt) : null;


    const formatDate = (date) => {
        if (!date || isNaN(date)) {
            return '';
        }

        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour12: true
        };
        return new Intl.DateTimeFormat('en-Us', options).format(date);
    }

    const experienceUrl = `http://localhost:3000/experiences/${slug}`;

    const handleCopyUrl = (Url) => {
        navigator.clipboard.writeText(Url);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 3000);
    }

    const Code = ({ node, inline, className, children, ...props }) => {
        const match = /language-(\w+)/.exec(className || '');
        const [copied, setCopied] = useState(false);
    
        const handleCopy = () => {
            navigator.clipboard.writeText(children);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 3000);
        };
    
        if (inline) {
            return <code>{children}</code>;
        } else if (match) {
            return (
                <div style={{ position: 'relative' }}>
                    <SyntaxHighlighter
                        style={a11yDark}
                        language={match[1]}
                        PreTag='pre'
                        {...props}
                        codeTagProps={{ style: { padding: '0', borderRadius: '5px', overflow: 'auto', whiteSpace: 'pre-wrap' } }}
                    >
                        {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                    <button onClick={handleCopy} style={{ position: 'absolute', top: '0', right: '0', zIndex: '1', background: `#3d3d3d`, color: '#fff', padding: '10px' }}>
                        {copied ? 'Copied!' : 'Copy code'}
                    </button>
                </div>
            );
        } else {
            return (
                <code className="md-post-code" {...props}>
                    {children}
                </code>
            );
        }
    };
    


    return (
        <>
            <Head>
                <title>{slug}</title>
            </Head>


            <div>
                {experienceData && (

                    <div className="experienceslugpage">
                        <div className="container">
                            <div className="experienceslugpagecont">
                                <div className="leftsitedetails">
                                    <div className="leftexperienceinfoimg">
                                        <img src={experienceData.experience.images[0] || '/img/noimage.png'} alt={experienceData && experienceData.title} />
                                    </div>
                                    <div className="slugexperienceinfopub">
                                        <div className="flex gap-2">
                                            <div className="adminslug">
                                                <img src='/img/coder.jpg' alt="profile" />
                                                <span>By Shiva</span>
                                            </div>
                                            <div className="adminslug">
                                                <SlCalender />
                                                <span>{formatDate(createdAtDate)}</span>
                                            </div>
                                            <div className="adminslug">
                                                <CiRead />
                                                <span>Comments ({experienceData.comments ? experienceData.comments.length : 0})</span>
                                            </div>
                                        </div>

                                        <div className="shareexperienceslug">
                                            <div className="Copy URL" onClick={() => handleCopyUrl(experienceUrl)} style={{ cursor: 'pointer' }}>
                                                <BsCopy /> <span>{copied ? 'Copied!' : ''}</span>
                                            </div>

                                            <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(experienceUrl)}`} rel="noopener noreferrer">
                                                <RiFacebookFill />
                                            </a>
                                            <a target="_blank" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Check Out this Post' + experienceUrl)}`} rel="noopener noreferrer">
                                                <FaTwitter />
                                            </a>
                                            <a target="_blank" href={`https://wa.me/?text=Check out this Post: ${encodeURIComponent(experienceUrl)}`} rel="noopener noreferrer">
                                                <RiWhatsappFill />
                                            </a>
                                            <a target="_blank" href={`https://www.linkedin.com/sharing/share-offsite/url=${encodeURIComponent(experienceUrl)}`} rel="noopener noreferrer">
                                                <BiLogoLinkedin />
                                            </a>
                                        </div>
                                    </div>
                                    <h1>{experienceData.experience.title}</h1>
                                    {loading ? <Spinner /> : <div className="experiencecontent">
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                code: Code
                                            }}
                                        >
                                            {experienceData.experience.description}
                                        </ReactMarkdown></div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </>
    );
};

export default ExperiencePage;
