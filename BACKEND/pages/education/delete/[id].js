import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import Head from "next/head";
import { MdTravelExplore } from "react-icons/md";

export default function DeleteEducation() {
  const router = useRouter();
  const { id } = router.query;
  const [educationData, setEducationData] = useState(null);

  useEffect(() => {
    if (!id) return;
    axios
      .get("/api/education?id=" + id)
      .then((response) => {
        setEducationData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching education data:", error);
      });
  }, [id]);

  function goBack() {
    router.push("/education");
  }

  async function deleteEducation() {
    try {
      await axios.delete("/api/education?id=" + id);
      toast.success("Deleted Successfully");
      goBack();
    } catch (error) {
      toast.error("Error deleting education entry");
      console.error(error);
    }
  }

  return (
    <>
      <Head>
        <title>Delete Education Entry</title>
      </Head>
      <div className="experiencepage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Delete <span>{educationData?.institution || "Education Entry"}</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <MdTravelExplore /> <span>/</span> <span>Delete Education</span>
          </div>
        </div>
        <div className="deletesec flex flex-center wh_100">
          <div className="deletecard">
            <DeleteSweepIcon />
            <p className="cookieHeading">Are you sure?</p>
            <p className="cookieDescription">
              If you delete this education entry, it will be permanently removed!
            </p>
            <div className="buttonContainer">
              <button onClick={deleteEducation} className="acceptButton">
                Delete
              </button>
              <button onClick={goBack} className="declineButton">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
