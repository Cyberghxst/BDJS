"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectFiles = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
/**
 * Collect the files inside the desired directory.
 * @param {string} dir - The directory to load files from.
 * @returns {ICollectedFile[]}
 */
function collectFiles(dir, extension = '.js') {
    const collected = [];
    const files = (0, fs_1.readdirSync)(dir);
    for (const file of files) {
        const info = (0, fs_1.lstatSync)((0, path_1.join)(dir, file));
        if (info.isDirectory()) {
            collected.push(...collectFiles((0, path_1.join)(dir, file), extension));
            continue;
        }
        if (file.endsWith(extension)) {
            const extension = '.' + file.split('.').pop();
            const name = file.replace(extension, '').split('\\').pop();
            const path = (0, path_1.join)(dir, file);
            collected.push({ name, extension, dir: path });
        }
    }
    return collected;
}
exports.collectFiles = collectFiles;
