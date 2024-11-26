import React from 'react'
import "./CustomModal.css"
import { useSelector } from "react-redux"

export default function CustomModal({ id, show, setShow }) {
    const allUsers = useSelector((state) => state.app.users) // Accessing the users from the Redux store
    const data = allUsers.filter((item) => item.id === id) // Filtering the user based on the passed `id`
    
    console.log("data", data); // Debugging: logging the filtered user data to the console
    
    return (
        <>
            <div className='modalBackground'>
                <div className='modalContainer'>
                    <button onClick={() => setShow(false)}>Close</button> {/* Button to close the modal */}
                    
                    {/* Displaying user details */}
                    {data.length > 0 ? (
                        <>
                            <h2>{data[0].name}</h2>
                            <h2>{data[0].email}</h2>
                            <h2>{data[0].age}</h2>
                            <h2>{data[0].gender}</h2>
                        </>
                    ) : (
                        <h2>User not found</h2> // Displaying an error message if no data is found
                    )}
                </div>
            </div>
        </>
    )
}
