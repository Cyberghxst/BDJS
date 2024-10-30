/**
 * Makes an instruction identifier.
 * @param fileName - Instruction file name.
 * @returns {string}
 */
export default function(fileName: string) {
    return 'bdjs:$' + fileName.split('.')[0].split('\\').pop()
}