const express = require("express");
const { Deta } = require("deta");

const deta = Deta("myProjectKey"); // configure your Deta project
const db = deta.Base("simpleDB"); // access your DB

const app = express(); // instantiate express
app.use(express.json()); // for parsing application/json bodies

app.get("/", (req, res) => res.status(200).json({ msg: "Hello World!" }));

// create a new user
app.post("/users", async (req, res) => {
	const { name, age, hometown } = req.body;
	const toCreate = { name, age, hometown };
	const insertedUser = await db.put(toCreate); // put() will autogenerate a key for us
	res.status(201).json(insertedUser);
});

// read a user data
app.get("/users/:id", async (req, res) => {
	const { id } = req.params;
	const user = await db.get(id);
	if (user) {
		res.json(user);
	} else {
		res.status(404).json({ message: "user not found" });
	}
});

// search users by age
app.get("/search-by-age/:age", async (req, res) => {
	const { age } = req.params;
	const { items } = await db.fetch({ age: age });
	return res.json(items);
});

// update a user
app.put("/users/:id", async (req, res) => {
	const { id } = req.params;
	const { name, age, hometown } = req.body;
	const toPut = { key: id, name, age, hometown };
	const newItem = await db.put(toPut);
	return res.json(newItem);
});

// delete a user
app.delete("/users/:id", async (req, res) => {
	const { id } = req.params;
	await db.delete(id);
	res.json({ message: "deleted" });
});

// export 'app'
module.exports = app;
