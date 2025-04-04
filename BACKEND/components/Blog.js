import ReactMarkdown from "react-markdown";
import MarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Spinner from "./Spinner";
import { text } from "@cloudinary/url-gen/qualifiers/source";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for styling
import { ReactSortable } from "react-sortablejs";
import { MdDeleteSweep } from "react-icons/md";

export default function Experience({
  _id,
  title: existingTitle,
  slug: existingslug,
  images: existingimages,
  description: existingdescription,
  experiencecategory: existingexperiencecategory,
  tags: existingtags,
  status: existingstatus,
}) {
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState(existingTitle || "");
  const [slug, setslug] = useState(existingslug || "");
  const [images, setimages] = useState(existingimages || []);
  const [description, setdescription] = useState(existingdescription || "");
  const [experiencecategory, setexperiencecategory] = useState(
    existingexperiencecategory || []
  );
  const [tags, settags] = useState(existingtags || []);
  const [status, setstatus] = useState(existingstatus || "");

  const [isUploading, setIsUploading] = useState(false);
  const uploadImagesQueue = [];

  async function createExperience(ev) {
    ev.preventDefault();

    if (isUploading) {
      await Promise.all(uploadImagesQueue);
    }

    const data = {
      title,
      slug,
      images,
      description,
      experiencecategory,
      tags,
      status,
    };

    if (_id) {
      await axios.put("/api/blogs", { ...data, _id });
      toast.success("Data updated");
    } else {
      await axios.post("/api/blogs", data);
      toast.success("Blogs Created");
    }

    setRedirect(true);
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      for (const file of files) {
        const data = new FormData();
        data.append("file", file);

        uploadImagesQueue.push(
          axios.post("/api/upload", data).then((res) => {
            setimages((oldImages) => [...oldImages, ...res.data.links]);
          })
        );
      }

      await Promise.all(uploadImagesQueue);

      setIsUploading(false);
      toast.success("Images Upploaded");
    } else {
      toast.error("An error occured!");
    }
  }

  if (redirect) {
    router.push("/blogs");
    return null;
  }

  function updateImagesOrder(images) {
    setimages(images);
  }

  function handleDeleteImages(index) {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setimages(updatedImages);
    toast.success("Image Deleted Sucsessfully");
  }

  const handleSlugChange = (ev) => {
    const inputValue = ev.target.value;
    const newSlug = inputValue.replace(/\s+/g, "-");
    setslug(newSlug);
  };

  return (
    <>
      <form className="addWebsiteform" onSubmit={createExperience}>
        {/* experience title*/}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="title">Name</label>
          <input
            type="text"
            id="title"
            placeholder="Enter Company name"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
        </div>

        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="slug">Company URL</label>
          <input
            type="text"
            id="slug"
            placeholder="Enter Company URL"
            value={slug}
            onChange={handleSlugChange}
          />
        </div>

        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="category">Select Category </label>
          <select
            onChange={(e) =>
              setexperiencecategory(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            value={experiencecategory}
            name="category"
            id="category"
            multiple
          >
            <option value="Web Development">Web Development</option>
            <option value="App Development">App Development</option>
            <option value="E-Commerce">E-Commerce</option>
            <option value="Portfolio Sites">Portfolio Sites</option>
            <option value="Open Source">Open Source</option>
            <option value="Game Development">Game Development</option>
            <option value="API Development">API Development</option>
            <option value="Automation Tools">Automation Tools</option>
            <option value="SaaS Applications">SaaS Applications</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="CMS Development">CMS Development</option>
            <option value="AI & Machine Learning">AI & Machine Learning</option>
            <option value="DevOps & Cloud">DevOps & Cloud</option>
            <option value="IoT Projects">IoT Projects</option>
            <option value="Data Visualization">Data Visualization</option>
            <option value="SEO Projects">SEO Projects</option>
            <option value="Performance Optimization">Performance Optimization</option>
            <option value="Frontend Development">Frontend Development</option>
            <option value="Backend Development">Backend Development</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Deployment & Hosting">Deployment & Hosting</option>
            <option value="Best Practices">Best Practices</option>
            <option value="Code Reviews">Code Reviews</option>
            <option value="Productivity Tools">Productivity Tools</option>
            <option value="Career Advice">Career Advice</option>
            <option value="Open Source Contribution">Open Source Contribution</option>
            <option value="Case Studies">Case Studies</option>
            <option value="Tutorials">Tutorials</option>
            <option value="Tech News & Trends">Tech News & Trends</option>
          </select>
        </div>
        <div className="w-100 flex flex-col flex-left mb-2">
          <div className="w-100">
            <label htmlFor="image">Images</label>
            <input
              type="file"
              id="fileInput"
              className="mt-1"
              accept="image/*"
              multiple
              onChange={uploadImages}
            />
          </div>
          <div className="w-100 flex flex-left mt-1">
            {isUploading && <Spinner />}
          </div>
        </div>

        {!isUploading && (
          <div className="flex">
            <ReactSortable
              list={Array.isArray(images) ? images : []}
              setList={updateImagesOrder}
              animation={200}
              className="flex gap-1"
            >
              {images?.map((link, index) => (
                <div key={link} className="uploadedimg">
                  <img src={link} alt="image" className="object-cover" />
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
            style={{ width: "100%", height: "400px" }}
            renderHTML={(text) => (
              <ReactMarkdown
                components={{
                  code: ({ node, inline, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || "");

                    if (inline) {
                      return <code>{children}</code>;
                    } else if (match) {
                      return (
                        <div style={{ position: "relative" }}>
                          <pre
                            style={{
                              padding: "0",
                              borderRadius: "5px",
                              overflowX: "auto",
                              whiteSpace: "pre-wrap",
                            }}
                            {...props}
                          >
                            <code>{children}</code>
                          </pre>
                          <button
                            style={{
                              position: "absolute",
                              top: "0",
                              right: "0",
                              zIndex: "1",
                            }}
                            onClick={() =>
                              navigator.clipboard.writeText(children)
                            }
                          >
                            Copy code
                          </button>
                        </div>
                      );
                    } else {
                      return <code {...props}>{children}</code>;
                    }
                  },
                }}
              >
                {text}
              </ReactMarkdown>
            )}
          />
        </div>

        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="tags">Tags</label>
          <select
            onChange={(e) =>
              settags(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            value={tags}
            name="tags"
            id="tags"
            multiple
          >
            <option value="React">React</option>
            <option value="Next.js">Next.js</option>
            <option value="Node.js">Node.js</option>
            <option value="Express.js">Express.js</option>
            <option value="Vue.js">Vue.js</option>
            <option value="Angular">Angular</option>
            <option value="Python">Python</option>
            <option value="Flask">Flask</option>
            <option value="Django">Django</option>
            <option value="MongoDB">MongoDB</option>
            <option value="PostgreSQL">PostgreSQL</option>
            <option value="MySQL">MySQL</option>
            <option value="Firebase">Firebase</option>
            <option value="Docker">Docker</option>
            <option value="AWS">AWS</option>
            <option value="Azure">Azure</option>
            <option value="Git & GitHub">Git & GitHub</option>
            <option value="REST API">REST API</option>
            <option value="GraphQL">GraphQL</option>
            <option value="Redux">Redux</option>
            <option value="TypeScript">TypeScript</option>
            <option value="JavaScript">JavaScript</option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="Tailwind CSS">Tailwind CSS</option>
            <option value="SASS/SCSS">SASS/SCSS</option>
            <option value="Bootstrap">Bootstrap</option>
            <option value="Authentication">Authentication</option>
            <option value="Authorization">Authorization</option>
            <option value="JWT">JWT</option>
            <option value="CI/CD">CI/CD</option>
            <option value="Performance">Performance</option>
            <option value="SEO">SEO</option>
            <option value="Accessibility">Accessibility</option>
            <option value="Responsive Design">Responsive Design</option>
            <option value="Animations">Animations</option>
            <option value="Testing">Testing</option>
            <option value="Unit Testing">Unit Testing</option>
            <option value="Integration Testing">Integration Testing</option>
            <option value="Figma">Figma</option>
            <option value="Adobe XD">Adobe XD</option>
            <option value="Canva">Canva</option>
            <option value="Unity">Unity</option>
            <option value="C#">C#</option>
            <option value="Unreal Engine">Unreal Engine</option>
            <option value="Vercel">Vercel</option>
            <option value="Netlify">Netlify</option>
            <option value="Heroku">Heroku</option>
            <option value="DigitalOcean">DigitalOcean</option>
            <option value="Freelance">Freelance</option>
            <option value="Hackathon">Hackathon</option>
            <option value="Startup">Startup</option>
            <option value="Case Study">Case Study</option>
            <option value="Learning Project">Learning Project</option>
            <option value="Production Ready">Production Ready</option>
            <option value="Prototype">Prototype</option>
          </select>
        </div>

        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="status">Status</label>
          <select
            onChange={(ev) => setstatus(ev.target.value)}
            value={status}
            name="status"
            id="status"
          >
            <option value="">No Select</option>
            <option value="draft">Draft</option>
            <option value="publish">Publish</option>
          </select>
        </div>

        <div className="w-100 mb-1">
          <button type="submit" className="w-100 addwebbtn flex-center">
            Save
          </button>
        </div>
      </form>
    </>
  );
}
