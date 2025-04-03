import { useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep, MdTravelExplore } from "react-icons/md";
import Head from "next/head";
import Link from "next/link";
import LoginLayout from "@/components/LoginLayout";

export default function EducationAdmin() {
  // Pagination and search states
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(7);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all education entries using your custom hook
  const { alldata, loading } = useFetchData("/api/education");

  // Filter data based on search query (searches in section, period, institution, and degree)
  const filteredEducation =
    searchQuery.trim() === ""
      ? alldata
      : alldata.filter(
          (edu) =>
            edu.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
            edu.period.toLowerCase().includes(searchQuery.toLowerCase()) ||
            edu.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
            edu.degree.toLowerCase().includes(searchQuery.toLowerCase())
        );

  // Calculate indices for pagination
  const indexOfFirstEdu = (currentPage - 1) * perPage;
  const indexOfLastEdu = currentPage * perPage;
  const currentEducations = filteredEducation.slice(
    indexOfFirstEdu,
    indexOfLastEdu
  );
  const totalEntries = filteredEducation.length;

  // Create page numbers array
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalEntries / perPage); i++) {
    pageNumbers.push(i);
  }

  // Function to update current page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <LoginLayout>
        <div className="experiencepage">
          <div className="titledashboard flex flex-sb">
            <div>
              <h2>
                All Published <span>Educations & Experiences</span>
              </h2>
              <h3>Admin Panel</h3>
            </div>
            <div>
              <MdTravelExplore />
              <span> /</span> <span>AddEducations</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="experiencestable">
            <div className="flex gap-2 mb-1">
              <h2>Search Education:</h2>
              <input
                type="text"
                placeholder="Search by section, period, institution, or degree..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            {/* Table for Education Entries */}
            <div className="table-responsive">
              <table className="table table-styling">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Section</th>
                    <th>Period</th>
                    <th>Institution</th>
                    <th>Degree</th>
                    <th>Edit / Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6">
                        <Spinner />
                      </td>
                    </tr>
                  ) : filteredEducation.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No Education Entries Found!
                      </td>
                    </tr>
                  ) : (
                    currentEducations.map((entry, index) => (
                      <tr key={entry._id}>
                        <td>{indexOfFirstEdu + index + 1}</td>
                        <td>{entry.section}</td>
                        <td>{entry.period}</td>
                        <td>{entry.institution}</td>
                        <td>{entry.degree}</td>
                        <td>
                          <div className="flex gap-2 flex-center">
                            <Link href={"/education/edit/" + entry._id}>
                              <button>
                                <FaEdit />
                              </button>
                            </Link>
                            <Link href={"/education/delete/" + entry._id}>
                              <button>
                                <MdDeleteSweep />
                              </button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {filteredEducation.length > 0 && (
              <div className="experiencepagination">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {pageNumbers
                  .slice(
                    Math.max(currentPage - 3, 0),
                    Math.min(currentPage + 2, pageNumbers.length)
                  )
                  .map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`${currentPage === number ? "active" : ""}`}
                    >
                      {number}
                    </button>
                  ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentEducations.length < perPage}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </LoginLayout>
    </>
  );
}
