"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ascii_table3_1 = require("ascii-table3");
/**
 * Log all commands cached in a command manager.
 * @param manager - The command manager to retrieve the cached commands from.
 * @returns {void}
 */
function default_1(manager) {
    const rows = [];
    const table = new ascii_table3_1.AsciiTable3('Commands');
    table.setHeading('Name', 'Type', 'Status', 'Path')
        .setAlign(2, ascii_table3_1.AlignmentEnum.AUTO)
        .setStyle('compact');
    for (const commandData of manager.cache.values()) {
        rows.push(commandData.loadCommandInfo);
    }
    table.addRowMatrix(rows);
    console.log(table.toString());
}
exports.default = default_1;
