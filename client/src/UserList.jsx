import axios from "axios";
import { useEffect, useState } from "react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { FixedSizeGrid as Grid } from "react-window";

const UserCard = ({ user, style }) => (
  <div style={style} className="p-4 box-border">
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-2xl transition-all duration-300 h-full flex flex-col justify-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{user.name}</h2>
      <div className="flex items-center text-gray-700 mb-2">
        <FiMail className="mr-2 text-blue-500" />
        <span className="truncate">{user.email}</span>
      </div>
      <div className="flex items-center text-gray-700 mb-2">
        <FiPhone className="mr-2 text-green-500" />
        <span>{user.phone}</span>
      </div>
      <div className="flex items-center text-gray-500">
        <FiMapPin className="mr-2" />
        <span>City: {user.address.city}</span>
      </div>
    </div>
  </div>
);

const UserGrid = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Responsive columns count based on window width
  const getColumnCount = () => {
    if (window.innerWidth > 1200) return 4;
    if (window.innerWidth > 900) return 3;
    if (window.innerWidth > 600) return 2;
    return 1;
  };

  const [columnCount, setColumnCount] = useState(getColumnCount());

  useEffect(() => {
    const handleResize = () => {
      setColumnCount(getColumnCount());
    };
    window.addEventListener("resize", handleResize);

    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        // Repeat users to simulate big data
        const repeated = Array.from({ length: 1000 }, (_, i) => ({
          ...res.data[i % res.data.length],
          id: i + 1,
          name: `${res.data[i % res.data.length].name} #${i + 1}`,
        }));
        setUsers(repeated);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading)
    return <div className="text-center py-10 text-lg">Loading users...</div>;

  const rowCount = Math.ceil(users.length / columnCount);
  const cardWidth = Math.floor(window.innerWidth / columnCount);
  const cardHeight = 180;

  return (
    <div className="h-screen w-screen bg-gray-100 flex justify-center items-center p-4 box-border">
      <Grid
        columnCount={columnCount}
        columnWidth={cardWidth}
        height={window.innerHeight - 32} // some padding from top/bottom
        rowCount={rowCount}
        rowHeight={cardHeight}
        width={window.innerWidth - 32}
      >
        {({ columnIndex, rowIndex, style }) => {
          const index = rowIndex * columnCount + columnIndex;
          if (index >= users.length) return null;

          return (
            <UserCard key={users[index].id} user={users[index]} style={style} />
          );
        }}
      </Grid>
    </div>
  );
};

export default UserGrid;
