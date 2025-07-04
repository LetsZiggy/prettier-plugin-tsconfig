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

Filenames must satisfy `/tsconfig\.(?:[\w-]*\.)?json/` regex.

## Rules

This plugin enforces its own set of opinionated rules:

<!-- webscraping::start -->
### Sorting

Top-level keys are sorted according to the order they appear in [TSConfig reference](https://www.typescriptlang.org/tsconfig/). Known keys, and their order are

<details>
<summary>Expand</summary>

```jsonc
[
	// schema definition
	"$schema",

	// top level
	"files",
	"extends",
	"include",
	"exclude",
	"references",
	"compilerOptions",
	"watchOptions",
	"typeAcquisition",
]
```

</details>

`compilerOptions` keys are sorted according to the order they appear in [TSConfig `compilerOptions` reference](https://www.typescriptlang.org/tsconfig/#compilerOptions). Known keys, and their order are

<details>
<summary>Expand</summary>

```jsonc
[
	// type checking
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

	// modules
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

	// emit
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

	// javascript support
	"allowJs",
	"checkJs",
	"maxNodeModuleJsDepth",

	// editor support
	"disableSizeLimit",
	"plugins",

	// interop constraints
	"allowSyntheticDefaultImports",
	"erasableSyntaxOnly",
	"esModuleInterop",
	"forceConsistentCasingInFileNames",
	"isolatedDeclarations",
	"isolatedModules",
	"preserveSymlinks",
	"verbatimModuleSyntax",

	// backwards compatibility
	"charset",
	"importsNotUsedAsValues",
	"keyofStringsOnly",
	"noImplicitUseStrict",
	"noStrictGenericChecks",
	"out",
	"preserveValueImports",
	"suppressExcessPropertyErrors",
	"suppressImplicitAnyIndexErrors",

	// language and environment
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

	// compiler diagnostics
	"diagnostics",
	"explainFiles",
	"extendedDiagnostics",
	"generateCpuProfile",
	"generateTrace",
	"listEmittedFiles",
	"listFiles",
	"noCheck",
	"traceResolution",

	// projects
	"composite",
	"disableReferencedProjectLoad",
	"disableSolutionSearching",
	"disableSourceOfProjectReferenceRedirect",
	"incremental",
	"tsBuildInfoFile",

	// output formatting
	"noErrorTruncation",
	"preserveWatchOutput",
	"pretty",

	// completeness
	"skipDefaultLibCheck",
	"skipLibCheck",

	// command line

	// watch options
	"assumeChangesOnlyAffectDirectDependencies",
]
```

</details>

`watchOptions` keys are sorted according to the order they appear in [TSConfig `watchOptions` reference](https://www.typescriptlang.org/tsconfig/#watchOptions). Known keys, and their order are

<details>
<summary>Expand</summary>

```jsonc
[
	"watchFile",
	"watchDirectory",
	"fallbackPolling",
	"synchronousWatchDirectory",
	"excludeDirectories",
	"excludeFiles",
]
```

</details>

`typeAcquisition` keys are sorted according to the order they appear in [TSConfig `typeAcquisition` reference](https://www.typescriptlang.org/tsconfig/#typeAcquisition). Known keys, and their order are

```jsonc
[
	"enable",
	"include",
	"exclude",
	"disableFilenameBasedTypeAcquisition",
]
```

Unknown keys, or keys not part of the list above, will be alphabetically sorted and added to the end of the file.
<!-- webscraping::end -->

## Acknowledgements

Thanks for [un-ts'](https://github.com/un-ts) original great work of [un-ts/prettier](https://github.com/un-ts/prettier) again.
