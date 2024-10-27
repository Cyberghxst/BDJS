"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const cli_color_1 = __importDefault(require("cli-color"));
/**
 * BDJS Logger class.
 */
class Logger {
    /**
     * Logs a debug message to the stdout.
     * @param args - Debug arguments.
     * @returns {void}
     */
    static debug(...args) {
        console.log('🐛', `${cli_color_1.default.blue('BDJS') + ':' + cli_color_1.default.cyan('DEBUG')}`, '|', cli_color_1.default.blue(args));
    }
    /**
     * Logs an error to the stdout.
     * @param args - Error arguments.
     * @returns {void}
     */
    static error(...args) {
        console.error('❌', `${cli_color_1.default.blue('BDJS') + ':' + cli_color_1.default.red('ERROR')}`, '|', cli_color_1.default.magentaBright(args));
    }
    /**
     * Logs an information message to the stdout.
     * @param args - Information arguments.
     * @returns {void}
     */
    static info(...args) {
        console.info('ℹ', `${cli_color_1.default.blue('BDJS') + ':' + cli_color_1.default.cyan('INFO')}`, '|', cli_color_1.default.green(args));
    }
    /**
     * Logs a warn message to the stdout.
     * @param args - Warn arguments.
     * @returns {void}
     */
    static warn(...args) {
        console.warn('⚠️ ', `${cli_color_1.default.blue('BDJS') + ':' + cli_color_1.default.yellowBright('WARN')}`, '|', cli_color_1.default.yellow(args));
    }
}
exports.Logger = Logger;
