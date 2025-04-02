import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserList from "./pages/UserList";
import UserView from "./pages/UserView";
import UserEdit from "./pages/UserEdit";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-4 px-4">
            <h1 className="text-2xl font-bold text-gray-800">
              User Management System
            </h1>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserView />} />
            <Route path="/users/:id/edit" element={<UserEdit />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
