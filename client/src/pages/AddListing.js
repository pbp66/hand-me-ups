import { storage } from '../../src/utils/firebase'
import slugify from "slugify"
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { useState, useMutation } from 'react'
import { isMobile } from 'react-device-detect'
import { ADD_LISTING } from '../utils/mutations';

function AddListing() {

    const [listing, setListing] = useState({
        title: "",
        image: "",
        description: "",
        price: 0,
        category: "",
        size: "",
        tags: [],
        colors: [],
        condition: "",
    })
    const [errorMessage, setErrorMessage] = useState("")
    const [disabled, setDisabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const [newTag, setNewTag] = useState("")
    const [newColor, setNewColor] = useState("")
    const [files, setFiles] = useState(null)


    const handleInputs = e => {
        const {value, name} = e.target

        if (!value.length) {
            setErrorMessage(`${name} is required`)
            setDisabled(true)
        } else {
            setDisabled(false)
            setErrorMessage("")
        }
        const updatedFormState = {
            ...listing,
            [name]: value
        }
        setListing(updatedFormState)


    }

    const handleFileInput = (e) => {
        console.log(e)
        setFiles(e.target.files)

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let imageUrl = ""

        
        for (const file of files) {
            const imagesRef = ref(storage, `images/${file.name}`)
            const snapshot = await uploadBytes(imagesRef, file)
            imageUrl = await getDownloadURL(snapshot.ref)
        }
        if (imageUrl === "") {
            setDisabled(true)

        } else {
            setDisabled(false)
        }
        const updatedFormState = {
            ...listing,
            image: imageUrl
        }
        await setListing(updatedFormState)

        //   try {
        //     const { data } = await addListing({
        //       variables: { ...listing }
        //     })
        //   } catch (err) {
        //     console.log(error)
        //   }
        // }

    }
    return (
        <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
            <div className='container'>

                {/* TITLE */}
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label"><h5>Title</h5></label>
                    <input
                        name="title"
                        type="text"
                        className="form-control" id="exampleFormControlInput1"
                        placeholder="What is this Hand me up?"
                        onChange={handleInputs}
                        value={listing.title} />
                </div>

                {/* DESCRIPTION */}
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label"><h5>Description</h5></label>
                    <textarea
                        name="description"
                        className="form-control" id="exampleFormControlTextarea1"
                        rows="2"
                        placeholder="Write a short description of the Hand-me-up"
                        onChange={handleInputs}
                        value={listing.description}></textarea>
                </div>

                {/* PRICE */}
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">$</span>
                    </div>
                    <input
                        name="price"
                        type="number"
                        className="form-control"
                        aria-label="Amount (to the nearest dollar)" placeholder="Asking Price"
                        onChange={handleInputs}
                        value={listing.price} />
                </div>

                {/* CATEGORIES */}
                <div className="mb-3">
                    <h5>Category</h5>
                    <select
                        name="category"
                        className="form-select"
                        aria-label="Default select example"
                        onChange={handleInputs}
                        value={listing.category}>
                        <option selected value> -- select an option -- </option>
                        <option>Shirt</option>
                        <option>Hat</option>
                        <option>JNCOS</option>
                    </select>
                </div>

                {/* SIZE */}
                <div className="mb-3">
                    <h5>Size</h5>
                    <select
                        name="size"
                        className="form-select"
                        aria-label="Default select example"
                        onChange={handleInputs}
                        value={listing.size}>
                        <option selected value> -- select an option -- </option>
                        <option>XXXL</option>
                        <option>XXL</option>
                        <option>XL</option>
                        <option>L</option>
                        <option>M</option>
                        <option>S</option>
                        <option>XS</option>
                    </select>
                </div>

                {/* CONDITION */}
                <div className="mb-3">
                    <h5>Condition</h5>
                    <select
                        name="condition"
                        className="form-select"
                        aria-label="Condition Drop-Down"
                        onChange={handleInputs}
                        value={listing.condition}>
                        <option selected value> -- select an option -- </option>
                        <option>NEW</option>
                        <option>USED - LIKE NEW</option>
                        <option>USED - GOOD</option>
                        <option>USED - FAIR</option>
                        <option>USED - POOR</option>
                    </select>
                </div>
                {/* COLORS */}
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label"><h5>Colors</h5></label>
                    <input
                        className="form-control" id="exampleFormControlTextarea1"
                        rows="1"
                        placeholder="colors"
                        value={newColor}
                        onChange={(e) => setNewColor(e.target.value)}
                    />
                    <br />
                    <center>
                        <button
                            className="btn btn-success"
                            type="button"
                            onClick={() => {
                                setListing({
                                    ...listing,
                                    colors: [...listing.colors, slugify(newColor, { lower: true })]
                                })
                                setNewColor("")
                            }
                            }
                        >
                            Add Color
                        </button>
                    </center>
                </div>
                <div className="mb-3">
                    <ul>
                        {listing.colors.map(tag => {
                            return <li
                                onClick={() => {
                                    setListing({
                                        ...listing,
                                        colors: listing.colors.filter(t => t !== tag)
                                    })
                                }}
                                key={tag}>
                                {tag}
                            </li>
                        })}
                    </ul>
                </div>
                {/* TAGS */}
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label"><h5>Tags</h5></label>
                    <input
                        className="form-control" id="exampleFormControlTextarea1"
                        rows="1"
                        placeholder="Tags"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                    />
                    <br />
                    <center>
                        <button
                            className="btn btn-success"
                            type="button"
                            onClick={() => {
                                setListing({
                                    ...listing,
                                    tags: [...listing.tags, slugify(newTag, { lower: true })]
                                })
                                setNewTag("")
                            }
                            }
                        >
                            Add tag
                        </button>
                    </center>
                </div>
                <div className="mb-3">
                    <ul>
                        {listing.tags.map(tag => {
                            return <li
                                onClick={() => {
                                    setListing({
                                        ...listing,
                                        tags: listing.tags.filter(t => t !== tag)
                                    })
                                }}
                                key={tag}>
                                {tag}
                            </li>
                        })}
                    </ul>
                </div>

                {/* detect if mobile to use camera or file upload */}
                {!isMobile
                    ?
                    <input
                        type="file"
                        accept="image/*"
                        capture='camera'
                        onChange={handleFileInput}
                    />
                    :
                    <div className="mb-3">
                        <label htmlFor="file" className="form-label">
                            <h5>Upload Image</h5>
                        </label>
                        <center>
                            <input
                                onChange={handleFileInput}
                                type="file"
                                id="file"
                                name="file"
                                multiple />
                        </center>
                    </div>
                }



                <div>
                    <br />
                    <center>
                        {disabled
                            ?
                            <center>
                                <h2>{errorMessage}</h2>
                            </center>
                            :
                            <button className="btn btn-success">Submit new Hand Me Up</button>}

                    </center>
                </div>
                <br />

            </div>

        </form>

    );
}


export default AddListing