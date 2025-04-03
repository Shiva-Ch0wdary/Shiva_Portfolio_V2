import Photo from "@/components/photo";
import { GrGallery } from "react-icons/gr";
import LoginLayout from "@/components/LoginLayout";

export default function addphoto() {
  return (
    <>
      <LoginLayout>
        <div className="addexperiencespage">
          <div className="titledashboard flex flex-sb">
            <div>
              <h2>
                {" "}
                Add <span> Photos</span>
              </h2>
              <h3>Admin Panel</h3>
            </div>
            <div className="breadcrumb">
              <GrGallery /> <span>/</span> <span>Add Photo</span>
            </div>
          </div>
          <div className="experiencesadd">
            <Photo />
          </div>
        </div>
      </LoginLayout>
    </>
  );
}
