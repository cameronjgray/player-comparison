const express = require('express');
const router = express.Router();

router.get('/health', async (req, res) => {
    try {
        res.status(200);
        res.send('server up\n');
    } catch (e) {
        console.error('Error: ', e.message);
    }
})


module.exports = router;
