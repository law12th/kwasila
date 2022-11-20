module.exports = {
	env: {
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"airbnb-base",
		"airbnb-typescript/base",
		"turbo",
		"plugin:import/errors",
		"plugin:import/warnings",
		"plugin:import/typescript",
		"prettier",
	],
	plugins: ["import", "@typescript-eslint"],
	parserOptions: {
		project: ["./tsconfig.json"],
	},
	settings: {
		"import/parsers": {
			"@typescript-eslint/parser": [".ts"],
		},
		"import/resolver": {
			node: {
				extensions: [".js", ".ts"],
				moduleDirectory: ["node_modules", "src/"],
			},
			typescript: {
				alwaysTryTypes: true,
				project: ".",
			},
		},
	},
	overrides: [
		{
			env: {
				jest: true,
			},
			files: ["**/__tests__/**/*.[jt]s", "**/?(*.)+(spec|test).[jt]s"],
			extends: ["plugin:jest/recommended"],
			rules: {
				"import/no-extraneous-dependencies": [
					"off",
					{ devDependencies: ["**/?(*.)+(spec|test).[jt]s"] },
				],
			},
		},
	],
	rules: {
		"no-unused-vars": "error",
		"no-unreachable": "error",
		"no-invalid-regexp": "warn",
		"no-self-import": "off",
		"no-empty": "error",
		"no-empty-function": "warn",
		"no-magic-numbers": "warn",
		"no-var": "error",
		"prefer-const": "warn",
		"no-multi-spaces": "error",
	},
	ignorePatterns: [
		"**/*.js",
		"node_modules",
		".turbo",
		"dist",
		"coverage",
		"build",
	],
};
