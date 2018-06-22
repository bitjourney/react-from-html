all: build

build/react-dom-shared:
	mkdir -p $@

build/shared:
	mkdir -p $@

build: build/react-dom-shared build/shared
	for flowjs in vendor/react/packages/react-dom/src/shared/*.js ; \
		do npx babel --config-file ./babelrc.json $$flowjs -o build/react-dom-shared/`basename $$flowjs` ; \
	done
	for flowjs in vendor/react/packages/shared/*.js ; \
		do npx babel --config-file ./babelrc.json $$flowjs -o build/shared/`basename $$flowjs` ; \
	done

.PHONEY: all build
