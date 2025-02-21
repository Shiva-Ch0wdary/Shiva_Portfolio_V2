import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import { MdTravelExplore } from "react-icons/md";
import { useRouter } from "next/router";
import EducationForm from "@/components/EducationForm";

export default function EditEducation() {
  const router = useRouter();
  const { id } = router.query;
  const [educationData, setEducationData] = useState(null);

  useEffect(() => {
    if (!id) return;
    axios
      .get("/api/education?id=" + id)
      .then((response) => {
        console.log("Fetched education data:", response.data);
        setEducationData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching education entry:", error);
      });
  }, [id]);

  return (
    <>
      <Head>
        <title>Update Education</title>
      </Head>
      <div className="experiencepage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Edit{" "}
              <span>
                {educationData?.institution || "Education Entry"}
              </span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <MdTravelExplore /> <span>/</span>{" "}
            <span>Edit Education</span>
          </div>
        </div>
        <div className="mt-3">
          {educationData ? (
            <EducationForm existingEducation={educationData} />
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    </>
  );
}
