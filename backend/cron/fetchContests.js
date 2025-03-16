const axios = require('axios');
const Contest = require('../models/Contests');
require('dotenv').config();

// ✅ Manually store contest solution links
const youtubeSolutions = {
  "Codeforces Round 900": "https://www.youtube.com/playlist?list=PLcXpkI9A-RZLUfBSNp-YQBCOezZKbDSgB",
  "Leetcode Biweekly Contest 110": "https://www.youtube.com/playlist?list=PLcXpkI9A-RZI6FhydNz3JBt_-p_i25Cbr",
  "CodeChef Starters 120": "https://www.youtube.com/playlist?list=PLcXpkI9A-RZIZ6lsE0KCcLWeKNoG45fYr"
};

const fetchContests = async () => {
  try {
    const response = await axios.get(
      `https://clist.by/api/v2/json/contest/?limit=1000&offset=1&with_problems=false&upcoming=true&order_by=start&username=${process.env.API_USERNAME}&api_key=${process.env.API_KEY}`
    );

    console.log("Raw API Response:", response.data);

    const contests = response.data.objects;
    if (!Array.isArray(contests) || contests.length === 0) {
      console.warn("No upcoming contests found.");
      return;
    }

    const platforms = ['codeforces', 'codechef', 'leetcode'];
    const filteredContests = contests.filter(contest =>
      platforms.some(platform => contest.resource.toLowerCase().includes(platform))
    );

    console.log("Filtered Contests:", filteredContests);

    await Promise.all(filteredContests.map(async (contest) => {
      const { id, event: name, start, end, href: url, resource: platform } = contest;

      if (!id || !name || !start || !end || !url || !platform) {
        console.warn('Skipping invalid contest:', contest);
        return;
      }

      const youtubeUrl = youtubeSolutions[name] || null;

      await Contest.findOneAndUpdate(
        { url }, 
        {
          contestId: id,
          platform,
          name,
          startTime: new Date(start),
          endTime: new Date(end),
          url,
          youtubeUrl // ✅ Add YouTube Link
        },
        { upsert: true, new: true }
      );
    }));

    console.log('Contests updated successfully');
  } catch (error) {
    console.error('Error fetching upcoming contests:', error.message);
  }
};

module.exports = fetchContests;
