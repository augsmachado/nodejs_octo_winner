import express from "express";
import dotenv from "dotenv";

import status from "./routes/status.routes.js";

// Define .env config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Define action routes
app.use("/", status);

// Define action to undefined route
app.use("*", (req, res) => {
	res.status(400).json({
		error: "Not route found",
	});
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

export default app;
