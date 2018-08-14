An experiment with TypeScript and possibly a game later on.

If you use VSCode it will autosave on changes.

Setup:

    yarn install

Run this to auto build `src/*.ts` into `build/*.js`:

    make watch

Run this to build `release/app.js` and update it when `build/*.js` changes:

    clear; make autodeploy --silent

# Notes

How types for three.js was added:

    yarn add typings
    node_modules/.bin/typings install dt~three --global