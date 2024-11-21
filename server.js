const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('src'));

app.post('/generate', async (req, res) => {
	const prompt = req.body.prompt;
	const genAI = new GoogleGenerativeAI(process.env.API_KEY);
	const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

	try {
		const result = await model.generateContent("Search a place to travel with this preferences:" + prompt);
		res.json({ response: result.response.text() });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {});