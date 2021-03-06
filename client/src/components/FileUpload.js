import React, { Fragment, useState } from "react";
import axios from "axios";
import Message from "./Message";
import Progress from "./Progress";

const FileUpload = () => {
	const [file, setFile] = useState("");
	const [filename, setFilename] = useState("Choose File");
	const [uploadedFile, setUploadedFile] = useState({});
	const [message, setMessage] = useState("");
	const [uploadPercentage, setUploadPercentge] = useState(0);

	const onChange = (e) => {
		setFile(e.target.files[0]);
		setFilename(e.target.files[0].name);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("file", file);
		try {
			const res = await axios.post("/upload", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
				onUploadProgress: (progressEvent) => {
					let uploadPercentage = parseInt(
						Math.round((progressEvent.loaded * 100) / progressEvent.total)
					);
					setUploadPercentge(uploadPercentage);
					// clear progress
					setTimeout(() => setUploadPercentge(0), 5000);
				},
			});

			const { fileName, filePath } = res.data;
			setUploadedFile({ fileName, filePath });
			setMessage("File Uploaded Successfully");
			setTimeout(() => {
				setMessage("");
				setFile("");
				setFilename("");
				setUploadedFile({});
			}, 5000);
		} catch (err) {
			if (err.response.status === 500)
				setMessage("There Is a problem in Server");
			else setMessage(err.response.data.msg);
		}
	};
	return (
		<Fragment>
			{message !== "" ? (
				<Message className="bg-primary mt-3 mb-2 " msg={message} />
			) : null}

			<form onSubmit={onSubmit}>
				<div className="custom-file mb-4">
					<input
						type="file"
						className="custom-file-input mb-3"
						id="customFile"
						onChange={onChange}
					/>
					<label className="custom-file-label" htmlFor="customFile">
						{filename}
					</label>
					<Progress percentage={uploadPercentage} />
					<input
						type="submit"
						value="Upload"
						className="mt-4 btn btn-primary btn-block"
					/>
				</div>
			</form>

			{uploadedFile ? (
				<div className="row mt-5">
					<div className="col-md-6 m-auto text-center">
						<h3 className="text-center">{uploadedFile.fileName}</h3>
						<img style={{ width: "100%" }} src={uploadedFile.filePath} alt="" />
					</div>
				</div>
			) : null}
		</Fragment>
	);
};

export default FileUpload;
