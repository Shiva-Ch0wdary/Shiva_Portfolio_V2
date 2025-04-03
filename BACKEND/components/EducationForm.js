import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EducationForm({ existingEducation }) {
  // Initialize state with default values.
  const [section, setSection] = useState("education");
  const [period, setPeriod] = useState("");
  const [institution, setInstitution] = useState("");
  const [degree, setDegree] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const router = useRouter();

  // When existingEducation is provided (or changes), update the state.
  useEffect(() => {
    if (existingEducation) {
      console.log("Hydrating form with:", existingEducation);
      setSection(existingEducation.section || "education");
      setPeriod(existingEducation.period || "");
      setInstitution(existingEducation.institution || "");
      setDegree(existingEducation.degree || "");

      const [startRaw, endRaw] =
        existingEducation.period?.split("-").map((p) => p.trim()) || [];

      if (startRaw) setStartDate(new Date(startRaw));
      if (endRaw) setEndDate(new Date(endRaw));
    }
  }, [existingEducation]);

  async function handleSubmit(ev) {
    ev.preventDefault();

    const formattedPeriod = `${startDate?.toISOString().split("T")[0]} - ${
      endDate?.toISOString().split("T")[0]
    }`;
    const data = {
      section,
      period: formattedPeriod,
      institution,
      degree,
    };

    try {
      const educationId = existingEducation?._id || existingEducation?.id;
      if (educationId) {
        await axios.put("/api/education", { id: educationId, ...data });
        toast.success("Education entry updated");
      } else {
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
          <option value="experience">Experiences</option>
        </select>
      </div>

      {/* Start Date Picker */}
      <div className="w-100 flex flex-col flex-left mb-2">
        <label>Start Date</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select start date"
          required
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
      </div>

      {/* End Date Picker */}
      <div className="w-100 flex flex-col flex-left mb-2">
        <label>End Date</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select end date"
          required
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
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
