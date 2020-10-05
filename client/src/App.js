import React from "react";
import "./App.css";
import FileUpload from "./components/FileUpload";

const App = () => (
	<div className="container mt-4">
		<h4 className="display-4 text-center mt-4">
			<i className="fab fa-react">React File Upload</i>
			<i className="fab fa-react" />
		</h4>
		<FileUpload />
	</div>
);

export default App;
