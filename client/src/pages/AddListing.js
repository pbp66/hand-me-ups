import { storage } from "../../src/utils/firebase";
import { DateTime } from "luxon";
import slugify from "slugify";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { isMobile } from "react-device-detect";
import { ADD_LISTING } from "../utils/mutations";
import { QUERY_ALL_CATEGORIES } from "../utils/queries";
import auth from "../utils/auth";


function AddListing() {
	const {
		data,
		loading: categoriesLoading,
		error: categoriesError,
	} = useQuery(QUERY_ALL_CATEGORIES);
	
	const categories = data?.allCategories || [];
	const [listing, setListing] = useState(
		{
			title: "",
			image: "",
			description: "",
			price: 0,
			category: [],
			size: "",
			tags: [],
			color: [],
			condition: "",
		});

	// {
	// 	title: "JNCOS",
	// 		description: "JNCOS",
	// 			price: 250.25,
	// 				category: "Shirt",
	// 					tags: ["90s", "other"],
	// 						size: "XXL",
	// 							color: ["red"],
	// 								condition: "NEW",
	// 									image: "image.com",
	// }

	const [errorMessage, setErrorMessage] = useState("");
	const [disabled, setDisabled] = useState(true);
	const [loading, setLoading] = useState(false);
	const [newTag, setNewTag] = useState("");
	const [newColor, setNewColor] = useState("");
	const [files, setFiles] = useState(null);

	const [addListing, { error }] = useMutation(ADD_LISTING);

	const handleInputs = (e) => {
		const { value, name } = e.target;
		if (!value.length) {
			setErrorMessage(`${name} is required`);
			setDisabled(true);
		} else {
			setDisabled(false);
			setErrorMessage("");
		}
		const updatedFormState = {
			...listing,
			[name]: value,
		};
		setListing(updatedFormState);
	};
	const handleFileInput = (e) => {
		setFiles(e.target.files);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		let image = ""
		for (const file of files) {
			const imagesRef = ref(storage, `images/${file.name}`)
			const snapshot = await uploadBytes(imagesRef, file)
			image = await getDownloadURL(snapshot.ref)
		}
		if (image === "") {
			setDisabled(true)
		} else {
			setDisabled(false)
		}
		const updatedFormState = {
			...listing,
			image: image,
			price: parseFloat(listing.price),
		};
		try {
			console.log(updatedFormState);
			const { data } = await addListing({
				variables: { listing: updatedFormState },
			});
			setListing(updatedFormState);
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<form
			method="post"
			encType="multipart/form-data"
			onSubmit={handleSubmit}
		>
			<div className="container">
				{/* TITLE */}
				<div className="mb-3">
					<label
						htmlFor="exampleFormControlInput1"
						className="form-label"
					>
						<h5>Title</h5>
					</label>
					<input
						name="title"
						type="text"
						className="form-control"
						id="exampleFormControlInput1"
						placeholder="What is this Hand me up?"
						onChange={handleInputs}
						value={listing.title}
					/>
				</div>

				{/* DESCRIPTION */}
				<div className="mb-3">
					<label
						htmlFor="exampleFormControlTextarea1"
						className="form-label"
					>
						<h5>Description</h5>
					</label>
					<textarea
						name="description"
						className="form-control"
						id="exampleFormControlTextarea1"
						rows="2"
						placeholder="Write a short description of the Hand-me-up"
						onChange={handleInputs}
						value={listing.description}
					></textarea>
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
						aria-label="Amount (to the nearest dollar)"
						placeholder="Asking Price"
						onChange={handleInputs}
						value={listing.price}
					/>
				</div>
				{/* CATEGORIES */}
				<div className="mb-3">
					<h5>category</h5>
					<select
						name="category"
						className="form-select"
						aria-label="Default select example"
						onChange={handleInputs}
						value={listing.category}
					>
						<option value=""> -- select an option -- </option>
						{categories.map(({ category, _id }) => {
							return (
								<option
									value={_id}
									key={_id}
								>
									{category}
								</option>
							);
						})}
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
						value={listing.size}
					>
						<option value=""> -- select an option -- </option>
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
						value={listing.condition}
					>
						<option value=""> -- select an option -- </option>
						<option>NEW</option>
						<option>USED_LIKE_NEW</option>
						<option>USED_GOOD</option>
						<option>USED_FAIR</option>
						<option>USED_POOR</option>
					</select>
				</div>
				{/* color */}
				<div className="mb-3">
					<label
						htmlFor="exampleFormControlTextarea1"
						className="form-label"
					>
						<h5>Colors</h5>
					</label>
					<input
						className="form-control"
						id="exampleFormControlTextarea1"
						rows="1"
						placeholder="color"
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
									color: [
										...listing.color,
										slugify(newColor, { lower: true }),
									],
								});
								setNewColor("");
							}}
						>
							Add Color
						</button>
					</center>
				</div>
				<div className="mb-3">
					<ul>
						{listing.color.map((tag) => {
							return (
								<li
									onClick={() => {
										setListing({
											...listing,
											color: listing.color.filter(
												(t) => t !== tag
											),
										});
									}}
									key={tag}
								>
									{tag}
								</li>
							);
						})}
					</ul>
				</div>
				{/* TAGS */}
				<div className="mb-3">
					<label
						htmlFor="exampleFormControlTextarea1"
						className="form-label"
					>
						<h5>Tags</h5>
					</label>
					<input
						className="form-control"
						id="exampleFormControlTextarea1"
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
									tags: [
										...listing.tags,
										slugify(newTag, { lower: true }),
									],
								});
								setNewTag("");
							}}
						>
							Add tag
						</button>
					</center>
				</div>
				<div className="mb-3">
					<ul>
						{listing.tags.map((tag) => {
							return (
								<li
									onClick={() => {
										setListing({
											...listing,
											tags: listing.tags.filter(
												(t) => t !== tag
											),
										});
									}}
									key={tag}
								>
									{tag}
								</li>
							);
						})}
					</ul>
				</div>
				{/* detect if mobile to use camera or file upload */}
				{!isMobile ? (
					<input
						type="file"
						accept="image/*"
						capture="camera"
						onChange={handleFileInput}
					/>
				) : (
					<div className="mb-3">
						<label
							htmlFor="file"
							className="form-label"
						>
							<h5>Upload Image</h5>
						</label>
						<center>
							<input
								onChange={handleFileInput}
								type="file"
								id="file"
								name="file"
								multiple
							/>
						</center>
					</div>
				)}

				<div>
					<br />
					<center>
						{disabled ? (
							<center>
								<h2>{errorMessage}</h2>
							</center>
						) : (
							<button className="btn btn-success">
								Submit new Hand Me Up
							</button>
						)}
					</center>
				</div>
				<br />
			</div>
		</form>
	);
}

export default AddListing;
