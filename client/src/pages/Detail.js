import { useParams } from "react-router-dom"
import { QUERY_ONE_LISTING } from "../utils/queries"
import { useQuery } from "@apollo/client"
import Listing from "../components/Listing"

const Detail = () => {
    let { id } = useParams()

    const { data, loading, error } = useQuery(QUERY_ONE_LISTING, { variables: { listingId: id } });
    const oneListing = data?.oneListing || {}

    return (
        <>
            <h1>{oneListing.title}</h1>
            <Listing
                listing={oneListing}
            >
            </Listing>
        </>
    )
}

export default Detail