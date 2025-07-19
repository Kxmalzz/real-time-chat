// src/components/Sidebar.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiMoreVertical } from 'react-icons/fi'; // 3-dot icon

const Sidebar = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const currentUser = sessionStorage.getItem("username");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users");
        const filtered = res.data.filter(user => user.username !== currentUser);
        setUsers(filtered);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };

    fetchUsers();
  }, [currentUser]);

  const handleSignOut = () => {
    sessionStorage.removeItem("username");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // Filter users based on search
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ width: '250px', background: '#566573', padding: '20px' }}>
      {/* Top bar with 3-dot menu */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
        <h3>Chats</h3>
        <div style={{ position: 'relative' }}>
          <FiMoreVertical
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ cursor: 'pointer' }}
          />
          {menuOpen && (
            <div style={{
              position: 'absolute',
              top: '24px',
              right: '0',
              background: '#f0f3f4',
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              zIndex: 10,
            }}>
              <p style={{ margin: '4px 0', fontWeight: 'bold', color: 'black' }}>{currentUser}</p>
              <button
                onClick={handleSignOut}
                style={{
                  padding: '5px 10px',
                  fontSize: '12px',
                  background: '#ff4d4f',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '90%',
          padding: '8px',
          marginTop: '10px',
          marginBottom: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc'
        }}
      />

      <h3 style={{ color: 'white' }}>Users</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li
              key={user._id}
              onClick={() => onSelectUser(user)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '7px',
                marginBottom: '5px',
                cursor: 'pointer',
                borderRadius: '6px',
                fontStyle: 'normal',
                backgroundColor: '#a6acaf',
                fontSize: 16,
                color: 'whitesmoke'
              }}
            >
              <img
                src={user.avatar || '/image/p1.jpg'}
                style={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
              {user.username}
            </li>
          ))
        ) : (
          <li style={{ color: 'white' }}>No users found</li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;