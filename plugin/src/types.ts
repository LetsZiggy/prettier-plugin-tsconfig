import type {
	StringLiteral,
	ArrayExpression as _ArrayExpression,
	ObjectExpression as _ObjectExpression,
	ObjectProperty as _ObjectProperty,
} from "@babel/types"

export type { StringLiteral } from "@babel/types"

export type ArrayExpression = _ArrayExpression & {
	elements: Array<ArrayExpression | ObjectExpression | StringLiteral>,
}

export type ObjectProperty = _ObjectProperty & {
	key: {
		value: string,
	},
	value: ObjectExpression,
}

export type ObjectExpression = _ObjectExpression & {
	properties: ObjectProperty[],
}

export type RecordObjectProperty = Record<string, ObjectProperty | undefined>

export type Prettify<T> = {
	[K in keyof T]: T[K]
} & {}

export function isKeyOf<T extends PropertyKey> (key: PropertyKey, object: object): key is T {
	return (key in object)
}
