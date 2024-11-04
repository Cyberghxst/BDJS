import { IParamDef } from "@core/BaseInstruction";
import { Logger } from "@core/Logger";

export default function(args: IParamDef[], compiledArgs: string[], identifier: string) {
    let i = 0;
    for (const arg of args) {
        if (arg.required && compiledArgs[i] === undefined || compiledArgs[i] === '') {
            Logger.warn(`${identifier} expected a value in "${arg.name}"; got nothing instead.`)
        }
        i++;
    }
}