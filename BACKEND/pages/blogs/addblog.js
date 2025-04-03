import Experience from "@/components/Blog";
import { ImBlog } from "react-icons/im";
import LoginLayout from "@/components/LoginLayout";

export default function Addexperience() {
  return (
    <>
      <LoginLayout>
        <div className="addexperiencespage">
          <div className="titledashboard flex flex-sb">
            <div>
              <h2>
                {" "}
                Add <span> Blog</span>
              </h2>
              <h3>Admin Panel</h3>
            </div>
            <div className="breadcrumb">
              <ImBlog /> <span>/</span> <span>Add Blog</span>
            </div>
          </div>
          <div className="experiencesadd">
            <Experience />
          </div>
        </div>
      </LoginLayout>
    </>
  );
}
