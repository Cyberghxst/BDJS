"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
function default_1(text) {
    return text.match(/\n/).length ?? 0;
}
