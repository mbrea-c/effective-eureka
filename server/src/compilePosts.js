const fs = require("fs");
const { exec } = require("child_process");

module.exports = () => {
	fs.readdir("./posts", (err, files) => {
		files.map(file => {
			if (!fs.existsSync(`./public/posts/${file}`)) {
				fs.mkdirSync(`./public/posts/${file}`);
			}
			exec(
				`htlatex ../../../posts/${file}/index.tex html "" -d. "--interaction=nonstopmode"`,
				{
					cwd: `./public/posts/${file}/`
				}
			);
		});
	});
};
