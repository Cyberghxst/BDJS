import color from 'cli-color'

/**
 * BDJS Logger class.
 */
export class Logger {
    /**
     * Logs a debug message to the stdout.
     * @param args - Debug arguments.
     * @returns {void}
     */
    static debug(...args: string[]) {
        console.log('🐛', `${color.blue('BDJS') + ':' + color.cyan('DEBUG')}`, '|', color.blue(args))
    }

    /**
     * Logs an error to the stdout.
     * @param args - Error arguments.
     * @returns {void}
     */
    static error(...args: string[]) {
        console.error('❌', `${color.blue('BDJS') + ':' + color.red('ERROR')}`, '|', color.magentaBright(args))
    }

    /**
     * Logs an information message to the stdout.
     * @param args - Information arguments.
     * @returns {void}
     */
    static info(...args: string[]) {
        console.info('ℹ', `${color.blue('BDJS') + ':' + color.cyan('INFO')}`, '|', color.green(args))
    }

    /**
     * Logs a warn message to the stdout.
     * @param args - Warn arguments.
     * @returns {void}
     */
    static warn(...args: string[]) {
        console.warn('⚠️ ', `${color.blue('BDJS') + ':' + color.yellowBright('WARN')}`, '|', color.yellow(args))
    }
}