BUILD_DIR         = build
UNINSTALL_TARGETS = node_modules package-lock.json
CLEAN_TARGETS     = $(BUILD_DIR)

.DEFAULT_GOAL = dev

.PHONY: install uninstall dev debug build serve deploy clean help

install:
	@npm install --loglevel verbose --no-fund

uninstall:
	rm -rf $(UNINSTALL_TARGETS)

dev:
	@VITE_DEBUG=true npx vite

build:
	@VITE_BUILD_DIR=$(BUILD_DIR) npx vite build

serve: build
	@npx vite preview

deploy: build
	npx gh-pages -d $(BUILD_DIR)

clean:
	rm -rf $(CLEAN_TARGETS)
