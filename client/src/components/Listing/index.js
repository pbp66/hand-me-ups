import { Card } from 'react-bootstrap'


const Listing = ({ listing }) => {


    return (
        <Card>
            <Card.Body>
                <Card.Title>{listing.title}</Card.Title>
                <Card.Img>{listing.image}</Card.Img>
                <Card.Text>
                    <div>Description: {listing.description}</div>
                    <div>${listing.price}</div>
                    <div>Size{listing.size}</div>
                    <div>Colors: {listing.color}</div>
                    <div>Condition: {listing.condition}</div>
                    <div>Tags: {listing.tags}</div>
                    <div>Listed on: {listing.listing_date}</div>
                    <div>Categories: {listing.categories}</div>
                    <div>Seller: {listing.seller}</div>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Listing