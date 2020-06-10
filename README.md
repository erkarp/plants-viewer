# CMS Search Page Front End

### Setup
Navigate to the react app directory (not the django project dir -- this decision is open to debate) and install dependencies
```commandline
npm install
```

Manual build for staging or prod respectively: 
```commandline
npm run build_staging
```
or
```commandline
npm run build_prod
```

Hot updates for local dev work: `npm run watch`

### Testing
To test: `npm test`

To update snapshots: `npm test -- -u`
