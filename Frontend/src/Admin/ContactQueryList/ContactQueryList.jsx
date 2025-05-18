import React, { useEffect, useState } from "react";
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import { useUser } from '../../components/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaTimes, FaReply } from 'react-icons/fa';

const ContactQueryList = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useUser();
  const navigate = useNavigate();

  const fetchQueries = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/api/contact/unreplied`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      setQueries(data);
    } catch (err) {
      setError("Failed to fetch contact queries");
      console.error("Failed to fetch contact queries:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReplyDone = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/api/contact/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ replied: true }),
      });

      if (res.ok) {
        setQueries((prev) =>
          prev.map((q) => (q._id === id ? { ...q, replied: true } : q))
        );
      } else {
        setError("Failed to update reply status");
      }
    } catch (error) {
      setError("Error updating reply status");
      console.error("Error updating reply status:", error);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  if (user?.userRole !== 'admin') {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-700 mb-6">This page is not accessible by you.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <div className="w-64 bg-gray-800 text-white">
          <AdminNavbar />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Admin Navbar */}
      <div className="w-64 bg-gray-800 text-white">
        <AdminNavbar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-center">
            <h2 className="text-2xl font-bold text-white">Contact Queries</h2>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded m-4">
              {error}
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto p-4">
            {queries.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No unanswered contact queries found.
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {queries.map((query) => (
                    <tr key={query._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {query.firstname} {query.lastname}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{query.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{query.phone || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{query.subject}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500 max-w-xs truncate">{query.message}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {query.replied ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            <FaCheck className="mr-1" /> Replied
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            <FaTimes className="mr-1" /> Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {!query.replied && (
                          <button
                            onClick={() => handleReplyDone(query._id)}
                            className="flex items-center text-indigo-600 hover:text-indigo-900"
                          >
                            <FaReply className="mr-1" /> Mark as Replied
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactQueryList;