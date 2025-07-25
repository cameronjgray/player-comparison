const express = require('express');
const router = require('./routes');

require('dotenv').config()

const PORT = process.env.SERVER_PORT;
const app = express();
app.use(express.json());
app.use(router);
app.listen(PORT, () => console.log(`server running on ${PORT}`));

