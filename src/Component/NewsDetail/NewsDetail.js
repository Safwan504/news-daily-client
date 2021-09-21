import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';

const NewsDetail = () => {
    const { id } = useParams();
    const [newsDetails, setNewsDetails] = useState([]);
    useEffect(() => {
        fetch(`https://glacial-garden-75393.herokuapp.com/news/${id}`)
            .then(res => res.json())
            .then(data => setNewsDetails(data))
    }, [id]);
    return (
        <Container className="my-5">
            <Row>
                <Col xs={12} md={6} lg={6}>
                    <h4>{newsDetails.title}</h4>
                    <p>{newsDetails.description}</p>
                    <div className="text-muted text-end">
                    <small>Report: {newsDetails.author}</small>
                    </div>
                    
                </Col>
                <Col className="d-flex align-items-center justify-content-center" xs={12} md={6} lg={6}><img width="80%" src={newsDetails.image} alt="" /></Col>
            </Row>
        </Container>
    );
};

export default NewsDetail;