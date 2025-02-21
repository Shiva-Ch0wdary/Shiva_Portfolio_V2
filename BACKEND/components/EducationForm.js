import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function EducationForm({ existingEducation }) {
  // Initialize state with default values.
  const [section, setSection] = useState("education");
  const [period, setPeriod] = useState("");
  const [institution, setInstitution] = useState("");
  const [degree, setDegree] = useState("");
  const router = useRouter();

  // When existingEducation is provided (or changes), update the state.
  useEffect(() => {
    if (existingEducation) {
      console.log("Hydrating form with:", existingEducation);
      setSection(existingEducation.section || "education");
      setPeriod(existingEducation.period || "");
      setInstitution(existingEducation.institution || "");
      setDegree(existingEducation.degree || "");
    }
  }, [existingEducation]);

  async function handleSubmit(ev) {
    ev.preventDefault();
    const data = { section, period, institution, degree };

    try {
      // Use either _id or id from the existingEducation data.
      const educationId = existingEducation?._id || existingEducation?.id;
      if (educationId) {
        // Update the existing entry.
        await axios.put("/api/education", { id: educationId, ...data });
        toast.success("Education entry updated");
      } else {
        // In edit mode, this branch should not be reached.
        await axios.post("/api/education", data);
        toast.success("Education entry added");
      }
      router.push("/education"); // Redirect back to the listing page.
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  }

  return (
    <form className="addWebsiteform" onSubmit={handleSubmit}>
      {/* Section Dropdown */}
      <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="section">Select Section</label>
        <select
          id="section"
          value={section}
          onChange={(e) => setSection(e.target.value)}
        >
          <option value="education">Education</option>
          <option value="education2">Experiences</option>
        </select>
      </div>
      
      {/* Period Field */}
      <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="period">Period</label>
        <input
          type="text"
          id="period"
          placeholder="e.g., 2020-2024"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          required
        />
      </div>
      
      {/* Institution Field */}
      <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="institution">Institution</label>
        <input
          type="text"
          id="institution"
          placeholder="e.g., IIIT Sri City"
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
          required
        />
      </div>
      
      {/* Degree Field */}
      <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="degree">Degree / Course</label>
        <input
          type="text"
          id="degree"
          placeholder="e.g., B.Tech in Computer Science"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
          required
        />
      </div>
      
      {/* Save Button */}
      <div className="w-100 mb-1">
        <button type="submit" className="w-100 addwebbtn flex-center">
          Save
        </button>
      </div>
    </form>
  );
}
