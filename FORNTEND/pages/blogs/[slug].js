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
import { useEffect, useRef, useState } from "react";
import experiences from ".";
import Spinner from "@/components/Spinner";
import { FiSearch } from "react-icons/fi";
import Experiencesearch from "@/components/Blogsearch";


const ExperiencePage = () => {

    const router = useRouter();

    const { slug } = router.query;

    const { alldata } = useFetchData('/api/blogs');

    const [searchInput, setSearchInput] = useState(false);

    const handleSearchOpen = () => {
        setSearchInput(!searchInput);
    }

    const handleSearchClose = () => {
        setSearchInput(false);
    }

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
                    const response = await axios.get(`/api/blogs/${slug}`);
                    setExperienceData(response.data);
                    setLoading(false);
                } catch (error) {
                    setError('Failed to fetch Blog Data. Please try again later.')
                    setLoading(false);
                }
            }
        };

        fetchExperienceData();

    }, [slug]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/blogs/${slug}`, newComment);
            const addedComment = response.data;

            setExperienceData(prevData => {
                if (newComment.parent) {
                    // Find and update the parent comment in the UI
                    const updateNestedComments = (comments) => {
                        return comments.map(comment => {
                            if (comment._id === newComment.parent) {
                                return {
                                    ...comment,
                                    children: [...(comment.children || []), addedComment]
                                };
                            } else if (comment.children && comment.children.length > 0) {
                                return {
                                    ...comment,
                                    children: updateNestedComments(comment.children)
                                };
                            }
                            return comment;
                        });
                    };

                    return {
                        ...prevData,
                        comments: updateNestedComments(prevData.comments)
                    };
                } else {
                    // Add as a new top-level comment
                    return {
                        ...prevData,
                        comments: [addedComment, ...prevData.comments]
                    };
                }
            });

            setMessageok('✅ Comment Posted successfully!');
            setTimeout(() => {
                setMessageok('');
            }, 5000);

            setNewComment({
                name: '',
                email: '',
                title: '',
                contentpera: '',
                maincomment: true,
                parent: null,
                parentName: ''
            });

        } catch (error) {
            setMessageok('❌ Failed to Post Comment!');
            setTimeout(() => {
                setMessageok('');
            }, 5000);
        }
    };


    const replyFormRef = useRef(null);

    const handleReply = (parentCommentId, parentName) => {
        setNewComment({
            ...newComment,
            parent: parentCommentId,
            parentName: parentName,
            maincomment: false
        })

        if (replyFormRef.current) {
            replyFormRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const handleRemovereply = () => {
        setNewComment({
            ...newComment,
            parent: null,
            parentName: null,
            maincomment: true
        })
    }

    const updateChildrenComments = (comments, parentId, newComment) => {
        return comments.map(comment => {
            if (comment._id === parentId) {
                return {
                    ...comment,
                    children: [...(comment.children || []), newComment]
                };
            } else if (comment.children && comment.children.length > 0) {
                return {
                    ...comment,
                    children: updateChildrenComments(comment.children, parentId, newComment)
                };
            }
            return comment;
        });
    };




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

    const experienceUrl = `http://localhost:3000/blogs/${slug}`;

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

    const renderComments = (comments) => {
        if (!comments || comments.length === 0) {
            return <p>No comments yet. Be the first to comment!</p>;
        }

        const renderNestedComments = (comments) => {
            return comments.map((comment) => (
                <div className="experiencecomment" key={comment._id}>
                    <h3>{comment.name} <span>{new Date(comment.createdAt).toLocaleString()}</span></h3>
                    <h4>Topic: <span>{comment.title}</span></h4>
                    <p>{comment.contentpera}</p>
                    <button onClick={() => handleReply(comment._id, comment.name)}>Reply</button>
                    {/* Render children comments recursively */}
                    {comment.children && comment.children.length > 0 && (
                        <div className="children-comments">
                            {renderNestedComments(comment.children)}
                        </div>
                    )}
                </div>
            ));
        };

        return (
            <div className="experiencecomments-container">
                {renderNestedComments(comments)}
            </div>
        );



        const commentsMap = new Map();
        comments.forEach(comment => {
            if (comment.maincomment) {
                commentsMap.set(comment._id, []);
            }
        })

        comments.forEach(comment => {
            if (!comment.maincomment && comment.parent) {
                if (commentsMap.has(comment.parent)) {
                    commentsMap.get(comment.parent).push(comment);
                }
            }
        });


        return comments.filter(comment => comment.maincomment).map(parentComment => {
            <div className="experiencecomment" key={parentComment._id}>
                <h3>{parentComment.name} <span>{new Date(parentComment.createdAt).toLocaleString()}</span></h3>
                <h4>Topic: <span>{parentComment.title}</span></h4>
                <p>{parentComment.contentpera}</p>
                <button onClick={() => handleReply(parentComment._id, parentComment.name)}>Reply</button>
                {parentComment.parent && (
                    <span className="repliedto">Replied to {parentComment.parentName}</span>
                )}

                <div className="childern-comments">
                    {commentsMap.get(parentComment._id).map(childcomment => (
                        <div className="child-coment" key={childcomment._id}>
                            <h3>{childcomment.name} <span>{new Date(childcomment.createdAt).toLocaleString()}</span></h3>
                            <span>Replied to {childcomment.parentName}</span>
                            <h4>Topic: <span>{childcomment.title}</span></h4>
                            <p>{childcomment.contentpera}</p>
                        </div>
                    ))}
                </div>
            </div>
        })
    }

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
                                        </ReactMarkdown>
                                    </div>}

                                    <div className="experienceslugtags">
                                        <div className="experiencestegs">
                                            <h2>Tags:</h2>
                                            <div className="flex flex-wrap gap-1">
                                                {experienceData && experienceData.experience.tags.map((cat) => {
                                                    return <span key={cat}>{cat}</span>
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="experienceusecomments">
                                        <h2>Comments</h2>
                                        {experienceData.comments ? renderComments(experienceData.comments) : <p>Loading comments...</p>}
                                    </div>

                                    <div className="experienceslugcomments" ref={replyFormRef}>
                                        {newComment.parentName && (
                                            <h2>Leave a reply to <span className="perentname">{newComment.parentName}</span> <button onClick={handleRemovereply} className="removereplybtn">Remove Reply</button></h2>
                                        )}
                                        {!newComment.parentName && (
                                            <h2>Leave a reply</h2>
                                        )}

                                        <p>Your email address will not be publish. Required fields are marked *</p>
                                        <form className="leaveareplyform" onSubmit={handleCommentSubmit}>
                                            <div className="nameemailcomment">
                                                <input
                                                    type="text"
                                                    placeholder="Enter Name"
                                                    value={newComment.name}
                                                    onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                                                />
                                                <input
                                                    type="email"
                                                    placeholder="Enter Email"
                                                    value={newComment.email}
                                                    onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Enter Title"
                                                value={newComment.title}
                                                onChange={(e) => setNewComment({ ...newComment, title: e.target.value })}
                                            />
                                            <textarea
                                                name=""
                                                rows={4}
                                                placeholder="Enter Your Comments"
                                                id="textcomments"
                                                value={newComment.contentpera}
                                                onChange={(e) => setNewComment({ ...newComment, contentpera: e.target.value })}
                                            ></textarea>
                                            <div className="flex gap-2">
                                                <button type="submit">Post Comment</button>
                                                <p>{messageok}</p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="rightsitedetails">
                                    <div className="rightslugsearchbar">
                                        <input onClick={handleSearchOpen} type="text" placeholder="Search..." />
                                        <button><FiSearch /></button>
                                    </div>
                                    <div className="rightslugcategory">
                                        <h2>CATEGORIES</h2>
                                        <ul>
                                            <Link href='/blogs/category/Next Js'><li>Next Js <span>({alldata.filter(ab => ab.experiencecategory[0] === 'Next Js').length})</span></li></Link>
                                            <Link href='/blogs/category/Software developer'><li>Software Developer<span>({alldata.filter(ab => ab.experiencecategory[0] === 'Software developer').length})</span></li></Link>
                                            <Link href='/blogs/category/Unity Developer'><li>Unity Developer<span>({alldata.filter(ab => ab.experiencecategory[0] === 'Unity Developer').length})</span></li></Link>
                                        </ul>
                                    </div>
                                    <div className="rightrecentpost">
                                        <h2>RECENT POST</h2>
                                        {alldata.slice(0, 3).map((experience) => {
                                            return <Link key={experience._id} href={`/blogs/${experience.slug}`} className="rightrecentp">
                                                <img src={experience.images[0]} alt="" />
                                                <div>
                                                    <h3>{experience.title}</h3>
                                                    <h4 className="mt-1">
                                                        {experience.tags.map((cat) => {
                                                            return <span key={cat}>{cat}</span>
                                                        })}</h4>
                                                </div>
                                            </Link>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {searchInput ? <Experiencesearch cls={handleSearchClose} /> : null}
                    </div>
                )}
            </div>
        </>
    );
};

export default ExperiencePage;
