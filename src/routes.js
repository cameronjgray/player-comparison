const express = require('express');
const router = express.Router();
const { exampleDB } = require('./modules/exampleDB');

router.get('/health', async (req, res) => {
    try {
        res.status(200);
        res.send('server up\n');
    } catch (e) {
        console.error('Error: ', e.message);
    }
})

router.get('/db-example', async (req, res) => {
    try {
      await exampleDB();
      res.send('done.');
    } catch (e) {
        console.error('Error: ', e.message);
    }
})

module.exports = router;
