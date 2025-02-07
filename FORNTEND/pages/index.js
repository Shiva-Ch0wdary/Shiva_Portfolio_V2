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


export default function Home() {

  const [activeIndex, setActiveIndex] = useState(0);

  const handleHover = (index) => {
    setActiveIndex(index);
  }

  const handleMouseOut = () => {
    setActiveIndex(0);
  }


  const words = ["Software Developer", "Game Developer", "UI Designer"]; // List of words
  const typingSpeed = 100; // Speed of typing (in milliseconds per letter)
  const delayBetweenWords = 1000; // Delay before starting the next word (in milliseconds)

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState(""); // Text being typed
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let typingTimeout;

    const handleTyping = () => {
      const currentWord = words[currentWordIndex];
      if (!isDeleting) {
        // Typing letters
        setDisplayedText((prev) => currentWord.substring(0, prev.length + 1));

        if (displayedText === currentWord) {
          // If the word is fully typed, wait and then start deleting
          setTimeout(() => setIsDeleting(true), delayBetweenWords);
        }
      } else {
        // Deleting letters
        setDisplayedText((prev) => currentWord.substring(0, prev.length - 1));

        if (displayedText === "") {
          // If fully deleted, move to the next word
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
      }
    };

    typingTimeout = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(typingTimeout); // Cleanup timeout on unmount
  }, [displayedText, isDeleting, currentWordIndex, words]);

  // services data
  const services = [
    {
      title: "Web Development",
      description: "I am very good in web development offering services, I offer reliable web development services to generate the most remarkable results which your business need."
    },
    {
      title: "Mobile Development",
      description: "Experienced mobile developer offering innovative solutions. Proficient in creating high-performance, user-centric mobile apps. Expertise in iOS, Android, and cross-platform development."
    },
    {
      title: "Digital Marketing(SEO)",
      description: "My digital marketing services will take your business to the next level, we offer remarkable digital marketing strategies that drives traffic to your website, your business, and improves your brand awareness to potential customers."
    },
    {
      title: "Content Creator",
      description: "Passionate photographer and videographer capturing moments with creativity. Transforming visions into visual stories. Expert in visual storytelling, skilled in both photography and videography to deliver captivating content."
    }
  ];

  const [loading, setLoading] = useState(true);
  const [alldata, setAlldata] = useState([]);
  const [allwork, setAllwork] = useState([]);
  const [selectedCategory, setselectedCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectResponse, experiencesResponse] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/experiences')
        ])

        const projectData = await projectResponse.json();
        const experiencesData = await experiencesResponse.json();

        setAlldata(projectData);
        setAllwork(experiencesData);


      } catch (error) {
        console.error('Error Fetching Data', error)
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [])

  useEffect(() => {
    console.log('Filtered Projects:', filteredProjects);
    if (selectedCategory === 'All') {
      setFilteredProjects(alldata.filter(pro => pro.status === 'publish'));
    } else {
      setFilteredProjects(
        alldata.filter(pro =>
          pro.status === 'publish' &&
          Array.isArray(pro.projectcategory) &&
          pro.projectcategory.includes(selectedCategory)
        )
      );
    }
  }, [selectedCategory, alldata]);



  const handleCategoryChange = (category) => {
    setselectedCategory(category);
  }

  const formaDate = (date) => {
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

  return (
    <>
      <Head>
        <title>Shiva - Personal Portfolio</title>
        <meta name="description" content="vbmcoder - Personal Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
      </Head>

      {/* hero section */}
      <section className="hero">
        <div className="intro_text">
          <svg viewBox="0 0 1320 300">
            <text x='50%' y='50%' textAnchor="middle" className="animate-stroke">Hi</text>
          </svg>
        </div>
        <div className="container">
          <div className="flex w-100">
            <div className="heroinfoleft">
              <span className="hero_sb_title" data-aos='fade-right'>I am Shiva</span>
              <h1 className="hero_title" data-aos='fade-right'>Web Developer + <br /> <span className="typed-text">{displayedText}</span>
              </h1>
              <div className="hero_img_box heroimgbox" data-aos='flip-left' data-aos-easing='ease-out-cubic' data-aos-duration='2000'>
                <img src="/img/me.jpg" alt="profile" />
              </div>
              <div className="lead" data-aos='fade-up'>I break down complex user experiences problems to create integritiy focused solutions that connect billions of people</div>
              <div className="hero_btn_box"  data-aos='fade-up'>
                <Link href='/' download={'/img/resume.pdf'} className="download_cv">Download CV <BiDownload /></Link>
                <ul className="hero_social">
                  <li><a href="/"><FaTwitter /></a></li>
                  <li><a href="/"><LiaBasketballBallSolid /></a></li>
                  <li><a href="/"><GrLinkedinOption /></a></li>
                  <li><a href="/"><FaGithub /></a></li>
                  <li><a href="/"><FaDiscord /></a></li>
                </ul>
              </div>
            </div>

            <div className="heroimageright">
              <div className="hero_img_box" data-aos='flip-left' data-aos-easing='ease-out-cubic' data-aos-duration='2000'>
                <img src="/img/me.png" alt="profile" />
              </div>
            </div>
          </div>
          <div className="funfect_area flex flex-sb">
            <div className="funfect_item" data-aos='fade-right'>
              <h3>1+</h3>
              <h4>Years Of <br /> Experience</h4>
            </div>
            <div className="funfect_item" data-aos='fade-right'>
              <h3>25+</h3>
              <h4>Projects <br /> Completed</h4>
            </div>
            <div className="funfect_item" data-aos='fade-left'>
              <h3>1</h3>
              <h4>Research <br /> Experience</h4>
            </div>
            <div className="funfect_item" data-aos='fade-left'>
              <h3>1</h3>
              <h4>OpenSource <br /> Library</h4>
            </div>
          </div>

        </div>


      </section>

      {/* Services */}
      <section className="services">
        <div className="container">
          <div className="services_titles"  data-aos='fade-up'>
            <h2>My Quality Services</h2>
            <p>We put ideas and thoughts in the form of a unique web projects that inspire you and your customers.</p>
          </div>
          <div className="services_menu"  data-aos='fade-up'>
            {services.map((service, index) => (
              <div key={index} className={`services_item ${activeIndex === index ? 'sactive' : ''}`}
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
          <div className="project_titles"  data-aos='fade-up'>
            <h2>My Recent Projects</h2>
            <p>We put ideas and thoughts in the form of a unique web projects that inspire you and your customers.</p>
          </div>
          <div className="project_buttons" >
            <button className={selectedCategory === 'All' ? 'active' : ''} onClick={() => setselectedCategory('All')}>All</button>
            <button className={selectedCategory === 'Website Development' ? 'active' : ''} onClick={() => setselectedCategory('Website Development')}>Website</button>
            <button className={selectedCategory === 'Game Developement' ? 'active' : ''} onClick={() => setselectedCategory('Game Developement')}>Games</button>
            <button className={selectedCategory === 'App Development' ? 'active' : ''} onClick={() => setselectedCategory('App Development')}>Apps</button>
            <button className={selectedCategory === 'E-Commerce Site' ? 'active' : ''} onClick={() => setselectedCategory('E-Commerce Site')}>E-Commerce</button>
          </div>
          <div className="projects_cards" >
            {loading ? <div className="flex flex-center wh_50"><Spinner /></div> : (
              filteredProjects.length === 0 ? (<h1>No Project Found</h1>) : (
                filteredProjects.slice(0, 4).map((pro) => (
                  <Link href='/' key={pro._id} className="procard" data-aos="flip-left">
                    <div className="proimgbox">
                      <img src={pro.images[0]} alt={pro.title} />
                    </div>
                    <div className="procontentbox">
                      <h2>{pro.title}</h2>
                      <GoArrowUpRight />
                    </div>
                  </Link>
                ))
              )
            )}
          </div>
        </div>

      </section>

      {/* Experience study */}
      <section className="exstudy">
        <div className="container flex flex-left flex-sb">
          <div className="experience">
            <div className="experience_title flex gap-1" data-aos="fade-right">
              <LuMedal />
              <h2>My Education</h2>
            </div>
            <div className="exper_cards">
              <div className="exper_card" data-aos="fade-up">
                <span>2020-2024</span>
                <h3>IIIT Sri City</h3>
                <p>B.Tech in Computer Science</p>
              </div>
              <div className="exper_card" data-aos="fade-up">
                <span>2018-2020</span>
                <h3>Resonance Jr College</h3>
                <p>Intermediate</p>
              </div>
              <div className="exper_card" data-aos="fade-up">
                <span>2017-2018</span>
                <h3>Abhinav High School</h3>
                <p>Secondary Board Of Education</p>
              </div>
            </div>
          </div>
          <div className="education">
            <div className="experience_title flex gap-1" data-aos="fade-left">
              <PiGraduationCapFill />
              <h2>My Education 2</h2>
            </div>
            <div className="exper_cards">
              <div className="exper_card" data-aos="fade-up">
                <span>2020-2024</span>
                <h3>IIIT Sri City</h3>
                <p>B.Tech in Computer Science</p>
              </div>
              <div className="exper_card" data-aos="fade-up">
                <span>2018-2020</span>
                <h3>Resonance Jr College</h3>
                <p>Intermediate</p>
              </div>
              <div className="exper_card" data-aos="fade-up">
                <span>2017-2018</span>
                <h3>Abhinav High School</h3>
                <p>Secondary Board Of Education</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* My Skills */}
      <section className="myskills">
        <div className="container">
          <div className="myskills_title" data-aos="fade-up">
            <h2>My Skills</h2>
            <p>We put ideas and thoughts in the form of a unique web projects that inspire you and your customers.</p>
          </div>
          <div className="myskils_cards">
            <div className="mys_card" data-aos="fade-right">
              <div className="mys_inner" >
                <img src="/img/python.svg" alt="python" />
                <h3>99%</h3>
              </div>
              <p className="text-center" >Python</p>
            </div>
            <div className="mys_card" data-aos="fade-right">
              <div className="mys_inner">
                <img src="/img/firebase.svg" alt="firebase" />
                <h3>80%</h3>
              </div>
              <p className="text-center" >Firebase</p>
            </div>
            <div className="mys_card" data-aos="fade-right">
              <div className="mys_inner">
                <img src="/img/redux.svg" alt="redux" />
                <h3>70%</h3>
              </div>
              <p className="text-center" >Redux</p>
            </div>
            <div className="mys_card" data-aos="fade-left">
              <div className="mys_inner">
                <img src="/img/mongodb.svg" alt="mongodb" />
                <h3>90%</h3>
              </div>
              <p className="text-center" >Mongo DB</p>
            </div>
            <div className="mys_card" data-aos="fade-left">
              <div className="mys_inner">
                <img src="/img/react.svg" alt="react" />
                <h3>100%</h3>
              </div>
              <p className="text-center" >React</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Experiences */}
      <section className="recentexperiences">
        <div className="container">
          <div className="myskills_title" data-aos="fade-up">
            <h2>Recent Experiences</h2>
            <p>We put ideas and thoughts in the form of a unique web projects that inspire you and your customers.</p>
          </div>
          <div className="recent_experiences">
            {allwork.slice(0, 3).map((experience) => {
              return <Link href={`/experiences/${experience.slug}`} key={experience._id} className="re_experience" data-aos="flip-left">
                <div className="re_experienceimg">
                  <img src={experience.images[0] || '/img/noimage.png'} alt={experience.title} />
                  <span>{experience.experiencecategory[0]}</span>
                </div>
                <div className="re_experienceinfo">
                  <div className="re_topdate flex gap-1">
                    <div className="res_date">
                      <FaCalendarDays /> <span>{formaDate(new Date(experience.createdAt))}</span>
                    </div>
                  </div>
                  <h2>{experience.title}</h2>
                </div>
              </Link>
            })}
          </div>
        </div>
      </section>

    </>
  );
}
