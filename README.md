# WeatherService
Weather app built with Angular & ngrx

[Demo](https://elated-lichterman-a7fcb3.netlify.app/)

## Features
- Search for any location and add to your list of searched locations.
- Change sorting of searched locations between asc/desc.
- Change view mode between column and row layout.
- Uses browser alerts to notify users of errors.
- Incorrect route handling.
- Ability to toggle data points for each saved location.
- Ability to view details for each location which features all available data points and a three day forecast.
- Weather cards for locations and forecasts feature dynamic backgrounds that change based on the time of day at that location.

## Known Issues
- Currently not working for Safari on IOS. Not tested on Safari for MacOS or on Android, but should work on most browsers available.
- The demo site's custom 404 page is currently not used beccause Netlify overrides it by default. To see the custom 404 page, clone the repo and run locally.

## Planned Updates
- Ability to run offline as a PWA.
- Ability to maintain user's saved locations between sessions.
- Add tests using Playwright, and running on a Github CI pipeline.
- Fix mobile support and better testing across mobile platforms.
