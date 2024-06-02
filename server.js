
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const translateRoutes = require('./routes/TranslateRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({origin: ['http://localhost:5173', 'https://tone-translator-frontend-g5pa.vercel.app'], credentials: true}));

app.use('/', translateRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
