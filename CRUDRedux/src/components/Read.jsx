import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { showUser, deleteUser } from '../features/userDetailsSlice';
import CustomModal from './CustomModal';
import { Link } from "react-router-dom";

export default function Read() {
    // Initialize necessary hooks
    const dispatch = useDispatch();
    const { users, loading, searchData } = useSelector((state) => state.app); // Retrieve users, loading status, and search data from the Redux store
    const [id, setId] = useState(); // State to store the selected user's ID
    const [radioData, setRadioData] = useState(""); // State to store the selected gender filter
    const [show, setShow] = useState(false); // State to control the visibility of the modal

    // Fetch users from the Redux store when the component mounts
    useEffect(() => {
        dispatch(showUser()); // Dispatch the action to fetch users
    }, []);

    // Handle loading state
    if (loading) {
        return <h2>Loading</h2>; // Display a loading message when data is being fetched
    }

    // Function to handle deleting a user
    const handleDelete = (id) => {
        dispatch(deleteUser(id)); // Dispatch the action to delete a user
    }

    return (
        <>
            {/* Render modal if it should be displayed */}
            {show && <CustomModal id={id} show={show} setShow={setShow} />}
            
            {/* Display data or a "No data" message based on whether there are users */}
            {users.length > 0 ? (<h2>All Data</h2>) : (<h2>No data</h2>)}
            
            {/* Filter options */}
            <div className="filter-options">
                {/* "All" filter */}
                <input
                    type="radio"
                    name="gender"
                    checked={radioData === ""}
                    onChange={() => setRadioData("")}
                    className='form-check-input'
                />
                <label className='form-check-label'>All</label>
                
                {/* "Male" filter */}
                <input
                    type="radio"
                    name="gender"
                    checked={radioData === "Male"}
                    onChange={() => setRadioData("Male")}
                    value="Male"
                    className='form-check-input'
                />
                <label className='form-check-label'>Male</label>
                
                {/* "Female" filter */}
                <input
                    type="radio"
                    name="gender"
                    checked={radioData === "Female"}
                    value="Female"
                    onChange={() => setRadioData("Female")}
                    className='form-check-input'
                />
                <label className='form-check-label'>Female</label>
            </div>

            {/* Filtered and displayed user data */}
            {users && users
                .filter((item) => {
                    if (searchData.length === 0) {
                        return item; // Display all items when there's no search data
                    } else {
                        return item.name.toLowerCase().includes(searchData.toLowerCase()); // Filter based on search data
                    }
                })
                .filter((item) => {
                    if (radioData === "Male") {
                        return item.gender === radioData; // Filter by "Male"
                    } else if (radioData === "Female") {
                        return item.gender === radioData; // Filter by "Female"
                    } else {
                        return item; // Display all when no gender filter is selected
                    }
                })
                .map((item) => (
                    <div key={item.id} className="card w-50 mx-auto mb-2">
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <h6 className="card-subtitle mb-2 text-body-secondary">{item.email}</h6>
                            <p className="card-text">{item.gender}</p>
                            {/* View, Edit, and Delete buttons */}
                            <button
                                href="#"
                                onClick={() => [setId(item.id), setShow(true)]} // Set ID and show modal
                                className="card-link"
                            >
                                View
                            </button>
                            <Link to={`/edit/${item.id}`} className="card-link">Edit</Link>
                            <Link href="#" onClick={() => handleDelete(item.id)} className="card-link">Delete</Link>
                        </div>
                    </div>
                ))
            }
        </>
    );
}
