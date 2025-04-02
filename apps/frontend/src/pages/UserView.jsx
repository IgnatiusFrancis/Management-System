import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getUser, deleteUser } from "../services/api";

const UserView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await getUser(id);
        setUser(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch user details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        navigate("/users");
      } catch (err) {
        setError("Failed to delete user");
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <div className="user-view-container text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading user details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-view-container">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
        <div className="mt-4">
          <Link to="/users" className="text-blue-600 hover:text-blue-800">
            &larr; Back to users
          </Link>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-view-container">
        <div className="text-center py-8">
          <p className="text-gray-600">User not found</p>
        </div>
        <div className="mt-4">
          <Link to="/users" className="text-blue-600 hover:text-blue-800">
            &larr; Back to users
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="user-view-container">
      <div className="mb-6">
        <Link to="/users" className="text-blue-600 hover:text-blue-800">
          &larr; Back to users
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">User Details</h1>
          <div className="flex space-x-2">
            <Link
              to={`/users/${id}/edit`}
              className="px-4 py-2 bg-blue-600 text-white! rounded-md hover:bg-blue-700"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-sm font-medium text-gray-500">ID</h2>
            <p className="mt-1 text-lg text-gray-900">{user._id}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Name</h2>
            <p className="mt-1 text-lg text-gray-900">{user.name}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Email</h2>
            <p className="mt-1 text-lg text-gray-900">{user.email}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Role</h2>
            <p className="mt-1 text-lg text-gray-900">{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserView;
