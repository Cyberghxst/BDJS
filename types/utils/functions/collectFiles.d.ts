/**
 * Collect the files inside the desired directory.
 * @param {string} dir - The directory to load files from.
 * @returns {ICollectedFile[]}
 */
export declare function collectFiles(dir: string, extension?: `.${string}`): ICollectedFile[];
/**
 * Structure that represents a collected file.
 */
export interface ICollectedFile {
    name: string;
    extension: `.${string}`;
    dir: string;
}
