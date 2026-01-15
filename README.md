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
### Sorting

Top-level keys are sorted according to the order they appear in [TSConfig reference](https://www.typescriptlang.org/tsconfig/) except for `$schema`, if present, will the be the first key, and `extends`, if present, will be shifted up before the other top-level keys. Known keys, and their order are

<details>
<summary>Expand</summary>

```jsonc
[
	"$schema",
	"extends",
	"files",
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
]
```

</details>

`watchOptions` keys are sorted according to the order they appear in [TSConfig `watchOptions` reference](https://www.typescriptlang.org/tsconfig/#watchOptions). Known keys, and their order are

<details>
<summary>Expand</summary>

```jsonc
[
	/* "watchOptions" */
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

<details>
<summary>Expand</summary>

```jsonc
[
	/* "typeAcquisition" */
	"enable",
	"include",
	"exclude",
	"disableFilenameBasedTypeAcquisition",
]
```

</details>

Unknown keys, or keys not part of the list above, will be alphabetically sorted and added to the end of the file.
<!-- webscraping::end -->

## Acknowledgements

- [prettier-plugin-pkg](https://github.com/un-ts/prettier/tree/master/packages/pkg) by [un-ts](https://github.com/un-ts)
