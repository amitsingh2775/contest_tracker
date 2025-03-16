const express = require('express');
const auth = require('../middleware/auth');
const Contest = require('../models/Contests');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const { contestId, youtubeUrl } = req.body;
    await Contest.findByIdAndUpdate(contestId, { youtubeUrl });
    res.status(200).json({ message: 'Solution added' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;