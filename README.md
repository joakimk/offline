An experiment with TypeScript and possibly a game later on.

Setup:

    yarn install

Run this to auto build `src/*.ts` into `build/*.js`:

    make watch

Run this to build `release/app.js` and update it when `build/*.js` changes:

    clear; make autodeploy --silent