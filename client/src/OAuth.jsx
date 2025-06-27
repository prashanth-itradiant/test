import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/auth/user", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Microsoft OAuth Login</h1>
      {user ? (
        <>
          <p>✅ Logged in as {user.displayName}</p>
          <p>Email: {user.email}</p>
          <a href="http://localhost:8000/auth/logout">
            <button>Logout</button>
          </a>
        </>
      ) : (
        <a href="http://localhost:8000/auth/login">
          <button>Login with Microsoft</button>
        </a>
      )}
    </div>
  );
}

export default App;
