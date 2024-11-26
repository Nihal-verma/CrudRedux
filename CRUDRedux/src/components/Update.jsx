import React, { useState, useRef, useEffect } from 'react'; // Importing necessary React hooks
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks to interact with the store
import { useNavigate, useParams } from "react-router-dom"; // Importing React Router hooks for navigation and accessing URL params
import { updateUser } from '../features/userDetailsSlice'; // Importing the action to update user data

function Update() {
    const dispatch = useDispatch(); // Dispatch function to trigger actions
    const formRef = useRef(); // Reference for the form, although it's not used here
    const navigate = useNavigate(); // Navigate function to programmatically navigate to other pages
    const { id } = useParams(); // Extracting the 'id' from the URL parameter

    // Select only necessary slices of state (users and loading status)
    const allUsers = useSelector((state) => state.app.users);
    const loading = useSelector((state) => state.app.loading);

    // Initialize state to hold updated data for the form
    const [updatedData, setUpdatedData] = useState({
        name: '',
        email: '',
        age: '',
        gender: '',
    });

    // Populate form with data for the specific user by ID when the component mounts or the ID changes
    useEffect(() => {
        if (id && allUsers.length > 0) {
            const data = allUsers.find((item) => item.id === id); // Find the user by id
            if (data) {
                setUpdatedData(data); // Set the found user data in the state
            }
        }
    }, [id, allUsers]); // Run this effect when the id or allUsers changes

    // Handle changes in form input fields (name, email, age, gender)
    const handleInputChange = (e) => {
        setUpdatedData({ ...updatedData, [e.target.name]: e.target.value }); // Update the state with the changed field value
    };

    // Handle form submission to dispatch the update action and navigate to the "read" page
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        dispatch(updateUser(updatedData)); // Dispatch the action to update the user
        navigate("/read"); // Navigate to the "read" page to see the updated data
    };

    return (
        <form className="w-50 mx-auto my-5" onSubmit={handleSubmit}>
            <h2>Edit the data</h2> {/* Heading for the form */}

            {/* Input field for the user's name */}
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    onChange={handleInputChange} // Handling input change
                    value={updatedData.name || ''} // Display current name value or empty string if not set
                />
            </div>

            {/* Input field for the user's email */}
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    onChange={handleInputChange} // Handling input change
                    value={updatedData.email || ''} // Display current email value or empty string if not set
                />
            </div>

            {/* Input field for the user's age */}
            <div className="mb-3">
                <label htmlFor="age" className="form-label">Age</label>
                <input
                    type="number"
                    name="age"
                    className="form-control"
                    id="age"
                    onChange={handleInputChange} // Handling input change
                    value={updatedData.age || ''} // Display current age value or empty string if not set
                />
            </div>

            {/* Radio buttons for gender selection */}
            <div className="mb-3">
                <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="genderFemale"
                    value="Female"
                    onChange={handleInputChange} // Handling gender selection change
                    checked={updatedData.gender === "Female"} // Check if the selected gender is "Female"
                />
                <label className="form-check-label" htmlFor="genderFemale">Female</label>
            </div>

            <div className="mb-3">
                <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="genderMale"
                    value="Male"
                    onChange={handleInputChange} // Handling gender selection change
                    checked={updatedData.gender === "Male"} // Check if the selected gender is "Male"
                />
                <label className="form-check-label" htmlFor="genderMale">Male</label>
            </div>

            {/* Submit button to submit the form */}
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

export default Update;
