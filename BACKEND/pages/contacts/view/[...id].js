// pages/contacts/view/[id].jsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IoIosContacts } from "react-icons/io";

export default function Contactview() {
  const router = useRouter();
  const { id } = router.query;
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const response = await fetch(`/api/contacts/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched Contact Data:', data); // Debugging
        setContact(data);
      } catch (err) {
        console.error('Failed to fetch contact:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);


  if (loading) return <div>Loading contact...</div>;
  if (!contact) return <div>Contact not found.</div>;

  return (

    <div className="addexperiencespage">
      <div className="titledashboard flex flex-sb">
        <div>
          <h2> ALL <span> Contacts</span></h2>
          <h3>Admin Panel</h3>
        </div>
        <div className="breadcrumb">
          <IoIosContacts /> <span>/</span> <span>All Contacts</span>
        </div>
      </div>

      <div className="contactinfo">
        <h2 className="contactinfo-header">Contact Details</h2>
        <div className="flex flex-col">
          <h2>Name:  <span> {contact.name} {contact.lname}</span></h2>
          <h2>Email:  <span>{contact.email}</span> </h2>
          <h2>Company:  <span>{contact.company && contact.company.join(', ')}</span> </h2>
          <h2>Phone:  <span>{contact.phone}</span> </h2>
          <h2>Country:  <span>{contact.country}</span> </h2>
          <h2>Price:  <span>{contact.price}</span> </h2>
          <h2>Description:  <span>{contact.description}</span> </h2>
          <h2>Projects:  <span>{Array.isArray(contact.project) ? contact.project.join(', ') : contact.project}</span> </h2>
          <h2>Contact time:  <span>{new Date(contact.createdAt).toLocaleString()}</span></h2>
        </div>
      </div>
    </div>

  );
}
