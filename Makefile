live:
	node script/live_update_server.js

watch:
	node_modules/.bin/tsc --target es6 --noEmitOnError --outFile build/app.js --watch src/model.ts src/modelHistory.ts src/gameMap.ts src/main.ts

rebuild:
	rm -f build/*.js
	node_modules/.bin/tsc --target es6 --noEmitOnError --outFile build/app.js src/model.ts src/modelHistory.ts src/gameMap.ts src/main.ts

debug: rebuild debug_update

debug_update:
	cat vendor/*.js build/app.js > build/bundle.js
	cat script/support/live_update_client.js >> build/bundle.js
	echo ";startApp(kontra, 0);" >> build/bundle.js
	script/build_html

release: rebuild
	ls # todo: minify, build html and check size