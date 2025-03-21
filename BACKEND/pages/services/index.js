import { useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import Spinner from "@/components/Spinner";
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep, MdTravelExplore } from "react-icons/md";
import Head from "next/head";
import Link from "next/link";

export default function ServiceAdmin() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(7);
  const [searchQuery, setSearchQuery] = useState("");

  const { alldata, loading } = useFetchData("/api/services");

  const filteredServices =
    searchQuery.trim() === ""
      ? alldata
      : alldata.filter(
          (srv) =>
            srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            srv.description.toLowerCase().includes(searchQuery.toLowerCase())
        );

  const indexOfFirst = (currentPage - 1) * perPage;
  const indexOfLast = currentPage * perPage;
  const currentServices = filteredServices.slice(indexOfFirst, indexOfLast);
  const totalEntries = filteredServices.length;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalEntries / perPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Head>
        <title>Service Admin Panel</title>
      </Head>
      <div className="experiencepage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              All Published <span>Services</span>
            </h2>
            <h3>Admin Panel</h3>
          </div>
          <div>
            <MdTravelExplore />
            <span> /</span>{" "}
            <span>
              <Link href="/services/add">Add Service</Link>
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="experiencestable">
          <div className="flex gap-2 mb-1">
            <h2>Search Service:</h2>
            <input
              type="text"
              placeholder="Search by title or description..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Table for Service Entries */}
          <div className="table-responsive">
            <table className="table table-styling">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Edit / Delete</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4">
                      <Spinner />
                    </td>
                  </tr>
                ) : filteredServices.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No Service Entries Found!
                    </td>
                  </tr>
                ) : (
                  currentServices.map((entry, index) => (
                    <tr key={entry._id}>
                      <td>{indexOfFirst + index + 1}</td>
                      <td>{entry.title}</td>
                      <td>{entry.description}</td>
                      <td>
                        <div className="flex gap-2 flex-center">
                          <Link href={"/services/edit/" + entry._id}>
                            <button>
                              <FaEdit />
                            </button>
                          </Link>
                          <Link href={"/services/delete/" + entry._id}>
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
          {filteredServices.length > 0 && (
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
                disabled={currentServices.length < perPage}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
