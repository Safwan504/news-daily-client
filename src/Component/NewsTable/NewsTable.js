import React from 'react';
import { useHistory } from 'react-router';

const NewsTable = (props) => {
    const history = useHistory();
    const news = props.news;
    const { title, author, _id } = news;

    const handleDelete = () => {
        fetch(`https://glacial-garden-75393.herokuapp.com/deleteNews/${_id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => console.log(data))
            alert("News Deleted Successfully")
            history.replace('/home')
    }
    return (
        <tr>
            <td>{title}</td>
            <td>{author}</td>
            <td><button onClick={handleDelete} className="btn btn-danger">Delete</button></td>
        </tr>
    );
};

export default NewsTable;