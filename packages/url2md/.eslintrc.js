/*
 * @Author: zhangjicheng
 * @Date: 2021-03-03 18:04:27
 * @LastEditTime: 2021-03-03 18:32:27
 * @LastEditors: zhangjicheng
 * @Description: 
 * @FilePath: \cli-lerna\packages\url2md\.eslintrc.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
export default {
	"root": true,
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended"
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 12,
		"sourceType": "module"
	},
	"plugins": [
		"react",
		"@typescript-eslint"
	],
	"rules": {
		"no-var-requires": 0
	}
};
