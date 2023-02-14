
import slugify from "slugify"
import { useState, useMutation } from 'react'

function ListingForm({handleSubmit, handleFileInput, formState, newTag, setFormState, setNewTag, newColor, setNewColor, disabled}) {
  return (
    <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
      <div className='container'>

        {/* TITLE */}
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">Title</label>
          <input
            type="text"
            className="form-control" id="exampleFormControlInput1"
            placeholder="What is this Hand me up?"
            value={formState.title} />
        </div>

        {/* DESCRIPTION */}
        <div className="mb-3">
          <label for="exampleFormControlTextarea1" className="form-label">Description</label>
          <textarea
            className="form-control" id="exampleFormControlTextarea1"
            rows="2"
            placeholder="Write a short description of the Hand-me-up"
            value={formState.description}></textarea>
        </div>

        {/* PRICE */}
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">$</span>
          </div>
          <input
            type="text"
            className="form-control"
            aria-label="Amount (to the nearest dollar)" placeholder="Asking Price"
            value={formState.price} />
        </div>

        {/* TAGS */}
        <div className="mb-3">
          <label for="exampleFormControlTextarea1" className="form-label">Tags</label>
          <input
            className="form-control" id="exampleFormControlTextarea1"
            rows="1"
            placeholder="Tags"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
          <br/>
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
            className="form-select"
            aria-label="Default select example"
            value={formState.category}>
            <option selected>Product Category</option>
            <option value="1">Shirt</option>
            <option value="2">Hat</option>
            <option value="3">JNCOS</option>
          </select>
        </div>

        {/* COLORS */}
        <div className="mb-3">
          <label for="exampleFormControlTextarea1" className="form-label">colors</label>
          <input
            className="form-control" id="exampleFormControlTextarea1"
            rows="1"
            placeholder="colors"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
          />
          <br/>
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
          <select
            className="form-select"
            aria-label="Default select example"
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
          <select
            className="form-select"
            aria-label="Condition Drop-Down"
            value={formState.condition}>
            <option selected>Condition</option>
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
        <div className="mb-3">
          <label for="file" className="form-label">
            Hand-me-up an image
          </label>
          <input
            onChange={handleFileInput}
            type="file"
            id="file"
            name="file"
            multiple />
        </div>
        <div>
          <button className="btn btn-success">Submit new Hand Me Up</button>
        </div>
      </div>
    </form>

  );
}


export default ListingForm