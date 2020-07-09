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
fs.readdir("./posts", (err, files) => {
	files.map(file => {
		fileStat = fs.statSync(`./posts/${file}`);
		console.log(fileStat);
		knex("posts").insert({
			id: file,
			name: "a test",
			date_posted: fileStat.birthtime
		});
	});
});

router.get("/getposts", async (ctx, next) => {
	ctx.body = (await knex("posts").select("*")).map(row => {
		row.link = `http://localhost:3000/posts/${row.id}`;
		return row;
	});
});

app.use(cors());
app.use(serve("./public"));
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
