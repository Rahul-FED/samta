import React, { useState, useEffect } from 'react';
import './userinfo.css';

function UserInfo() {
  const [usersData, setUsersData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  // Load search history from localStorage on page load
  useEffect(() => {
    const savedSearchHistory = localStorage.getItem('searchHistory');
    if (savedSearchHistory) {
      setSearchHistory(JSON.parse(savedSearchHistory));
    }
  }, []);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        setUsersData(data);
        setFilteredUsers(data);
      })
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const searchUser = () => {
    const searchTerm = searchInput.toLowerCase();
    const filteredUsers = usersData.filter((user) =>
      user.name.toLowerCase().includes(searchTerm)
    );

    setFilteredUsers(filteredUsers);

    if (searchTerm.trim() !== '') {
      const updatedSearchHistory = [...searchHistory, searchTerm];
      setSearchHistory(updatedSearchHistory);
      localStorage.setItem('searchHistory', JSON.stringify(updatedSearchHistory));
    }

    setSearchInput('');
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const handleSortByName = () => {
    const sortedUsers = [...filteredUsers].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setFilteredUsers(sortedUsers);
  };

  return  (
    <div className="userInfo">
      <h1>User Info</h1>
      <div className="search-container">
        <label htmlFor="searchInput">Search by Name:</label>
        <input
          type="text"
          id="searchInput"
          value={searchInput}
          onChange={handleSearchInputChange}
          className="search-input"
        />
        <button onClick={searchUser} className="search-button">
          Search
        </button>
      </div>
      <div>
        <h2>User List</h2>
        <ul className="user-list">
          {filteredUsers.map((user) => (
            <li key={user.id} className="user-item">
              {user.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Past Searches</h2>
        <button onClick={clearSearchHistory} className="clear-button">
          Clear History
        </button>
        <ul className="search-history">
          {searchHistory.map((term, index) => (
            <li key={index} className="search-history-item">
              {term}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={handleSortByName} className="sort-button">
          Sort by Name
        </button>
      </div><span>Project:- By Rahul Dixit</span>
    </div>
  );
}

export default UserInfo;