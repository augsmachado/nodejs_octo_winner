const express = require("express");
const { Deta } = require("deta");

const deta = Deta("myProjectKey"); // configure your Deta project
const db = deta.Base("simpleDB"); // access your DB

const app = express(); // instantiate express

app.use(express.json()); // for parsing application/json bodies
