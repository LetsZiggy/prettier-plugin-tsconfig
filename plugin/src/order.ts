export const orderTop = [
	"$schema",
	"extends",
	"files",
	"include",
	"exclude",
	"references",
	"compilerOptions",
	"watchOptions",
	"typeAcquisition",
] as const

export const orderGrouped = {
	compilerOptions: [
		/* "Type Checking" */
		"allowUnreachableCode",
		"allowUnusedLabels",
		"alwaysStrict",
		"exactOptionalPropertyTypes",
		"noFallthroughCasesInSwitch",
		"noImplicitAny",
		"noImplicitOverride",
		"noImplicitReturns",
		"noImplicitThis",
		"noPropertyAccessFromIndexSignature",
		"noUncheckedIndexedAccess",
		"noUnusedLocals",
		"noUnusedParameters",
		"strict",
		"strictBindCallApply",
		"strictBuiltinIteratorReturn",
		"strictFunctionTypes",
		"strictNullChecks",
		"strictPropertyInitialization",
		"useUnknownInCatchVariables",

		/* "Modules" */
		"allowArbitraryExtensions",
		"allowImportingTsExtensions",
		"allowUmdGlobalAccess",
		"baseUrl",
		"customConditions",
		"module",
		"moduleResolution",
		"moduleSuffixes",
		"noResolve",
		"noUncheckedSideEffectImports",
		"paths",
		"resolveJsonModule",
		"resolvePackageJsonExports",
		"resolvePackageJsonImports",
		"rewriteRelativeImportExtensions",
		"rootDir",
		"rootDirs",
		"typeRoots",
		"types",

		/* "Emit" */
		"declaration",
		"declarationDir",
		"declarationMap",
		"downlevelIteration",
		"emitBOM",
		"emitDeclarationOnly",
		"importHelpers",
		"inlineSourceMap",
		"inlineSources",
		"mapRoot",
		"newLine",
		"noEmit",
		"noEmitHelpers",
		"noEmitOnError",
		"outDir",
		"outFile",
		"preserveConstEnums",
		"removeComments",
		"sourceMap",
		"sourceRoot",
		"stripInternal",

		/* "JavaScript Support" */
		"allowJs",
		"checkJs",
		"maxNodeModuleJsDepth",

		/* "Editor Support" */
		"disableSizeLimit",
		"plugins",

		/* "Interop Constraints" */
		"allowSyntheticDefaultImports",
		"erasableSyntaxOnly",
		"esModuleInterop",
		"forceConsistentCasingInFileNames",
		"isolatedDeclarations",
		"isolatedModules",
		"preserveSymlinks",
		"verbatimModuleSyntax",

		/* "Backwards Compatibility" */
		"charset",
		"importsNotUsedAsValues",
		"keyofStringsOnly",
		"noImplicitUseStrict",
		"noStrictGenericChecks",
		"out",
		"preserveValueImports",
		"suppressExcessPropertyErrors",
		"suppressImplicitAnyIndexErrors",

		/* "Language and Environment" */
		"emitDecoratorMetadata",
		"experimentalDecorators",
		"jsx",
		"jsxFactory",
		"jsxFragmentFactory",
		"jsxImportSource",
		"lib",
		"libReplacement",
		"moduleDetection",
		"noLib",
		"reactNamespace",
		"target",
		"useDefineForClassFields",

		/* "Compiler Diagnostics" */
		"diagnostics",
		"explainFiles",
		"extendedDiagnostics",
		"generateCpuProfile",
		"generateTrace",
		"listEmittedFiles",
		"listFiles",
		"noCheck",
		"traceResolution",

		/* "Projects" */
		"composite",
		"disableReferencedProjectLoad",
		"disableSolutionSearching",
		"disableSourceOfProjectReferenceRedirect",
		"incremental",
		"tsBuildInfoFile",

		/* "Output Formatting" */
		"noErrorTruncation",
		"preserveWatchOutput",
		"pretty",

		/* "Completeness" */
		"skipDefaultLibCheck",
		"skipLibCheck",

		/* "Command Line" */

		/* "Watch Options" */
		"assumeChangesOnlyAffectDirectDependencies",
	],
	watchOptions: [
		/* "watchOptions" */
		"watchFile",
		"watchDirectory",
		"fallbackPolling",
		"synchronousWatchDirectory",
		"excludeDirectories",
		"excludeFiles",
	],
	typeAcquisition: [
		/* "typeAcquisition" */
		"enable",
		"include",
		"exclude",
		"disableFilenameBasedTypeAcquisition",
	],
} as const
