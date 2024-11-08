"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const countLines_1 = __importDefault(require("./countLines"));
function default_1(content, tokens) {
    for (const token of tokens) {
        const image = token.match[0] + (token.inside ? `[${token.inside}]` : '');
        const transpiled = this.transpile(image, false);
        const lines = (0, countLines_1.default)(transpiled);
        content = content.replace(image, lines === 0 ? transpiled : '');
    }
    return content;
}
