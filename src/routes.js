const express = require('express');
const router = express.Router();
const teamsAPI = require('./modules/teams');
const scheduleAPI = require('./modules/schedule');
const rankingAPI = require('./modules/rankings');
const playersAPI = require('./modules/players');
const calculateAPI = require('./modules/calculate');
const { RankingType } = require('./helpers/enums');

router.get('/health', async (req, res) => {
    try {
        res.status(200);
        res.send('server up\n');
    } catch (e) {
        console.error('Error: ', e.message);
    }
})

router.post('/sync', async (req, res) => {
    try {
      await teamsAPI.insertTeams();
      await scheduleAPI.insertSchedules();
      await rankingAPI.insertRankings();
      await playersAPI.insertPlayers();
      res.send('Data Synced.');
    } catch (e) {
        console.error('Syncing Error: ', e.message);
    }
})

router.get('/calc', async (req, res) => {
    try {
      const player1 = await playersAPI.getPlayerByNumber('MIN', 18);
      const grade = await calculateAPI.calculatePlayerGrade(player1);
      console.log('grade', grade);
      res.send('done.');
    } catch (e) {
        console.error('Syncing Error: ', e.message);
    }
})

module.exports = router;
