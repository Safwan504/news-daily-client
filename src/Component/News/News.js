import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const News = (props) => {
    const { _id, image, title } = props.news;
    return (
        <Card className="h-100 shadow p-3">

            <Card.Img variant="top" src={image} />
            <Card.Body className="d-flex flex-column">
                <Card.Title as='h6'>{title}</Card.Title>
                <Link className="mt-auto" to={`/news/${_id}`}>
                    <Button variant="primary">Read more  <i class="fas fa-angle-double-right"></i></Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default News;