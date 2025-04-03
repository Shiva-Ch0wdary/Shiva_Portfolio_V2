import { IoIosContacts } from "react-icons/io";
import useFetchData from "../../hooks/useFetchData";
import { useState } from "react";
import Dataloading from "/components/Dataloading";
import Link from "next/link";
import { AiFillEyeInvisible } from "react-icons/ai";
import LoginLayout from "@/components/LoginLayout";

export default function Contacts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const { alldata, loading } = useFetchData("/api/contacts");

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredExperiences =
    searchQuery.trim() === ""
      ? alldata
      : alldata.filter((experience) =>
          experience.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          experience.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          experience.project?.[0]?.toLowerCase().includes(searchQuery.toLowerCase())
        );

  const indexofFirstExperience = (currentPage - 1) * perPage;
  const indexofLastexperience = currentPage * perPage;

  const currentExperiences = filteredExperiences.slice(
    indexofFirstExperience,
    indexofLastexperience
  );
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(filteredExperiences.length / perPage); i++) {
    pageNumber.push(i);
  }

  return (
    <LoginLayout>
      <div className="experiencepage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              All <span>Contacts</span>
            </h2>
            <h3>Admin Panel</h3>
          </div>
          <div>
            <IoIosContacts />
            <span> /</span> <span>Contacts</span>
          </div>
        </div>

        <div className="experiencestable">
          <div className="flex gap-2 mb-1">
            <h2>Search Contacts:</h2>
            <input
              value={searchQuery}
              onChange={(ev) => setSearchQuery(ev.target.value)}
              type="text"
              placeholder="Search by name, email or project..."
            />
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
              {loading ? (
                <tr>
                  <td colSpan={6}>
                    <Dataloading />
                  </td>
                </tr>
              ) : currentExperiences.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center">
                    No Contacts Found!
                  </td>
                </tr>
              ) : (
                currentExperiences.map((experience, index) => (
                  <tr key={experience._id}>
                    <td>{indexofFirstExperience + index + 1}</td>
                    <td>
                      <h3>{experience.name}</h3>
                    </td>
                    <td>
                      <h3>{experience.email}</h3>
                    </td>
                    <td>
                      <h3>{experience.phone}</h3>
                    </td>
                    <td>
                      <h3>{experience.project?.[0]}</h3>
                    </td>
                    <td>
                      <div className="flex gap-2 flex-center">
                        <Link href={`/contacts/view/${experience._id}`}>
                          <button>
                            <AiFillEyeInvisible />
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {currentExperiences.length > 0 && (
            <div className="experiencepagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {pageNumber
                .slice(
                  Math.max(currentPage - 3, 0),
                  Math.min(currentPage + 2, pageNumber.length)
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
                disabled={currentExperiences.length < perPage}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </LoginLayout>
  );
}
