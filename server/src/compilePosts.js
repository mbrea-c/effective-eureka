const util = require("util");
const fs = require("fs");
const exec = util.promisify(require("child_process").exec);

// Checks if compilation is in progress before compiling
let isCompiling = false;
function compileSafe() {
	if (!isCompiling) {
		console.log("Started compilation");
		isCompiling = true;
		compile().then(() => {
			console.log("Finished compilation");
			isCompiling = false;
		});
	} else {
		console.log("Compilation in progress: Can't compile now!");
	}
}

async function compile() {
	const postDirs = await fs.promises.readdir("./posts");
	await Promise.all(
		postDirs.map(async postDir => {
			//TODO: sanity checks for post sources (does index.tex exist?)
			// Ensure target post directory exists
			if (!fs.existsSync(`./public/posts/${postDir}`)) {
				fs.mkdirSync(`./public/posts/${postDir}`);
			}
			// Call external compiler
			await exec(
				`htlatex ../../../posts/${postDir}/index.tex "html,mathml" "" -d. "--interaction=nonstopmode"`,
				{
					cwd: `./public/posts/${postDir}/`
				}
			);
			// Copy over pictures
			const files = await fs.promises.readdir(`./posts/${postDir}`);
			await Promise.all(
				files
					.filter(file => {
						/* filter out non images */
						const fileExtension = file.split(".").slice(-1)[0];
						return fileExtension == "png" || fileExtension == "jpg";
					})
					.map(imageFile => {
						/* copy over images */
						return fs.promises.copyFile(
							`./posts/${postDir}/${imageFile}`,
							`./public/posts/${postDir}/${imageFile}`
						);
					})
			);
		})
	);
}

module.exports = { compileSafe, compile };
