const express = require('express');
const router = express.Router();
const teamsAPI = require('./modules/teams');

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
      await teamsAPI.insertTeams();
      const teams = await teamsAPI.getTeams();
      console.log('teams', teams);
      res.send('done.');
    } catch (e) {
        console.error('Error: ', e.message);
    }
})

module.exports = router;
