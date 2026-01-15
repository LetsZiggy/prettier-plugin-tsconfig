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

await test("format tsconfig text", async (_t: TestContext) => {
	let text: string

	try { text = await readFile(path.join(_dirname, "tsconfig.test.json"), { encoding: "utf8" }) }
	catch (error) { text = ""; console.error(error) }

	text = text.replace('"https://json.schemastore.org/tsconfig.json"', '"<<< testfile::prettier-plugin-tsconfig >>>"')
	assert.notStrictEqual(text, "", "cannot find: tsconfig.test.json")

	let expect: string

	try { expect = await readFile(path.join(_dirname, "tsconfig.expect.txt"), { encoding: "utf8" }) }
	catch (error) { expect = ""; console.error(error) }

	assert.notStrictEqual(expect, "", "cannot find: tsconfig.expect.txt")

	let result: string

	try { result = await format(text, config) }
	catch (error) { result = ""; console.error(error) }

	result = result.replace('"<<< testfile::prettier-plugin-tsconfig >>>"', '"https://json.schemastore.org/tsconfig.json"')
	assert.strictEqual(result, expect, "<<< assert.strictEqual(result, expect) >>>")
})
