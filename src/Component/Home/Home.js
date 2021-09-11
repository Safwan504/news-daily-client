import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import News from '../News/News';
const Home = () => {
   
    const [newsData, setNewsData] = useState([]);
    useEffect(() => {
        fetch('https://glacial-garden-75393.herokuapp.com/news')
            .then(res => res.json())
            .then(data => setNewsData(data))
    }, []);

    return (
        <Container>
            <Row className='my-5'>
                {
                    newsData.map(news => <Col className="my-3" sm={12} md={6} lg={4} xl={3}>
                        <News news={news} key={news._id}></News>
                    </Col>)
                }
            </Row>
        </Container>
    );
};

export default Home;