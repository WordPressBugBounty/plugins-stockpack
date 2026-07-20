/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/block/index.js":
/*!**********************************!*\
  !*** ./assets/js/block/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: /Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/assets/js/block/index.js: Unexpected token, expected \\\";\\\" (9:21)\\n\\n\\u001b[0m \\u001b[90m  7 | \\u001b[39mregisterBlockType( \\u001b[32m'gutenberg-examples/example-01-basic-esnext'\\u001b[39m\\u001b[33m,\\u001b[39m {\\u001b[0m\\n\\u001b[0m \\u001b[90m  8 | \\u001b[39m\\tedit\\u001b[33m:\\u001b[39m \\u001b[36mfunction\\u001b[39m () {\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m  9 | \\u001b[39m\\t\\t\\u001b[36mreturn\\u001b[39m \\u001b[32m''\\u001b[39m\\u001b[33m<\\u001b[39m\\u001b[33mp\\u001b[39m\\u001b[33m>\\u001b[39m \\u001b[33mHello\\u001b[39m world (from the editor)\\u001b[33m<\\u001b[39m\\u001b[33m/\\u001b[39m\\u001b[33mp\\u001b[39m\\u001b[33m>\\u001b[39m\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m    | \\u001b[39m\\t\\t                   \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 10 | \\u001b[39m\\t}\\u001b[33m,\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 11 | \\u001b[39m\\tsave\\u001b[33m:\\u001b[39m \\u001b[36mfunction\\u001b[39m () {\\u001b[0m\\n\\u001b[0m \\u001b[90m 12 | \\u001b[39m\\t\\t\\u001b[36mreturn\\u001b[39m \\u001b[33m<\\u001b[39m\\u001b[33mp\\u001b[39m\\u001b[33m>\\u001b[39m \\u001b[33mHola\\u001b[39m mundo (from the frontend) \\u001b[33m<\\u001b[39m\\u001b[33m/\\u001b[39m\\u001b[33mp\\u001b[39m\\u001b[33m>\\u001b[39m\\u001b[33m;\\u001b[39m\\u001b[0m\\n    at Parser.raise (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:4047:15)\\n    at Parser.unexpected (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:5378:16)\\n    at Parser.semicolon (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:5362:40)\\n    at Parser.parseReturnStatement (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:7860:12)\\n    at Parser.parseStatementContent (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:7535:21)\\n    at Parser.parseStatement (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:7501:17)\\n    at Parser.parseBlockOrModuleBlockBody (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:8069:23)\\n    at Parser.parseBlockBody (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:8056:10)\\n    at Parser.parseBlock (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:8045:10)\\n    at Parser.parseFunctionBody (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:7153:24)\\n    at Parser.parseFunctionBodyAndFinish (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:7135:10)\\n    at /Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:8221:14\\n    at Parser.withTopicForbiddingContext (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:7425:14)\\n    at Parser.parseFunction (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:8220:10)\\n    at Parser.parseFunctionExpression (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:6582:17)\\n    at Parser.parseExprAtom (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:6486:21)\\n    at Parser.parseExprSubscripts (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:6100:21)\\n    at Parser.parseMaybeUnary (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:6079:21)\\n    at Parser.parseExprOps (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:5964:21)\\n    at Parser.parseMaybeConditional (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:5936:21)\\n    at Parser.parseMaybeAssign (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:5883:21)\\n    at Parser.parseObjectProperty (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:7004:101)\\n    at Parser.parseObjPropValue (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:7029:99)\\n    at Parser.parseObj (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:6940:12)\\n    at Parser.parseExprAtom (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:6483:21)\\n    at Parser.parseExprSubscripts (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:6100:21)\\n    at Parser.parseMaybeUnary (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:6079:21)\\n    at Parser.parseExprOps (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:5964:21)\\n    at Parser.parseMaybeConditional (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:5936:21)\\n    at Parser.parseMaybeAssign (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:5883:21)\\n    at Parser.parseExprListItem (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:7222:18)\\n    at Parser.parseCallExpressionArguments (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:6308:22)\\n    at Parser.parseSubscript (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:6210:32)\\n    at Parser.parseSubscripts (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:6120:19)\\n    at Parser.parseExprSubscripts (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:6110:17)\\n    at Parser.parseMaybeUnary (/Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/node_modules/@babel/parser/lib/index.js:6079:21)\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiIuL2Fzc2V0cy9qcy9ibG9jay9pbmRleC5qcy5qcyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./assets/js/block/index.js\n");

/***/ }),

/***/ 3:
/*!*******************************!*\
  !*** multi ./assets/js/block ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/ionut/Code/Repos/stockpack/stockpack-wp-plugin/stockpack/assets/js/block */"./assets/js/block/index.js");


/***/ })

/******/ });