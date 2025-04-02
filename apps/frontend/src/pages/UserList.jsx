import { useState, useEffect, useCallback } from "react";
import { getUsers, deleteUser, addUser } from "../services/api";
import SearchBar from "../components/SearchBar";
import UserTable from "../components/UserTable";
import Pagination from "../components/Pagination";
import AddUserModal from "../components/AddUserModal";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Using useCallback to prevent unnecessary re-creation of this function
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getUsers(currentPage, limit, searchTerm);

      // More robust handling of API response
      if (data && Array.isArray(data.users)) {
        setUsers(data.users);
        setTotalPages(
          Math.max(1, data.totalPages || Math.ceil(data.total / limit) || 1)
        );
      } else {
        setUsers([]);
        setTotalPages(1);
        setError("Invalid data format received from server");
      }
    } catch (err) {
      setUsers([]);
      setError(err?.message || "Failed to fetch users");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit, searchTerm]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page !== currentPage && page > 0 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;

    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        setError(null);
        await deleteUser(id);

        // If we're on a page that would be empty after deletion, go to previous page
        const isLastItemOnPage = users.length === 1 && currentPage > 1;
        if (isLastItemOnPage) {
          setCurrentPage((prev) => prev - 1);
        } else {
          fetchUsers();
        }
      } catch (err) {
        setError(err?.message || "Failed to delete user");
        console.error("Error deleting user:", err);
      }
    }
  };

  const handleAddUser = async (userData) => {
    if (!userData) return false;

    try {
      setError(null);
      await addUser(userData);
      setIsModalOpen(false);

      // If adding to first page or on first page, refresh the list
      if (currentPage === 1) {
        fetchUsers();
      } else {
        // Otherwise go to first page to see the new user
        setCurrentPage(1);
      }
      return true;
    } catch (err) {
      const errorMessage =
        err?.response?.data?.error?.message ||
        err?.message ||
        "Failed to add user";
      setError(errorMessage);
      console.error("Error adding user:", err);
      return false;
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Clear error when closing modal
    if (error && error.includes("add")) {
      setError(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          Add User
        </button>
      </div>

      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading users...</p>
        </div>
      ) : error ? (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">
            {searchTerm
              ? `No users found matching "${searchTerm}"`
              : "No users found"}
          </p>
        </div>
      ) : (
        <>
          <UserTable users={users} onDelete={handleDelete} />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      <AddUserModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAddUser={handleAddUser}
        error={error}
      />
    </div>
  );
};

export default UserList;
