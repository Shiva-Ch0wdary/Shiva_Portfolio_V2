import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import Head from "next/head";
import { MdTravelExplore } from "react-icons/md";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

export default function DeleteService() {
  const router = useRouter();
  const { id } = router.query;
  const [serviceData, setServiceData] = useState(null);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`/api/services?id=${id}`)
      .then((response) => {
        setServiceData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching service data:", error);
      });
  }, [id]);

  function goBack() {
    router.push("/services");
  }

  async function deleteService() {
    try {
      await axios.delete("/api/services", { params: { id } });
      toast.success("Service deleted successfully");
      goBack();
    } catch (error) {
      toast.error("Error deleting service entry");
      console.error(error);
    }
  }

  return (
    <>
      <Head>
        <title>Delete Service Entry</title>
      </Head>
      <div className="experiencepage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Delete <span>{serviceData?.title || "Service Entry"}</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <MdTravelExplore /> <span>/</span> <span>Delete Service</span>
          </div>
        </div>
        <div className="deletesec flex flex-center wh_100">
          <div className="deletecard">
            <DeleteSweepIcon />
            <p className="cookieHeading">Are you sure?</p>
            <p className="cookieDescription">
              If you delete this service entry, it will be permanently removed!
            </p>
            <div className="buttonContainer">
              <button onClick={deleteService} className="acceptButton">
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
