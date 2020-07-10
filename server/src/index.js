const fs = require("fs");
const Koa = require("koa");
const cors = require("@koa/cors");
const Router = require("koa-router");
const serve = require("koa-static");
const compile = require("./compilePosts.js");
const knex = require("knex")({
	client: "pg",
	connection: {
		host: "127.0.0.1",
		user: "eureka_role",
		password: "eureka",
		database: "eureka"
	}
});

const app = new Koa();
const router = new Router();

compile();

// Update database post index
fs.readdir("./posts", (err, files) => {
	files.map(file => {
		const fileStat = fs.statSync(`./posts/${file}`);
		let postName;
		try {
			postName = fs.readFileSync(`./posts/${file}/post_name`);
		} catch (error) {
			postName = "Nameless post";
		}
		knex.raw(
			`? ON CONFLICT (id)
						DO UPDATE SET
						id = EXCLUDED.id,
						name = EXCLUDED.name,
						date_posted = EXCLUDED.date_posted;`,
			[
				knex("posts").insert({
					id: file,
					name: postName,
					date_posted: fileStat.birthtime
				})
			]
		);
	});
});

router.get("/getposts", async (ctx, next) => {
	ctx.body = (await knex("posts").select("*")).map(row => {
		row.link = `http://localhost:3000/posts/${row.id}`;
		return row;
	});
});

app.use(cors());
app.use(router.routes()).use(router.allowedMethods());
app.use(serve("./public"));

app.listen(3000);
