import { Card, Container, Row, Col } from 'react-bootstrap'
import auth from '../../utils/auth'




const Listing = (props) => {


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
        <Card>
            <Card.Body>
                <Card.Header>{title}</Card.Header>
                <Card.Img src={image}></Card.Img>
                <Card.Text></Card.Text>
                <Card.Footer>{condition}${price}</Card.Footer>
            </Card.Body>
        </Card>
    )
}

export default Listing
