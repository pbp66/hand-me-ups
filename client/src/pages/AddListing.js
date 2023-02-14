import { storage } from '../../src/utils/firebase'
import slugify from "slugify"
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { useState, useMutation } from 'react'
import { isMobile } from 'react-device-detect'

function AddListing() {

    const [formState, setFormState] = useState({
        title: "",
        image: "",
        description: "",
        price: 0,
        category: "",
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
        let value = e.target.value
        let field = e.target.name

        if (!value.length) {
            setErrorMessage(`${field} is required`)
            setDisabled(true)
        } else {
            setDisabled(false)
            setErrorMessage("")
        }
        const updatedFormState = {
            ...formState,
            [field]: value
        }
        setFormState(updatedFormState)
        console.log(formState)
    }

    const handleFileInput = (e) => {
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
        console.log(imageUrl)






        //   try {
        //     const { data } = await addListing({
        //       variables: { ...formState }
        //     })
        //   } catch (err) {
        //     console.log(error)
        //   }
        // }
        console.log(formState)
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
                        value={formState.title} />
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
                        value={formState.description}></textarea>
                </div>

                {/* PRICE */}
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">$</span>
                    </div>
                    <input
                        name="price"
                        type="text"
                        className="form-control"
                        aria-label="Amount (to the nearest dollar)" placeholder="Asking Price"
                        onChange={handleInputs}
                        value={formState.price} />
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
                                setFormState({
                                    ...formState,
                                    tags: [...formState.tags, slugify(newTag, { lower: true })]
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
                        {formState.tags.map(tag => {
                            return <li
                                onClick={() => {
                                    setFormState({
                                        ...formState,
                                        tags: formState.tags.filter(t => t !== tag)
                                    })
                                }}
                                key={tag}>
                                {tag}
                            </li>
                        })}
                    </ul>
                </div>

                {/* CATEGORIES */}
                <div className="mb-3">
                    <select
                        name="category"
                        className="form-select"
                        aria-label="Default select example"
                        onChange={handleInputs}
                        value={formState.category}>
                        <option selected>Product Category</option>
                        <option value="1">Shirt</option>
                        <option value="2">Hat</option>
                        <option value="3">JNCOS</option>
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
                                setFormState({
                                    ...formState,
                                    colors: [...formState.colors, slugify(newColor, { lower: true })]
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
                        {formState.colors.map(tag => {
                            return <li
                                onClick={() => {
                                    setFormState({
                                        ...formState,
                                        colors: formState.colors.filter(t => t !== tag)
                                    })
                                }}
                                key={tag}>
                                {tag}
                            </li>
                        })}
                    </ul>
                </div>

                {/* SIZE */}
                <div className="mb-3">
                    <h5>Size</h5>
                    <select
                        name="size"
                        className="form-select"
                        aria-label="Default select example"
                        onChange={handleInputs}
                        value={formState.size}>
                        <option selected>Size</option>
                        <option value="2">XXXL</option>
                        <option value="3">XXL</option>
                        <option value="3">XL</option>
                        <option value="3">L</option>
                        <option value="3">M</option>
                        <option value="3">S</option>
                        <option value="3">XS</option>
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
                        value={formState.condition}>
                        <option value="1">Mint</option>
                        <option value="2">Excellent</option>
                        <option value="3">Great</option>
                        <option value="3">Good</option>
                        <option value="3">Decent</option>
                        <option value="3">Bad</option>
                        <option value="3">Wrecked</option>
                    </select>
                </div>





                {/* IMAGE */}

                {/* 




                        <br />
                        <input type="file" accept="image/*" capture="user" />
                    </center>
                </div> */}

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
                        <button className="btn btn-success">Submit new Hand Me Up</button>
                    </center>
                </div>


            </div>
        </form>

    );
}


export default AddListing