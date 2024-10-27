/**
 * BDJS Logger class.
 */
export declare class Logger {
    /**
     * Logs a debug message to the stdout.
     * @param args - Debug arguments.
     * @returns {void}
     */
    static debug(...args: string[]): void;
    /**
     * Logs an error to the stdout.
     * @param args - Error arguments.
     * @returns {void}
     */
    static error(...args: string[]): void;
    /**
     * Logs an information message to the stdout.
     * @param args - Information arguments.
     * @returns {void}
     */
    static info(...args: string[]): void;
    /**
     * Logs a warn message to the stdout.
     * @param args - Warn arguments.
     * @returns {void}
     */
    static warn(...args: string[]): void;
}
