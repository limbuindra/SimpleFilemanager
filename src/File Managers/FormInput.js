import React, { useState, useEffect } from "react";
import axios from "axios";

const FormInput = () => {
	const initialValues = {
		username: "",
		email: "",
		image: "",
		phone: "",
		password: "",
		confirm: "",
		error: null,
	};
	const [formValues, setFormValues] = useState(initialValues);
	const [records, setRecords] = useState([]);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [image, setImage] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
		// console.log(formValues);
		const file = e.target.files[0];
		setImage(file);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const newRecord = { ...formValues, id: new Date().getTime().toString() };
		console.log(records);
		setRecords([...records, newRecord]);
		console.log(records);

		setFormErrors(validate(formValues));
		setIsSubmit(true);
		// console.log(formValues);

        // setRecords([]);
	};

	const fileUploadHandler = async(e) => {
		e.preventDefault();
	const res = await fetch("https://react-form-aee44-default-rtdb.firebaseio.com/reactform.json",{
		method:" POST",
		headers:{
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username: "",
			email: "",
			image: "",
			phone: "",
			password: "",
			confirm: "",
		})
	
	}
	);
		
	};

	useEffect(() => {
		if (Object.keys(formErrors).length === 0 && isSubmit) {
			console.log(formValues);
		}
	}, [formErrors]);

	const validate = (values) => {
		const errors = {};
		if (!values.username) {
			errors.username = "Username is required";
		}
		if (!values.email) {
			errors.email = "Email is required.";
		}
		if (!values.image) {
			errors.image = "Image is required ";
		}
		if (!values.phone) {
			errors.phone = "Phone number is required ";
		} else if (values.phone.length < 10) {
			errors.phone = " Phone number cannot be less than 10digit";
		}
		if (!values.password) {
			errors.password = "Password is required ";
        }
			if (!values.confirmpassword) {
				errors.confirmpassword = "Confirm password is required ";
			} else if (values.confirmpassword === values.confirmpassword) {
				errors.confirmpassword = " confirmpassword cannot match with password ";
			}
		
		return errors;
	};

	return (
		<>
			<form onSubmit={handleSubmit} method="POST">
				<h1>Register</h1>
				<div>
					<label htmlFor="username ">Name: </label>
					<input
						type="text"
						name="username"
						id="username"
						value={formValues.username}
						autoComplete="off"
						onChange={handleChange}
					/>
				</div>
				<p>{formErrors.username}</p>
				<br />
				<div>
					<label htmlFor="email">Email:</label>
					<input
						type="text"
						name="email"
						id="email"
						value={formValues.email}
						autoComplete="off"
						onChange={handleChange}
					/>
				</div>
				<p>{formErrors.email}</p>
				<br />
				<div>
					<label htmlFor="image">Image:</label>
					<input
						type="file"
						name="image"
						id="image"
						value={formValues.image}
						autoComplete="off"
						onChange={handleChange}
					/>
				</div>
				<p>{formErrors.image}</p>
				<br />
				<div>
					<label htmlFor="phone">Phone:</label>
					<input
						type="number"
						name="phone"
						id="phone"
						value={formValues.phone}
						autoComplete="off"
						onChange={handleChange}
					/>
				</div>
				<p>{formErrors.phone}</p>
				<br />
				<div>
					<label htmlFor="password ">Password:</label>
					<input
						type="password"
						name="password"
						id="password"
						value={formValues.password}
						autoComplete="off"
						onChange={handleChange}
					/>
					<p>{formErrors.password}</p>
				</div>
				<br />
				<div>
					<label htmlFor="confirmpassword">Confirm Password:</label>
					<input
						type="password"
						name="confirmpassword"
						id="confirmpassword"
						value={formValues.confirmpassword}
						autoComplete="off"
						onChange={handleChange}
					/>
					<p>{formErrors.confirmpassword}</p>
				</div>
				<br />
				<button type="submit" onClick={fileUploadHandler}>
					Register
				</button>
			</form>
			<div>
				{records.map((currEle) => {
					const {
						id,
						username,
						email,
						image,
						phone,
						password,
						confirmpassword,
					} = currEle;
					return (
						<div key={id}>
							<h4>{username}</h4>
							<h4>{email}</h4>
							<img src={{image}} />
							<h4>{phone}</h4>
							<h4>{password}</h4>

							<p>{confirmpassword}</p>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default FormInput;
