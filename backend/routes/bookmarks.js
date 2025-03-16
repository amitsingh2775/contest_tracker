const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/Users');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('bookmarkedContests');
    res.json(user.bookmarkedContests);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { contestId, action } = req.body;
    const user = await User.findById(req.user.userId);
    if (action === 'add') {
      if (!user.bookmarkedContests.includes(contestId)) {
        user.bookmarkedContests.push(contestId);
      }
    } else if (action === 'remove') {
      user.bookmarkedContests = user.bookmarkedContests.filter(id => id.toString() !== contestId);
    }
    await user.save();
    res.json({ message: 'Bookmark updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;