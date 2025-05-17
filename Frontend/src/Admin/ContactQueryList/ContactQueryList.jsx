import React, { useEffect, useState } from "react";
import "./ContactQueryList.css";
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import {useUser} from '../../components/AuthContext/AuthContext'


const ContactQueryList = () => {
  const [queries, setQueries] = useState([]);
  const { user } = useUser();
  const fetchQueries = async () => {
    try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/api/contact/unreplied`);
      const data = await res.json();
      setQueries(data);
    } catch (err) {
      console.error("Failed to fetch contact queries:", err);
    }
  };

  const handleReplyDone = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/api/contact/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ replied: true }),
      });

      if (res.ok) {
        setQueries((prev) =>
          prev.map((q) => (q._id === id ? { ...q, replied: true } : q))
        );
      } else {
        alert("Failed to update reply status");
      }
    } catch (error) {
      console.error("Error updating reply status:", error);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  
  if (user?.userRole !== 'admin') {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
        <p className="text-gray-700 mb-4">This page is not accessible by you.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

  return (
    <>
    <div className="main-contact-container">
        <AdminNavbar/>    
    <div className="contactqueries-container">
      <h2 className="contactqueries-heading">Contact Queries</h2>
      <table className="contactqueries-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Replied</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {queries.map((query) => (
            <tr key={query._id}>
              <td>{query.firstname} {query.lastname}</td>
              <td>{query.email}</td>
              <td>{query.phone}</td>
              <td>{query.subject}</td>
              <td>{query.message}</td>
              <td>{query.replied ? "✅" : "❌"}</td>
              <td>
                {!query.replied && (
                  <button
                    className="contactqueries-button"
                    onClick={() => handleReplyDone(query._id)}
                  >
                    Reply Done
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
</div>
    </>
  );
};

export default ContactQueryList;
