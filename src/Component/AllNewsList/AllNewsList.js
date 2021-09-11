import React, { useEffect, useState } from 'react';
import NewsTable from '../NewsTable/NewsTable';

const AllNewsList = () => {
    const [newsData, setNewsData] = useState([]);
    useEffect (() => {
        fetch('https://glacial-garden-75393.herokuapp.com/news')
        .then(res => res.json())
        .then(data => setNewsData(data))
    }, [])


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                </div>
                <div className="col-md-8">
                    <table className="table caption-top table-hover mt-5">
                        <caption className="text-center py-3 mt-5" style={{backgroundColor: 'grey'}}><h3>All News List</h3></caption>
                        <thead>
                            <tr>
                                <th>News Title</th>
                                <th>Author</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                newsData.map(news => <NewsTable news={news} kewy={news._id}></NewsTable>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
};

export default AllNewsList;