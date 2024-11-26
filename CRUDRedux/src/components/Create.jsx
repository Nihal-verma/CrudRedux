// Import necessary dependencies
import React, { useState, useRef } from 'react'; // React hooks for state management and DOM references
import { useDispatch } from "react-redux"; // Hook to dispatch actions to the Redux store
import { useNavigate } from "react-router-dom"; // Hook for programmatic navigation
import { createUser } from '../features/userDetailsSlice'; // Redux action for creating a user

// Define the Create component
export default function Create() {
    // Create a reference for the form element
    const formRef = useRef();

    // Hook to navigate to another route programmatically
    const navigate = useNavigate();

    // State to store form data
    const [users, setUsers] = useState({});

    // Hook to dispatch Redux actions
    const dispatch = useDispatch();

    // Handler to update state when input fields change
    const getUserData = (e) => {
        setUsers({
            ...users, // Keep the existing values in the state
            [e.target.name]: e.target.value // Update the specific field based on the `name` attribute
        });
        // Example: If the input field has name="name" and value="John", state becomes { name: "John" }
    };

    // Handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        console.log("users>>>", users); // Log the collected user data
        dispatch(createUser(users)); // Dispatch the createUser action with form data
        navigate("/read"); // Navigate to the "read" page after submission
        formRef.current.reset(); // Reset the form fields using the form reference
    };

    // Render the form
    return (
        <>
            {/* Form for creating a new user */}
            <form ref={formRef} className='w-50 mx-auto my-5' onSubmit={handleSubmit}>
                {/* Name input */}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        onChange={getUserData} // Call getUserData when input changes
                    />
                </div>

                {/* Email input */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="email"
                        onChange={getUserData}
                    />
                </div>

                {/* Age input */}
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input
                        type="number"
                        name="age"
                        className="form-control"
                        id="age"
                        onChange={getUserData}
                    />
                </div>

                {/* Gender radio buttons */}
                <div className="mb-3">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        value="Female"
                        id="flexRadioDefault1"
                        onChange={getUserData}
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                        Female
                    </label>
                </div>
                <div className="mb-3">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        value="Male"
                        id="flexRadioDefault2"
                        onChange={getUserData}
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                        Male
                    </label>
                </div>

                {/* Submit button */}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
}
