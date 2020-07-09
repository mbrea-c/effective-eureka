const Koa = require("koa");
const app = new Koa();
const knex = require("knex")({
	client: "pg",
	connection: {
		host: "127.0.0.1",
		user: "manuel",
		password: "",
		database: "eureka"
	}
});

app.use(async ctx => {
	console.log(ctx.request);
	ctx.body = "Hello world eureka";
	knex("posts")
		.select("*")
		.then(rows => console.log(rows));
	console.log(ctx.response);
});

app.listen(3000);
