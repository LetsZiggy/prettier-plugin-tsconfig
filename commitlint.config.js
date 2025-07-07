export default {
	"extends": ["@commitlint/config-conventional"],
	"rules": {
		// "body-max-line-length": [2, "always", Number.POSITIVE_INFINITY], // Overwrite
		// "footer-max-line-length": [2, "always", Number.POSITIVE_INFINITY], // Overwrite
		"scope-case": [2, "always", "lower-case"], // Set
	},
}
