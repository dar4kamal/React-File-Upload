const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(fileUpload());

// Upload Endpoints
app.post("/upload", (req, res) => {
	if (req.files === null)
		return res.status(400).json({ msg: "No file uploaded" });

	const file = req.files.file;
	const filename = `${Date.now()}-${file.name}`;
	file.mv(`${__dirname}/client/public/uploads/${filename}`, (err) => {
		if (err) {
			console.error(err);
			return res.status(500).send(err);
		}
	});

	res.json({ fileName: file.name, filePath: `uploads/${filename}` });
});

app.listen(PORT, () => {
	console.log(`Server Statred at ${PORT}`);
});
