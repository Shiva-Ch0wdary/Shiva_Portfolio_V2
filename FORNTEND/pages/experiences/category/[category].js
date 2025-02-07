import Spinner from '@/components/Spinner';
import useFetchData from '@/hooks/useFetchData';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';


export default function Category() {


    const router = useRouter();
    const { category } = router.query;

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(7);
    const [searchQuery, setSearchQuery] = useState('');

    const { alldata, loading } = useFetchData(`/api/experiences?experiencecategory=${category}`);

    const filteredExperiences = alldata.filter((item) => item.category === item.category).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 20);

    const experiencecategoryData = [...filteredExperiences].reverse();

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const allexperience = alldata.length;

    const indexofFirstExperience = (currentPage - 1) * perPage;
    const indexofLastexperience = currentPage * perPage;

    const currentExperiences = filteredExperiences.slice(indexofFirstExperience, indexofLastexperience);

    const publishedData = currentExperiences.filter(ab => ab.status === 'publish');

    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(allexperience / perPage); i++) {
        pageNumber.push(i);
    }


    return <>
        <Head>
            <title>Experience category page</title>
        </Head>
        <div className="experiencecategory">
            <section className="tophero">
                <div className="container">
                    <div className="toptitle">
                        <div className="toptitlecont flex">
                            <h1>Category <span>{category}</span></h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className="latestpostssec">
                <div className="container">
                    <div className="border"></div>
                    <div className="latestpostsdata">
                        <div className="fetitle">
                            <h3><span style={{ fontWeight: 'bold' }}>{category}</span> Articles:</h3>
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
}