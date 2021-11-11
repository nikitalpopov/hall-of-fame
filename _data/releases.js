// require('dotenv').config();
const fetch = require('node-fetch');
const fs = require('fs');

module.exports = async function () {
  return await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/Reviews?view=Grid%20view`,
      {
        headers: { Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}` } // API key
      }
    )
    .then((res) => res.json())
    .then((result) => {
      const releases = result.records.map(record => ({
        id: record.id,
        artist: record.fields['Artist'],
        album: record.fields['Album'],
        releaseDate: record.fields['Release date'],
        artwork: (record.fields['Art'] && record.fields['Art'].length) ? record.fields['Art'][0].url : undefined,
        rating: record.fields['Rating'],
        review: record.fields['Review'],
        releaseType: record.fields['Release type'],
        odesliLink: record.fields['Odesli'],
        musicBrainzLink: record.fields['MusicBrainz'],
        spotifyId: record.fields['Spotify']
      }));

      const ratings = [...new Set(releases.map(r => r.rating).filter(r => !!r))].sort((a, b) => (b - a)).map(r => r.toString());

      fs.writeFileSync('./_data/ratings.json', JSON.stringify(ratings));

      return releases;
    });
};
