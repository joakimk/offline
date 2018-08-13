rebuild:
	rm -f build/*.js
	node_modules/.bin/tsc src/*.ts --outDir build/ --noEmitOnError

watch:
	node_modules/.bin/tsc --watch src/*.ts --outDir build/ --noEmitOnError

autodeploy: rebuild deploy
	fswatch --monitor=fsevents_monitor build/ | (while read; do make deploy; done)

deploy:
	cat build/*.js > release/app.js

release: rebuild
	ls # todo: minify, build html and check size