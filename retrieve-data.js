require('dotenv').config();

const getReleases = async () => {
	const fetch = require('node-fetch');
	const fs = require('fs');

    fetch(
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
            musicBrainzLink: record.fields['MusicBrainz']
        }));

        fs.writeFileSync('./_data/releases.json', JSON.stringify(releases));
    })
    .catch((err) => {
      console.log(err);
    });
}

getReleases();