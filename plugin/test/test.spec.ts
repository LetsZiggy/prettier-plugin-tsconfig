import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import path from "node:path"
import { test } from "node:test"
import { fileURLToPath } from "node:url"
import { format } from "prettier"
import config from "./prettier.config.test.js"
import type { TestContext } from "node:test"

const _dirname = (typeof __dirname === "undefined")
	? path.dirname(fileURLToPath(import.meta.url))
	: __dirname

await test("format tsconfig text", async (t: TestContext) => {
	const text = await readFile(path.join(_dirname, "tsconfig.test.json"), { encoding: "utf8" })
	.then((v) => v.replace('"https://json.schemastore.org/tsconfig.json"', '"<<< testfile::prettier-plugin-tsconfig >>>"'))
	.catch((error) => { console.error(error); return "" }) // eslint-disable-line @stylistic/padding-line-between-statements

	assert.notStrictEqual(text, "", "cannot find: tsconfig.test.json")

	const expect = await readFile(path.join(_dirname, "tsconfig.expect.txt"), { encoding: "utf8" })
	.catch((error) => { console.error(error); return "" }) // eslint-disable-line @stylistic/padding-line-between-statements

	assert.notStrictEqual(expect, "", "cannot find: tsconfig.expect.txt")

	const result = await format(text, config)
	.then((v) => v.replace('"<<< testfile::prettier-plugin-tsconfig >>>"', '"https://json.schemastore.org/tsconfig.json"'))
	.catch((error) => { console.error(error); return "" }) // eslint-disable-line @stylistic/padding-line-between-statements

	assert.strictEqual(result, expect, "<<< assert.strictEqual(result, expect) >>>")
})
