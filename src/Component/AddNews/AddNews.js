import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../../App';
import AdminBar from '../AdminBar/AdminBar';
import AllNewsList from '../AllNewsList/AllNewsList';

const AddNews = () => {
    const [isAdmin, setIsAdmin] = useState({ isAdmin: false });
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    // const localUser = JSON.parse(localStorage.getItem('user')) || {};

    useEffect(() => {
        fetch(`https://glacial-garden-75393.herokuapp.com/isAdmin/?email=${loggedInUser.email}`)
            .then(res => res.json())
            .then(data => setIsAdmin(data))
            .catch((err) => console.log(err))
    }, [])


    const history = useHistory();
    const [newNews, setNewNews] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('https://glacial-garden-75393.herokuapp.com/addnews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newNews)
        })
            .then(res => res.json())
            .then(data => {
                alert('News added successfully');
                history.replace('/')
            })
    }

    const handleOnBlur = (e) => {
        const addedNews = newNews;
        addedNews[e.target.name] = e.target.value;
        setNewNews(addedNews);
    }

    return (
        <div className="container">
            {isAdmin.isAdmin ? <div className="row">
                <div className="col-md-4">
                    <AdminBar></AdminBar>
                </div>
                <div className="col-md-8 mt-5">
                    <h3 className="text-secondary">Add New News</h3>
                    <form onSubmit={handleSubmit}>
                        <input className="form-control" onBlur={handleOnBlur} type="text" name="title" placeholder="News Title" required /><br />
                        <input className="form-control" onBlur={handleOnBlur} type="text" name="image" placeholder="Image URL" required /><br />
                        <input className="form-control" onBlur={handleOnBlur} type="text" name="description" placeholder="Description" required /><br />
                        <input className="form-control" onBlur={handleOnBlur} type="text" name="category" placeholder="Category" required /><br />
                        <input className="form-control" onBlur={handleOnBlur} type="text" name="author" placeholder="Author Name" required /><br />
                        <button className="btn btn-success">Add News To Home Page</button>
                    </form>
                </div>
                <AllNewsList></AllNewsList>
            </div> :
            <h3 className="text-danger text-center mt-5">You are not an Admin. Access permission denied.</h3>}
        </div>
    );
};

export default AddNews;