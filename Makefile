all: build

vendor-build/react-dom-shared:
	mkdir -p $@

vendor-build/shared:
	mkdir -p $@

vendor-build: vendor-build/react-dom-shared vendor-build/shared
	for flowjs in vendor/react/packages/react-dom/src/shared/*.js ; \
		do npx babel --config-file ./babelrc.json $$flowjs -o vendor-build/react-dom-shared/`basename $$flowjs` ; \
	done
	for flowjs in vendor/react/packages/shared/*.js ; \
		do npx babel --config-file ./babelrc.json $$flowjs -o vendor-build/shared/`basename $$flowjs` ; \
	done
	echo "exports.properties = properties;" >> vendor-build/react-dom-shared/DOMProperty.js

build:
	npm run build

test: build
	npm test

clean:
	rm -rf build dist vendor-build

.PHONEY: all build clean
