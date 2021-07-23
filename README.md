# Albums' hall of fame

[![Visit website](screenshot.png)](https://albums-hall-of-fame.netlify.app/)

Database with collected info:
![Airtable Database](./airtable.png)

## How to build

Some environment variables should be defined in `.env` file in order to let script retrieve data from Airtable (see `.env.example`)

```sh
# Retrieve data from Airtable
> node retrieve-data.js
# Build with eleventy
> npm run build
```
