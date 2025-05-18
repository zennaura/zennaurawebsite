import React, { useEffect, useState } from "react";
import "./ContactQueryList.css";
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import { useUser } from '../../components/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaTimes, FaReply, FaSpinner } from 'react-icons/fa';

const ContactQueryList = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [replyingId, setReplyingId] = useState(null);
  const { user } = useUser();
  const navigate = useNavigate();

  const fetchQueries = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/api/contact/unreplied`);
      if (!res.ok) throw new Error('Failed to fetch queries');
      const data = await res.json();
      setQueries(data);
      setError('');
    } catch (err) {
      setError("Failed to fetch contact queries");
      console.error("Failed to fetch contact queries:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReplyDone = async (id) => {
    try {
      setReplyingId(id);
      const res = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/api/contact/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ replied: true }),
      });

      if (!res.ok) throw new Error('Failed to update reply status');
      
      setQueries((prev) =>
        prev.map((q) => (q._id === id ? { ...q, replied: true } : q))
      );
    } catch (error) {
      setError("Error updating reply status");
      console.error("Error updating reply status:", error);
    } finally {
      setReplyingId(null);
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

  if (loading) {
    return (
      <div className="main-contact-container">
        <AdminNavbar />
        <div className="contactqueries-container">
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-4xl text-blue-500" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-contact-container">
      <AdminNavbar />
      <div className="contactqueries-container">
        <h2 className="contactqueries-heading">Contact Queries</h2>
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p>{error}</p>
          </div>
        )}

        {queries.length === 0 ? (
          <div className="text-center py-10">
            <h3 className="text-lg font-medium text-gray-700 mb-2">No queries found</h3>
            <p className="text-gray-500">All customer queries have been replied to.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="contactqueries-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {queries.map((query) => (
                  <tr key={query._id} className="hover:bg-gray-50">
                    <td>{query.firstname} {query.lastname}</td>
                    <td>
                      <a href={`mailto:${query.email}`} className="text-blue-600 hover:underline">
                        {query.email}
                      </a>
                    </td>
                    <td>{query.phone || 'N/A'}</td>
                    <td>{query.subject}</td>
                    <td className="max-w-xs truncate">{query.message}</td>
                    <td>
                      {query.replied ? (
                        <span className="text-green-600 flex items-center">
                          <FaCheck className="mr-1" /> Replied
                        </span>
                      ) : (
                        <span className="text-red-600 flex items-center">
                          <FaTimes className="mr-1" /> Pending
                        </span>
                      )}
                    </td>
                    <td>
                      {!query.replied && (
                        <button
                          className={`contactqueries-button flex items-center ${replyingId === query._id ? 'opacity-50' : ''}`}
                          onClick={() => handleReplyDone(query._id)}
                          disabled={replyingId === query._id}
                        >
                          {replyingId === query._id ? (
                            <FaSpinner className="animate-spin mr-2" />
                          ) : (
                            <FaReply className="mr-2" />
                          )}
                          Mark as Replied
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactQueryList;