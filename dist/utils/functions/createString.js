"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
/**
 * Generates a random string.
 * @param length - The length of the string.
 * @returns {string}
 */
function default_1(length = 15) {
    let cache = '';
    while (cache.length < length) {
        cache += (0, crypto_1.randomUUID)().replace(/[\d+-]/g, '');
    }
    return cache.slice(0, length);
}
exports.default = default_1;
