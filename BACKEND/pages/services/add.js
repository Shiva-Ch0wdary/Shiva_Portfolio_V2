import Head from "next/head";
import ServiceForm from "@/components/ServiceForm";
import { GrGallery } from "react-icons/gr";
import LoginLayout from "@/components/LoginLayout";

export default function AddService() {
  return (
    <>
      <LoginLayout>
        <Head>
          <title>Add Service Entry</title>
        </Head>
        <div className="serviceAddPage">
          <div className="titledashboard flex flex-sb">
            <div>
              <h2>Add Service Entry</h2>
              <h3>Admin Panel</h3>
            </div>
            <div className="breadcrumb">
              <GrGallery /> <span>/</span> <span>Add Service</span>
            </div>
          </div>
          <div className="form-container">
            <ServiceForm />
          </div>
        </div>
      </LoginLayout>
    </>
  );
}
