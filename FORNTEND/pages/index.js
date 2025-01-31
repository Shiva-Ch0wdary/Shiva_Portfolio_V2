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


export default function Home() {

  const [activeIndex, setActiveIndex] = useState(0);

  const handleHover = (index) => {
    setActiveIndex(index);
  }

  const handleMouseOut = () => {
    setActiveIndex(0);
  }

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
          fetch('/api/projects')
        ])

        const projectData = await projectResponse.json();

        setAlldata(projectData);


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
              <span className="hero_sb_title">I am Shiva</span>
              <h1 className="hero_title">Web developer + <br /> <span className="typed-text">Game Developer</span></h1>
              <div className="hero_img_box heroimgbox">
                <img src="/img/me.jpg" alt="profile" />
              </div>
              <div className="lead">I break down complex user experiences problems to create integritiy focused solutions that connect billions of people</div>
              <div className="hero_btn_box">
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
              <div className="hero_img_box">
                <img src="/img/me.png" alt="profile" />
              </div>
            </div>
          </div>
          <div className="funfect_area flex flex-sb">
            <div className="funfect_item">
              <h3>1+</h3>
              <h4>Years Of <br /> Experience</h4>
            </div>
            <div className="funfect_item">
              <h3>25+</h3>
              <h4>Projects <br /> Completed</h4>
            </div>
            <div className="funfect_item">
              <h3>1</h3>
              <h4>Research <br /> Experience</h4>
            </div>
            <div className="funfect_item">
              <h3>1</h3>
              <h4>OpenSource <br /> Library</h4>
            </div>
          </div>

        </div>


      </section>

      {/* Services */}
      <section className="services">
        <div className="container">
          <div className="services_titles">
            <h2>My Quality Services</h2>
            <p>We put ideas and thoughts in the form of a unique web projects that inspire you and your customers.</p>
          </div>
          <div className="services_menu">
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
          <div className="project_titles">
            <h2>My Recent Projects</h2>
            <p>We put ideas and thoughts in the form of a unique web projects that inspire you and your customers.</p>
          </div>
          <div className="project_buttons">
            <button className={selectedCategory === 'All' ? 'active' : ''} onClick={() => setselectedCategory('All')}>All</button>
            <button className={selectedCategory === 'Website Development' ? 'active' : ''} onClick={() => setselectedCategory('Website Development')}>Website</button>
            <button className={selectedCategory === 'Game Developement' ? 'active' : ''} onClick={() => setselectedCategory('Game Developement')}>Games</button>
            <button className={selectedCategory === 'App Development' ? 'active' : ''} onClick={() => setselectedCategory('App Development')}>Apps</button>
            <button className={selectedCategory === 'E-Commerce Site' ? 'active' : ''} onClick={() => setselectedCategory('E-Commerce Site')}>E-Commerce</button>

          </div>
          <div className="projects_cards">
            {loading ? <div className="flex flex-center wh_50"><Spinner /></div> : (
              filteredProjects.length === 0 ? (<h1>No Project Found</h1>) : (
                filteredProjects.slice(0, 4).map((pro) => (
                  <Link href='/' key={pro._id} className="procard">
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

      </section>

      {/* My Skills */}
      <section className="myskills">

      </section>

      {/* Recent Experiences */}
      <section className="recentexperiences">

      </section>

    </>
  );
}
