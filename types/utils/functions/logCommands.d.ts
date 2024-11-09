import { BaseCommandManager } from "../../classes/structures/Command";
/**
 * Log all commands cached in a command manager.
 * @param manager - The command manager to retrieve the cached commands from.
 * @returns {void}
 */
export default function <Types extends string>(manager: BaseCommandManager<Types>): void;
