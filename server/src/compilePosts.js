const fs = require("fs");
const { exec } = require("child_process");

module.exports = () => {
	fs.readdir("./posts", (err, files) => {
		files.map(file => console.log(file));
	});
};
