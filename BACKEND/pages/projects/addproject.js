
import Project from "@/components/Project";
import { MdWorkHistory } from "react-icons/md";

export default function Addproject() {

    return <>
        <div className="addexperiencespage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2> Add <span> Projects</span></h2>
                    <h3>Admin Panel</h3>
                </div>
                <div className="breadcrumb">
                    <MdWorkHistory /> <span>/</span> <span>Add Project</span>
                </div>
            </div>
            <div className="experiencesadd">
                <Project />
            </div>
        </div>
    </>
}