// require('dotenv').config();
const cheerio = require("cheerio");
const fetch = require('node-fetch');
const fs = require('fs');

const mineOdesliData = async (odesliLink, release) => {
  return await fetch(odesliLink)
    .then((res) => res.text())
    .then((markup) => {
      const $ = cheerio.load(markup, { xmlMode: false })
      const scriptData = $("#__NEXT_DATA__").get()[0].children[0].data;
      let albumData
      try {
        albumData = JSON.parse(scriptData).props.pageProps.pageData.entityData;
        if (albumData === null || albumData === undefined) {
          throw new Error('Failed to retrieve data');
        }
      } catch (e) {
        throw e;
      }

      const releaseDate =
        release.releaseDate
        ? release.releaseDate
        : `${
          albumData.releaseDate.year
        }-${
          ('0' + (albumData.releaseDate.month+1)).slice(-2)
        }-${
          ('0' + albumData.releaseDate.day).slice(-2)
        }`;
      const releaseType = albumData.albumType ? albumData.albumType : albumData.type;
      const diskType = new Date(releaseDate).getTime() >= new Date('2000-01-01') ? 'cd' : 'vinyl';

      const res = {
        ...release,
        artist: albumData.artistName,
        album: albumData.title,
        artwork: albumData.thumbnailUrl,
        releaseType,
        releaseDate,
        odesliLink,
        diskType
      };
      return res;
    });
}

const getReleases = async () => {
  return fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/Reviews?view=Grid%20view`,
      { headers: { Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}` } /* API key */ }
    )
    .then((res) => res.json())
    .then(async (result) => (await result.records
        .map(record => ({
          id: record.id,
          releaseDate: record.fields['Release date'],
          rating: record.fields['Rating'],
          review: record.fields['Review'],
          musicBrainzLink: record.fields['MusicBrainz'],
          spotifyId: record.fields['Spotify']
        }))
        .map(async release => {
          const odesliLink = `https://album.link/s/${release.spotifyId}`;
          return await mineOdesliData(odesliLink, release);
        })
    ))
    .then((releases) => Promise.all(releases).then((res) => {
        const ratings = [...new Set(res.map(r => r.rating).filter(r => !!r))].sort((a, b) => (b - a)).map(r => r.toString());

        fs.writeFileSync('./_data/ratings.json', JSON.stringify(ratings));
        return res;
      })
    )
    .catch((err) => {
      console.log(err);
    });
}

module.exports = async function () {
  return getReleases();
};
