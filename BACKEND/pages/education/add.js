import Head from 'next/head';
import EducationForm from '@/components/EducationForm';
import { GrGallery } from 'react-icons/gr';
import LoginLayout from "@/components/LoginLayout";

export default function AddEducation() {
  return (
    <>
    <LoginLayout>
      <Head>
        <title>Add Education Entry</title>
      </Head>
      <div className="educationAddPage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>Add Education Entry</h2>
            <h3>Admin Panel</h3>
          </div>
          <div className="breadcrumb">
            <GrGallery /> <span>/</span> <span>Add Education</span>
          </div>
        </div>
        <div className="form-container">
          <EducationForm />
        </div>
      </div>
      </LoginLayout>
    </>
  );
}
