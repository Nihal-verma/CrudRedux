import React, { useEffect, useState } from "react"; // Importing necessary React hooks
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks to interact with the store
import { searchUser } from "../features/userDetailsSlice"; // Importing the action to search users
import { Link } from "react-router-dom"; // Importing Link for navigation between pages

const Navbar = () => {
  // Accessing all users from the Redux store
  const allUsers = useSelector((state) => state.app.users);
  // Setting up dispatch function to trigger actions
  const dispatch = useDispatch();
  // Local state for handling search input value
  const [searchData, setSearchData] = useState("");

  // useEffect hook to dispatch searchUser action every time the searchData changes
  useEffect(() => {
    dispatch(searchUser(searchData)); // Dispatching search action with the search query
  }, [searchData]); // Dependency array makes sure this effect runs whenever searchData changes

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid ">
          <h4 className="navbar-brand">RTK</h4> {/* Navbar brand */}

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* Link to navigate to the "Create Post" page */}
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Create Post
                </Link>
              </li>

              {/* Link to navigate to the "All Post" page, showing the count of all users */}
              <li className="nav-item">
                <Link to="/read" className="nav-link">
                  All Post ({allUsers.length}) {/* Displaying the count of posts */}
                </Link>
              </li>
            </ul>
            {/* Search input field to filter users */}
            <input
              className="form-control me-2 w-50"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchData} // Setting the search input value to the state
              onChange={(e) => setSearchData(e.target.value)} // Updating searchData state as the user types
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
