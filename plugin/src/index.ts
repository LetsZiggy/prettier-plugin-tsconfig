import babel from "prettier/plugins/babel.js"
import stripJsonComments from "strip-json-comments"
import { orderGrouped, orderTop } from "./order.js"
import { isKeyOf } from "./types.js"
import type { ObjectExpression, ObjectProperty, Prettify, RecordObjectProperty } from "./types.js"
import type { AST, ParserOptions, Plugin } from "prettier"

const regexpFilepath = /[/\\]?tsconfig\.(?:[\w-]+\.)?json/

function preprocess (text: string, options: Prettify<ParserOptions<unknown>>): string | Promise<string> {
	const { filepath } = options

	return (
		(regexpFilepath.test(filepath) || text.includes('"<<< testfile::prettier-plugin-tsconfig >>>"'))
			? stripJsonComments(text, { whitespace: true, trailingCommas: true })
				.replaceAll(/[\n\r]+/g, "")
				.replaceAll("\t", "")
				.replaceAll(": ", ":")
				.replaceAll(", ", ",")
				.replaceAll("{ ", "{")
				.replaceAll(" }", "}")
				.replaceAll("[ ", "[")
				.replaceAll(" ]", "]")
			: text
	)
}

function parse (text: string, options: Prettify<ParserOptions<unknown>>): AST | Promise<AST> { // eslint-disable-line @typescript-eslint/no-redundant-type-constituents
	const { filepath } = options
	const ast = babel.parsers.json.parse(text, options) as { node: Prettify<ObjectExpression> }

	if (regexpFilepath.test(filepath) || text.includes('"<<< testfile::prettier-plugin-tsconfig >>>"')) {
		const allTopProperties: Prettify<RecordObjectProperty> = Object.fromEntries(ast.node.properties
			.map((topNode: Prettify<ObjectProperty>) => [topNode.key.value, topNode]))
		const topSorted = orderTop
			.map((topKey) => {
				for (const topNode of ast.node.properties) {
					const keyTopNode = topNode.key.value

					if (keyTopNode === topKey) {
						allTopProperties[topKey] = undefined

						if (isKeyOf<keyof typeof orderGrouped>(keyTopNode, orderGrouped)) {
							const allGroupedProperties: Prettify<RecordObjectProperty> = Object.fromEntries(topNode.value.properties
								.map((groupedNode: Prettify<ObjectProperty>) => [groupedNode.key.value, groupedNode]))
							const groupedSorted = orderGrouped[keyTopNode]
								.map((groupedKey) => {
									for (const groupedNode of topNode.value.properties) {
										const keyGroupedNode = groupedNode.key.value

										if (keyGroupedNode === groupedKey) {
											allGroupedProperties[groupedKey] = undefined

											return groupedNode
										}
									}

									return undefined
								})
								.filter((value) => value !== undefined)

							const groupedSortedRemainder = Object.values(allGroupedProperties)
								.filter((value) => value !== undefined)

							topNode.value.properties = [...groupedSorted, ...groupedSortedRemainder]
						}

						return topNode
					}
				}

				return undefined
			})
			.filter((value) => value !== undefined)

		const topSortedRemainder = Object.values(allTopProperties)
			.filter((value) => value !== undefined)

		ast.node.properties = [...topSorted, ...topSortedRemainder]
	}

	return ast
}

export default {
	name: "prettier-plugin-tsconfig",
	parsers: {
		json: {
			...babel.parsers.json,
			preprocess,
			parse,
		},
	},
} as Prettify<Plugin>
