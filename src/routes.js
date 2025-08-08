const express = require('express');
const router = express.Router();
const teamsAPI = require('./modules/teams');
const scheduleAPI = require('./modules/schedule');
const rankingAPI = require('./modules/rankings');
const playersAPI = require('./modules/players');
const weightsAPI = require('./modules/weights');
const predictAPI = require('./modules/predict');
const calculateAPI = require('./modules/calculate');
const { RankingType } = require('./helpers/enums');
const weightSettings = require('./weightSettings');

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

router.get('/compare', async (req, res) => {
    try {
      const player1Team = req.query.player1Team;
      const player1Number = req.query.player1Number;
      const player2Team = req.query.player2Team;
      const player2Number = req.query.player2Number;

      const player1 = await playersAPI.getPlayerByNumber(player1Team, player1Number);
      const player2 = await playersAPI.getPlayerByNumber(player2Team, player2Number);
      const grade1 = await calculateAPI.calculatePlayerGrade(player1, weightSettings);
      const grade2 = await calculateAPI.calculatePlayerGrade(player2, weightSettings);

      res.send(`
---Player Comparison---
Player 1: ${player1.name} ${player1.team} ${player1.position} -> Grade = ${grade1}
Player 2: ${player2.name} ${player2.team} ${player2.position} -> Grade = ${grade2}

Take ${grade1 > grade2 ? player1.name : player2.name}\n`);
    } catch (e) {
        console.error('Calc Error: ', e.message);
    }
})

router.post('/weight', async (req, res) => {
  try {
      const playerAgeWeight = 0.2;
      const playerHeightWeight = 0.2;
      const playerWeightWeight = 0.2;
      const playerExperienceWeight = 0.2;
      const playerRatingWeight = 0.2;

      const weights = {
        age: playerAgeWeight,
        height: playerHeightWeight,
        weight: playerWeightWeight,
        experience: playerExperienceWeight,
        rating: playerRatingWeight,
      };

    await weightsAPI.insertWeight(weights, 0);
    res.send('done');
  }
  catch (e) {
    console.error('weight error', e.message);
  }
})

router.get('/weight', async (req, res) => {
  try {
    const weights = await weightsAPI.getWeights();
    res.send(weights);
  }
  catch (e) {
    console.error('weight error', e.message);
  }
})

router.post('/predictPlayers', async (req,res) => {
  try {
    await predictAPI.predictPlayers();
    res.send('done.');
  }
  catch (e) {
    console.error('predict error', e.message);
  }
});

router.post('/predictTeams', async (req,res) => {
  try {
    await predictAPI.predictTeams();
    res.send('done.');
  }
  catch (e) {
    console.error('predict error', e.message);
  }
});

module.exports = router;
