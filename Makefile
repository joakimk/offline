rebuild:
	rm -f build/*.js
	node_modules/.bin/tsc --target es6 --noEmitOnError --outDir build/ src/*.ts

watch:
	node_modules/.bin/tsc --target es6 --noEmitOnError --outDir build/ --watch src/*.ts

autodeploy: rebuild deploy
	fswatch build/ | (while read; do echo "Updating..."; make deploy; done)

deploy:
	cat vendor/*.js build/*.js > build/output/app.js
	echo "main();" >> build/output/app.js
	script/build_html

release: rebuild
	ls # todo: minify, build html and check size