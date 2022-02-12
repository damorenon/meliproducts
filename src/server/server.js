import express from 'express';
import dotenv from 'dotenv';

const app = express();

dotenv.config();
const { ENV, PORT } = process.env;

if (ENV === 'dev') console.log('dev config');

app.get('*', (req, res) => {
	console.log('Hola');
	res.send({ hello: 'express' });
});

app.listen(PORT, (err) => {
	if (err) console.log(err);
	else console.log(`Running nodemon server on port: ${PORT}`);
});
