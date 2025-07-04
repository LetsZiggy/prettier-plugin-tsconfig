# prettier-plugin-tsconfig

An opinionated `tsconfig.json` formatter plugin for [Prettier](https://prettier.io), based on [prettier-plugin-pkg](https://www.npmjs.com/package/prettier-plugin-pkg).

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

## Acknowledgements

Thanks for [un-ts'](https://github.com/un-ts) original great work of [un-ts/prettier](https://github.com/un-ts/prettier) again.
