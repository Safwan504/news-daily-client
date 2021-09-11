import React, { useState } from 'react';
import { useLocation } from 'react-router';

const AdminBar = () => {
    const location = useLocation();
    const [addAdmin, setAddAdmin] = useState({})
    const handleBlur = (e) => {
        const addedAdmin = addAdmin;
        addedAdmin[e.target.name] = e.target.value;
        setAddAdmin(addedAdmin);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('https://glacial-garden-75393.herokuapp.com/addAdmin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(addAdmin)
        })
            .then(res => res.json())
            .then(data => {
                alert('New Admin added successfully');
                window.location.reload(true);
            })
    }
    return (
        <div>
            <h3 className="mt-5">Add New Admin By Email</h3>
            <form className="mt-2" onSubmit={handleSubmit}>
                <input onBlur={handleBlur} type="text" name="email" placeholder="New Admin Email" /> <br />
                <input className="mt-2" type="submit" value="Add New Admin" />
            </form>
        </div>

    );
};

export default AdminBar;