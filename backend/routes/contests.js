const express = require('express');
const Contest = require('../models/Contests');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { platform, status } = req.query;
    let query = {};

    if (platform) {
      const platforms = platform.split(',').map(p => new RegExp(p, 'i'));
      query.platform = { $in: platforms };
    }

    if (status) {
      if (!['upcoming', 'past'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status. Use "upcoming" or "past".' });
      }
      const now = new Date();
      if (status === 'upcoming') {
        query.startTime = { $gt: now };
      } else if (status === 'past') {
        query.endTime = { $lt: now };
      }
    }

    const contests = await Contest.find(query).sort({ startTime: 1 });
    res.json(contests);
  } catch (error) {
    res.status(500).json({ message: `Error fetching contests: ${error.message}` });
  }
});
router.get('/past', async (req, res) => {
  try {
    const now = new Date();
    const pastContests = await Contest.find({ endTime: { $lt: now } }).sort({ endTime: -1 });
    res.json(pastContests);
  } catch (error) {
    res.status(500).json({ message: `Error fetching past contests: ${error.message}` });
  }
});


module.exports = router;
