import Experience from "@/components/Experience";
import { ImBlog } from "react-icons/im";


export default function Addexperience() {



    return <>
        <div className="addexperiencespage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2> Add <span> Experience</span></h2>
                    <h3>Admin Panel</h3>
                </div>
                <div className="breadcrumb">
                    <ImBlog /> <span>/</span> <span>Add Experience</span>
                </div>
            </div>
            <div className="experiencesadd">
                <Experience />
            </div>
        </div>
    </>
}