# prettier-plugin-tsconfig

An opinionated `tsconfig.json` formatter plugin for [Prettier](https://prettier.io).

Prettier is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing, taking various rules into account.

## Installation

```bash
# npm
npm install --save-dev LetsZiggy/prettier-plugin-tsconfig

# pnpm
pnpm add --save-dev LetsZiggy/prettier-plugin-tsconfig
```

## Usage

Once installed, [Prettier plugins](https://prettier.io/docs/en/plugins.html) must be added to `.prettierrc`:

```json
{
	"plugins": ["prettier-plugin-tsconfig"],
}
```

Then:

```bash
# npx
npx prettier --write tsconfig.json

# pnpm
pnpm exec prettier --write tsconfig.json
```

Filenames must satisfy `/tsconfig\.(?:[\w-]+\.)?json/` regex.

- Examples
	- `tsconfig.json`
	- `tsconfig.test.json`
	- `tsconfig.test_00.json`
	- `tsconfig.test-00.json`

## Rules

This plugin enforces its own set of opinionated rules:

<!-- webscraping::start -->
<!-- webscraping::end -->

## Acknowledgements

- [prettier-plugin-pkg](https://github.com/un-ts/prettier/tree/master/packages/pkg) by [un-ts](https://github.com/un-ts)
