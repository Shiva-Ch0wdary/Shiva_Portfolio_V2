import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";

export default function projects() {

    const { alldata, loading } = useFetchData('/api/projects');

    const publishedData = alldata.filter(ab => ab.status === 'publish');

    const [selectedCategory, setselectedCategory] = useState('All');
    const [filteredProjects, setFilteredProjects] = useState([]);

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


    return <>
        <Head>
            <title>Project</title>
        </Head>
        <div className="projectpage">
            <div className="projects">
                <div className="container">
                    <div className="project_titles" data-aos="fade-down">
                        <h2>My Recent Works</h2>
                        <p>Turning concepts into impactful web projects that not only engage users but also create lasting value for your business.</p>
                    </div>

                    <div className="projects_buttons" data-aos="fade-right">
                        <div className="project_buttons">
                            <button className={selectedCategory === 'All' ? 'active' : ''} onClick={() => setselectedCategory('All')}>All</button>
                            <button className={selectedCategory === 'Website Development' ? 'active' : ''} onClick={() => setselectedCategory('Website Development')}>Website</button>
                            <button className={selectedCategory === 'Game Developement' ? 'active' : ''} onClick={() => setselectedCategory('Game Developement')}>Games</button>
                            <button className={selectedCategory === 'App Development' ? 'active' : ''} onClick={() => setselectedCategory('App Development')}>Apps</button>
                            <button className={selectedCategory === 'E-Commerce Site' ? 'active' : ''} onClick={() => setselectedCategory('E-Commerce Site')}>E-Commerce</button>
                        </div>
                    </div>

                    <div className="projects_cards">
                        {loading ? <div className="flex flex-center wh_50"><Spinner /></div> : (
                            filteredProjects.length === 0 ? (<h1>No Project Found</h1>) : (
                                filteredProjects.map((pro) => (
                                    <Link href={`/projects/${pro.slug}`} key={pro._id} className="procard" data-aos="flip-left">
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
            </div>

        </div>
    </>
}