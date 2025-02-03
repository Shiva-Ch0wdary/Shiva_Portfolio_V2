import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { FreeMode } from 'swiper/modules';
import Head from 'next/head';
import { useState } from 'react';
import useFetchData from '@/hooks/useFetchData';
import Spinner from '@/components/Spinner';
import Link from 'next/link';

export default function Experiences() {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(7);
    const [searchQuery, setSearchQuery] = useState('');

    const { alldata, loading } = useFetchData('/api/experiences');

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const allexperience = alldata.length;

    const filteredExperiences = searchQuery.trim() === '' 
        ? alldata 
        : alldata.filter(experience => experience.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const indexofFirstExperience = (currentPage - 1) * perPage;
    const indexofLastexperience = currentPage * perPage;

    const currentExperiences = filteredExperiences.slice(indexofFirstExperience, indexofLastexperience);
    const publishedData = currentExperiences.filter(ab => ab.status === 'publish');

    const sliderpubdata = alldata.filter(ab => ab.status === 'publish');

    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(allexperience / perPage); i++) {
        pageNumber.push(i);
    }

    return (
        <>
            <Head>
                <title>Experiences</title>
            </Head>
            <div className="experiencepage">
                <section className="tophero">
                    <div className="container">
                        <div className="toptitle">
                            <div className="toptitlecont flex">
                                <h1>Welcome to <span>Shiva's Experiences</span></h1>
                                <p>I break down complex user experiences problems to create integrity-focused solutions that connect billions of people.</p>
                                <div className="subemail">
                                    <form className="flex">
                                        <input 
                                            placeholder='Search here...' 
                                            type="text" 
                                            value={searchQuery} 
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        <button type="submit">Search</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="featured">
                            <div className="container">
                                <div className="border">
                                    <div className="featuredposts">
                                        <div className="fetitle flex">
                                            <h3>Featured Posts : </h3>
                                        </div>
                                        <div className="feposts flex">
                                            <Swiper
                                                slidesPerView={'auto'}
                                                freeMode={true}
                                                spaceBetween={30}
                                                className='mySwiper'
                                                modules={[FreeMode]}
                                            >
                                                {loading ? <Spinner /> : (
                                                    <>
                                                        {sliderpubdata.slice(0, 6).map((experience) => (
                                                            <SwiperSlide key={experience._id}>
                                                                <div className="fpost" key={experience._id}>
                                                                    <Link href={`/experiences/${experience.slug}`}>
                                                                        <img src={experience.images[0]} alt={experience.title} />
                                                                    </Link>
                                                                    <div className="fpostinfo">
                                                                        <div className="tegs flex">
                                                                            {experience.experiencecategory.map((cat, index) => (
                                                                                <Link href={`/experience/category/${cat}`} key={index} className='ai'>
                                                                                    <span>{cat}</span>
                                                                                </Link>
                                                                            ))}
                                                                        </div>
                                                                        <h2>
                                                                            <Link href={`/experiences/${experience.slug}`}>{experience.title}</Link>
                                                                        </h2>
                                                                        <div className="fpostby flex">
                                                                            <img src="/img/coder.jpg" alt="profile" />
                                                                            <p>By Shiva</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </SwiperSlide>
                                                        ))}
                                                    </>
                                                )}
                                            </Swiper>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="latestpostsec">
                    <div className="container">
                        <div className="border"></div>
                        <div className="latestpostsdata">
                            <div className="fetitle">
                                <h3>Latest Articles :</h3>
                            </div>
                            <div className="latestposts">
                                {loading ? <Spinner /> : (
                                    <>
                                        {publishedData.map((experience) => (
                                            <div className="lpost" key={experience._id}>
                                                <div className="lpostimg">
                                                    <Link href={`/experiences/${experience.slug}`}>
                                                        <img src={experience.images[0]} alt={experience.title} />
                                                    </Link>
                                                    <div className="tegs">
                                                        {experience.experiencecategory.map((cat, index) => (
                                                            <Link href={`/experience/category/${cat}`} key={index} className='ai'>
                                                                <span>{cat}</span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="lpostinfo">
                                                    <h3>
                                                        <Link href={`/experiences/${experience.slug}`}>{experience.title}</Link>
                                                    </h3>
                                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                                                    <h4 className="flex">
                                                        <img src="/img/coder.jpg" alt="profile" />
                                                        <span>By Shiva</span>
                                                    </h4>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>

                        {publishedData.length > 0 && (
                            <div className="experiencespaginationbtn flex flex-center mt-3">
                                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                                    Previous
                                </button>
                                {pageNumber
                                    .slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumber.length))
                                    .map(number => (
                                        <button 
                                            key={number}
                                            onClick={() => paginate(number)}
                                            className={`${currentPage === number ? 'active' : ''}`}
                                        >
                                            {number}
                                        </button>
                                    ))}
                                <button onClick={() => paginate(currentPage + 1)} disabled={currentExperiences.length < perPage}>
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
}