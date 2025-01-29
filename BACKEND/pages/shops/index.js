import { FaShoppingCart } from "react-icons/fa";
import useFetchData from '../../hooks/useFetchData';
import { useState, useEffect } from "react";
import Dataloading from '/components/Dataloading'
import { FaEdit } from "react-icons/fa";
import Link from 'next/link';
import { MdDeleteSweep } from "react-icons/md";

export default function shops() {

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(7);

    const [searchQuery, setSearchQuery] = useState('');

    const { alldata, loading } = useFetchData('/api/shops');

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const allexperience = alldata.length;

    const filteredExperiences = searchQuery.trim() === '' ? alldata : alldata.filter(experience => experience.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const indexofFirstExperience = (currentPage - 1) * perPage;
    const indexofLastexperience = currentPage * perPage;

    const currentExperiences = filteredExperiences.slice(indexofFirstExperience, indexofLastexperience);
    const publishedexperiences = currentExperiences.filter(ab => ab.status === 'publish');
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(allexperience / perPage); i++) {
        pageNumber.push(i);
    }

    return <>
        <div className="experiencepage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>All Published <span>Products</span></h2>
                    <h3>Admin Panel</h3>
                </div>
                <div>
                    <FaShoppingCart />
                    <span> /</span> <span>AddProduct</span>
                </div>
            </div>

            <div>
                <div className="experiencestable">
                    <div className="flex gap-2 mb-1">
                        <h2>Search Products:</h2>
                        <input value={searchQuery} onChange={ev => setSearchQuery(ev.target.value)} type="text" placeholder="Search by title..." />
                    </div>

                    <table className="table table-styling">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Images</th>
                                <th>Title</th>
                                <th>Edit / Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? <>
                                <tr>
                                    <td>
                                        <Dataloading />
                                    </td>
                                </tr>
                            </> : <>
                                {publishedexperiences.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="text-center">No Products Found!</td>
                                    </tr>
                                ) : (
                                    publishedexperiences.map((experience, index) => (
                                        <tr key={experience._id}>
                                            <td> {indexofFirstExperience + index + 1} </td>
                                            <td><img src={experience.images[0]} width={180} alt="image" /></td>
                                            <td><h3>{experience.title}</h3></td>
                                            <td>
                                                <div className="flex gap-2 flex-center">
                                                    <Link href={'/shops/edit/' + experience._id}><button><FaEdit />
                                                    </button></Link>
                                                    <Link href={'/shops/delete/' + experience._id}><button><MdDeleteSweep />
                                                    </button></Link>
                                                </div>
                                            </td>
                                        </tr>

                                    ))
                                )}
                            </>}
                        </tbody>
                    </table>

                    {publishedexperiences.length === 0 ? ("") : (
                        <div className="experiencepagination">
                            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                            {pageNumber.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumber.length)).map(number => (
                                <button key={number}
                                    onClick={() => paginate(number)}
                                    className={`${currentPage === number ? 'active' : ''}`}>
                                    {number}
                                </button>
                            ))}
                            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage.length < perPage}>Next</button>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    </>
}