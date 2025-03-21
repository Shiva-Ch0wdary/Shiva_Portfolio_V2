import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function ServiceForm({ existingService }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (existingService) {
      setTitle(existingService.title);
      setDescription(existingService.description);
    }
  }, [existingService]);

  async function handleSubmit(ev) {
    ev.preventDefault();
    const data = { title, description };

    try {
      if (existingService && existingService._id) {
        // Update existing service
        await axios.put("/api/services", { id: existingService._id, ...data });
        toast.success("Service updated successfully");
      } else {
        // Add new service
        await axios.post("/api/services", data);
        toast.success("Service added successfully");
      }
      router.push("/services");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  }

  return (
    <form className="addWebsiteform" onSubmit={handleSubmit}>
      <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="title">Service Title</label>
        <input
          type="text"
          id="title"
          placeholder="e.g., Web Development"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="description">Service Description</label>
        <textarea
          id="description"
          placeholder="e.g., High-quality web development services..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="w-100 mb-1">
        <button type="submit" className="w-100 addwebbtn flex-center">
          Save
        </button>
      </div>
    </form>
  );
}
