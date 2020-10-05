import React, { Fragment, useState } from "react";
import axios from "axios";

const FileUpload = () => {
	const [file, setFile] = useState("");
	const [filename, setFilename] = useState("Choose File");

	const onChange = (e) => {
		setFile(e.target.files[0]);
		setFilename(e.target.files[0].name);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("file", file);
		console.log(formData);
	};
	return (
		<Fragment>
			<form onSubmit={onSubmit}>
				<div className="custom-file mb-4">
					<input
						type="file"
						className="custom-file-input"
						id="customFile"
						onChange={onChange}
					/>
					<label className="custom-file-label" htmlFor="customFile">
						{filename}
					</label>
					<input
						type="submit"
						value="Upload"
						className="mt-4 btn btn-primary btn-block"
					/>
				</div>
			</form>
		</Fragment>
	);
};

export default FileUpload;
