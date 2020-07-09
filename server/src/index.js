const Koa = require("koa");
const Router = require("koa-router");
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

router.get("/", (ctx, next) => {
	console.log(ctx.request);
	ctx.body = "Hello world eureka";
	knex("posts")
		.select("*")
		.then(rows => console.log(rows));
	console.log(ctx.response);
});

router.get("/getposts", async (ctx, next) => {
	ctx.body = (await knex("posts").select("*")).map(row => {
		row.link = `http://localhost:3000/posts/${row.id}`;
		return row;
	});
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
