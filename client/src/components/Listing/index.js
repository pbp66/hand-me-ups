import { Card, Container, Row, Col } from 'react-bootstrap'
import auth from '../../utils/auth'




const Listing = (props) => {
    const columnsPerRow = 4;

    const {
        title,
        image,
        description,
        price,
        size,
        color,
        condition,
        tags,
        listing_date,
        category,
        seller
    } = props.listing

    const currentUser = auth.getProfile()



    return (
        
            <Col md="auto">
                <Container>
                    <Card>
                        <Card.Body>
                            <Card.Title>{title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{category}</Card.Subtitle>
                            <Card.Text>
                                {description}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Container>
            </Col>
        






    )
}

export default Listing
