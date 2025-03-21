import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import ServiceForm from "@/components/ServiceForm";
import { MdTravelExplore } from "react-icons/md";

export default function EditService() {
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

  return (
    <>
      <Head>
        <title>Edit Service</title>
      </Head>
      <div className="experiencepage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Edit <span>{serviceData?.title || "Service Entry"}</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <MdTravelExplore /> <span>/</span> <span>Edit Service</span>
          </div>
        </div>
        <div className="mt-3">
          {serviceData ? (
            <ServiceForm existingService={serviceData} />
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    </>
  );
}
