const express = require('express');
const router = express.Router();
const teamsAPI = require('./modules/teams');
const scheduleAPI = require('./modules/schedule');
const rankingAPI = require('./modules/rankings');
const playersAPI = require('./modules/players');
const { RankingType } = require('./helpers/enums');

router.get('/health', async (req, res) => {
    try {
        res.status(200);
        res.send('server up\n');
    } catch (e) {
        console.error('Error: ', e.message);
    }
})

router.get('/sync', async (req, res) => {
    try {
      await teamsAPI.insertTeams();
      const teams = await teamsAPI.getTeams();
      await scheduleAPI.insertSchedules();
      const schedule = await scheduleAPI.getSchedule(2025);
      await rankingAPI.insertRankings();
      const rankings = await rankingAPI.getRanking(2025, RankingType.powerRanking);
      await playersAPI.insertPlayers();
      const player = await playersAPI.getPlayerByNumber('MIN', 18);

      console.log('teams', teams);
      console.log('schedule', schedule);
      console.log('rankings', rankings.sort((rankA, rankB) => rankA.rank > rankB.rank ? 1 : -1).map(team => team.team));
      console.log('player', player);
      res.send('done.');
    } catch (e) {
        console.error('Error: ', e.message);
    }
})

module.exports = router;
