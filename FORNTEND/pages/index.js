import Head from "next/head";
import Link from "next/link";
import { BiDownload } from "react-icons/bi";
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa6";
import { GrLinkedinOption } from "react-icons/gr";
import { LiaBasketballBallSolid } from "react-icons/lia";
import { GoArrowUpRight } from "react-icons/go";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import Category from "./experiences/category/[category]";
import { LuMedal } from "react-icons/lu";
import { PiGraduationCapFill } from "react-icons/pi";
import experiences from "./experiences";
import { FaCalendarDays } from "react-icons/fa6";
import axios from "axios";

export default function Home() {
  // For hover effect on services
  const [activeIndex, setActiveIndex] = useState(0);
  const handleHover = (index) => setActiveIndex(index);
  const handleMouseOut = () => setActiveIndex(0);

  // Typing effect for hero section
  const words = ["Software Developer", "Game Developer", "UI Designer"];
  const typingSpeed = 100;
  const delayBetweenWords = 1000;
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let typingTimeout;
    const handleTyping = () => {
      const currentWord = words[currentWordIndex];
      if (!isDeleting) {
        setDisplayedText((prev) => currentWord.substring(0, prev.length + 1));
        if (displayedText === currentWord) {
          setTimeout(() => setIsDeleting(true), delayBetweenWords);
        }
      } else {
        setDisplayedText((prev) => currentWord.substring(0, prev.length - 1));
        if (displayedText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
      }
    };
    typingTimeout = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(typingTimeout);
  }, [displayedText, isDeleting, currentWordIndex, words]);

  // Fetch Education Data from backend
  const [educationData, setEducationData] = useState([]);
  const [educationLoading, setEducationLoading] = useState(true);

  useEffect(() => {
    setEducationLoading(true);
    axios
      .get("/api/education")
      .then((response) => {
        setEducationData(response.data);
        setEducationLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching education data:", error);
        setEducationLoading(false);
      });
  }, []);

  // Separate education entries by section
  const educationColumn1 = educationData.filter(
    (item) => item.section === "education"
  );
  const educationColumn2 = educationData.filter(
    (item) => item.section === "education2"
  );

  // Services data
  const services = [
    {
      title: "Web Development",
      description:
        "I am very good in web development offering services, I offer reliable web development services to generate the most remarkable results which your business need.",
    },
    {
      title: "Mobile Development",
      description:
        "Experienced mobile developer offering innovative solutions. Proficient in creating high-performance, user-centric mobile apps. Expertise in iOS, Android, and cross-platform development.",
    },
    {
      title: "Digital Marketing(SEO)",
      description:
        "My digital marketing services will take your business to the next level, we offer remarkable digital marketing strategies that drives traffic to your website, your business, and improves your brand awareness to potential customers.",
    },
    {
      title: "Content Creator",
      description:
        "Passionate photographer and videographer capturing moments with creativity. Transforming visions into visual stories. Expert in visual storytelling, skilled in both photography and videography to deliver captivating content.",
    },
  ];

  // Fetch Projects and Experiences Data
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [alldata, setAlldata] = useState([]);
  const [allwork, setAllwork] = useState([]);
  const [selectedCategory, setselectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectResponse, experiencesResponse] = await Promise.all([
          fetch("/api/projects"),
          fetch("/api/experiences"),
        ]);
        const projectData = await projectResponse.json();
        const experiencesData = await experiencesResponse.json();
        setAlldata(projectData);
        setAllwork(experiencesData);
      } catch (error) {
        console.error("Error Fetching Data", error);
      } finally {
        setProjectsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(alldata.filter((pro) => pro.status === "publish"));
    } else {
      setFilteredProjects(
        alldata.filter(
          (pro) =>
            pro.status === "publish" &&
            Array.isArray(pro.projectcategory) &&
            pro.projectcategory.includes(selectedCategory)
        )
      );
    }
  }, [selectedCategory, alldata]);

  const handleCategoryChange = (category) => setselectedCategory(category);

  const formaDate = (date) => {
    if (!date || isNaN(date)) return "";
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <>
      <Head>
        <title>Shiva - Personal Portfolio</title>
        <meta name="description" content="vbmcoder - Personal Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/png" href="/logo.png" />
      </Head>

      {/* Hero Section */}
      <section className="hero">
        <div className="intro_text">
          <svg viewBox="0 0 1320 300">
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              className="animate-stroke"
            >
              Hi
            </text>
          </svg>
        </div>
        <div className="container">
          <div className="flex w-100">
            <div className="heroinfoleft">
              <span className="hero_sb_title" data-aos="fade-right">
                I am Shiva
              </span>
              <h1 className="hero_title" data-aos="fade-right">
                Web Developer + <br />{" "}
                <span className="typed-text">{displayedText}</span>
              </h1>
              <div
                className="hero_img_box heroimgbox"
                data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
              >
                <img src="/img/me.jpg" alt="profile" />
              </div>
              <div className="lead" data-aos="fade-up">
                I break down complex user experiences problems to create
                integrity focused solutions that connect billions of people.
              </div>
              <div className="hero_btn_box" data-aos="fade-up">
                <Link href="/img/resume.pdf" download className="download_cv">
                  Download CV <BiDownload />
                </Link>
                <ul className="hero_social">
                  <li>
                    <a
                      target="_blank"
                      href="https://x.com/Shiva_Mandepudi?t=NiSjxAeFQBU1fudyPRov6A&s=09"
                    >
                      <FaTwitter />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <LiaBasketballBallSolid />
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href="https://www.linkedin.com/in/mandapudi-shiva-rama-krishna-588706204/"
                    >
                      <GrLinkedinOption />
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href="https://github.com/Shiva-Ch0wdary">
                      <FaGithub />
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href="https://discordapp.com/users/Shiva_Ram#5331"
                    >
                      <FaDiscord />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="heroimageright">
              <div
                className="hero_img_box"
                data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
              >
                <img src="/img/me.png" alt="profile" />
              </div>
            </div>
          </div>
          <div className="funfect_area flex flex-sb">
            <div className="funfect_item" data-aos="fade-right">
              <h3>1+</h3>
              <h4>
                Years Of <br /> Experience
              </h4>
            </div>
            <div className="funfect_item" data-aos="fade-right">
              <h3>25+</h3>
              <h4>
                Projects <br /> Completed
              </h4>
            </div>
            <div className="funfect_item" data-aos="fade-left">
              <h3>1</h3>
              <h4>
                Research <br /> Experience
              </h4>
            </div>
            <div className="funfect_item" data-aos="fade-left">
              <h3>1</h3>
              <h4>
                OpenSource <br /> Library
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services">
        <div className="container">
          <div className="services_titles" data-aos="fade-up">
            <h2>My Quality Services</h2>
            <p>
              We put ideas and thoughts in the form of unique web projects that
              inspire you and your customers.
            </p>
          </div>
          <div className="services_menu" data-aos="fade-up">
            {services.map((service, index) => (
              <div
                key={index}
                className={`services_item ${
                  activeIndex === index ? "sactive" : ""
                }`}
                onMouseOver={() => handleHover(index)}
                onMouseOut={handleMouseOut}
              >
                <div className="left_s_box">
                  <span>0{index + 1}</span>
                  <h3>{service.title}</h3>
                </div>
                <div className="right_s_box">
                  <p>{service.description}</p>
                </div>
                <GoArrowUpRight />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="projects">
        <div className="container">
          <div className="project_titles" data-aos="fade-up">
            <h2>My Recent Projects</h2>
            <p>
              We put ideas and thoughts in the form of unique web projects that
              inspire you and your customers.
            </p>
          </div>
          <div className="project_buttons">
            <button
              className={selectedCategory === "All" ? "active" : ""}
              onClick={() => setselectedCategory("All")}
            >
              All
            </button>
            <button
              className={
                selectedCategory === "Website Development" ? "active" : ""
              }
              onClick={() => setselectedCategory("Website Development")}
            >
              Website
            </button>
            <button
              className={selectedCategory === "Game Developement" ? "active" : ""}
              onClick={() => setselectedCategory("Game Developement")}
            >
              Games
            </button>
            <button
              className={selectedCategory === "App Development" ? "active" : ""}
              onClick={() => setselectedCategory("App Development")}
            >
              Apps
            </button>
            <button
              className={
                selectedCategory === "E-Commerce Site" ? "active" : ""
              }
              onClick={() => setselectedCategory("E-Commerce Site")}
            >
              E-Commerce
            </button>
          </div>
          <div className="projects_cards">
            {projectsLoading ? (
              <div className="flex flex-center wh_50">
                <Spinner />
              </div>
            ) : filteredProjects.length === 0 ? (
              <h1>No Project Found</h1>
            ) : (
              filteredProjects.slice(0, 4).map((pro) => (
                <Link
                  href="/"
                  key={pro._id}
                  className="procard"
                  data-aos="flip-left"
                >
                  <div className="proimgbox">
                    <img src={pro.images[0]} alt={pro.title} />
                  </div>
                  <div className="procontentbox">
                    <h2>{pro.title}</h2>
                    <GoArrowUpRight />
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="exstudy">
        <div className="container flex flex-left flex-sb">
          {/* First Column – Education */}
          <div className="experience">
            <div
              className="experience_title flex gap-1"
              data-aos="fade-right"
            >
              <LuMedal />
              <h2>My Education</h2>
            </div>
            <div className="exper_cards">
              {educationLoading ? (
                <Spinner />
              ) : (
                educationColumn1.map((item) => (
                  <div
                    key={item._id}
                    className="exper_card"
                    data-aos="fade-up"
                  >
                    <span>{item.period}</span>
                    <h3>{item.institution}</h3>
                    <p>{item.degree}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Second Column – Education2 */}
          <div className="education">
            <div
              className="experience_title flex gap-1"
              data-aos="fade-left"
            >
              <PiGraduationCapFill />
              <h2>My Experiences</h2>
            </div>
            <div className="exper_cards">
              {educationLoading ? (
                <Spinner />
              ) : (
                educationColumn2.map((item) => (
                  <div
                    key={item._id}
                    className="exper_card"
                    data-aos="fade-up"
                  >
                    <span>{item.period}</span>
                    <h3>{item.institution}</h3>
                    <p>{item.degree}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* My Skills */}
      <section className="myskills">
        <div className="container">
          <div className="myskills_title" data-aos="fade-up">
            <h2>My Skills</h2>
            <p>
              We put ideas and thoughts in the form of unique web projects that
              inspire you and your customers.
            </p>
          </div>
          <div className="myskils_cards">
            <div className="mys_card" data-aos="fade-right">
              <div className="mys_inner">
                <img src="/img/python.svg" alt="python" />
                <h3>99%</h3>
              </div>
              <p className="text-center">Python</p>
            </div>
            <div className="mys_card" data-aos="fade-right">
              <div className="mys_inner">
                <img src="/img/firebase.svg" alt="firebase" />
                <h3>80%</h3>
              </div>
              <p className="text-center">Firebase</p>
            </div>
            <div className="mys_card" data-aos="fade-right">
              <div className="mys_inner">
                <img src="/img/redux.svg" alt="redux" />
                <h3>70%</h3>
              </div>
              <p className="text-center">Redux</p>
            </div>
            <div className="mys_card" data-aos="fade-left">
              <div className="mys_inner">
                <img src="/img/mongodb.svg" alt="mongodb" />
                <h3>90%</h3>
              </div>
              <p className="text-center">Mongo DB</p>
            </div>
            <div className="mys_card" data-aos="fade-left">
              <div className="mys_inner">
                <img src="/img/react.svg" alt="react" />
                <h3>100%</h3>
              </div>
              <p className="text-center">React</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Experiences */}
      <section className="recentexperiences">
        <div className="container">
          <div className="myskills_title" data-aos="fade-up">
            <h2>Recent Experiences</h2>
            <p>
              We put ideas and thoughts in the form of unique web projects that
              inspire you and your customers.
            </p>
          </div>
          <div className="recent_experiences">
            {allwork.slice(0, 3).map((experience) => (
              <Link
                href={`/experiences/${experience.slug}`}
                key={experience._id}
                className="re_experience"
                data-aos="flip-left"
              >
                <div className="re_experienceimg">
                  <img
                    src={experience.images[0] || "/img/noimage.png"}
                    alt={experience.title}
                  />
                  <span>{experience.experiencecategory[0]}</span>
                </div>
                <div className="re_experienceinfo">
                  <div className="re_topdate flex gap-1">
                    <div className="res_date">
                      <FaCalendarDays />{" "}
                      <span>
                        {formaDate(new Date(experience.createdAt))}
                      </span>
                    </div>
                  </div>
                  <h2>{experience.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
