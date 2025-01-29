import { IoIosContacts } from "react-icons/io";
import useFetchData from '../../hooks/useFetchData';
import { useState, useEffect } from "react";
import Dataloading from '/components/Dataloading'
import Link from 'next/link';
import { AiFillEyeInvisible } from "react-icons/ai";


export default function contacts() {

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(7);

    const [searchQuery, setSearchQuery] = useState('');

    const { alldata, loading } = useFetchData('/api/contacts');

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const allexperience = alldata.length;

    const filteredExperiences = searchQuery.trim() === '' ? alldata : alldata.filter(experience => experience.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const indexofFirstExperience = (currentPage - 1) * perPage;
    const indexofLastexperience = currentPage * perPage;

    const currentExperiences = filteredExperiences.slice(indexofFirstExperience, indexofLastexperience);
    const publishedexperiences = currentExperiences;
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(allexperience / perPage); i++) {
        pageNumber.push(i);
    }

    return <>
   <div className="experiencepage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>All <span>Contacts</span></h2>
                    <h3>Admin Panel</h3>
                </div>
                <div>
                   <IoIosContacts />
                    <span> /</span> <span>Contacts</span>
                </div>
            </div>

            <div>
                <div className="experiencestable">
                    <div className="flex gap-2 mb-1">
                        <h2>Search Contacts:</h2>
                        <input value={searchQuery} onChange={ev => setSearchQuery(ev.target.value)} type="text" placeholder="Search by title..." />
                    </div>

                    <table className="table table-styling">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Project</th>
                                <th>Open Contact</th>
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
                                        <td colSpan={6} className="text-center">No Contacts Found!</td>
                                    </tr>
                                ) : (
                                    publishedexperiences.map((experience, index) => (
                                        <tr key={experience._id}>
                                            <td> {indexofFirstExperience + index + 1} </td>
                                            <td><h3>{experience.name}</h3></td>
                                            <td><h3>{experience.email}</h3></td>
                                            <td><h3>{experience.phone}</h3></td>
                                            <td><h3>{experience.project[0]}</h3></td>
                                            <td>
                                                <div className="flex gap-2 flex-center">
                                                    <Link href={'/contacts/view/' + experience._id}><button><AiFillEyeInvisible />
                                                    </button></Link>
                                                    {/* <Link href={'/experiences/delete/' + experience._id}><button><MdDeleteSweep />
                                                    </button></Link> */}
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