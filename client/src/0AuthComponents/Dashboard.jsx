import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/user", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        {user ? (
          <>
            {user?.photos?.[0]?.value && (
              <img
                src={user.photos[0].value}
                alt="avatar"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
            )}

            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              Welcome, {user?.displayName || user?.username}
            </h1>
            <p className="text-gray-500 mb-4">
              Email: {user?.emails?.[0]?.value || "N/A"}
            </p>

            <button
              onClick={logout}
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <p className="text-gray-600">Loading user info...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
