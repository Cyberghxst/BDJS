import { BaseCompetence, Token } from 'akore';
import { Transpiler } from './Transpiler';
import { LiteralNode } from './Nodes';
export declare class EmbeddedJavaScript extends BaseCompetence<Transpiler> {
    identifier: string;
    patterns: {
        foremost: RegExp;
        opener: RegExp;
        closer: RegExp;
        inside: RegExp;
    };
    resolve(token: Token<Transpiler>): LiteralNode;
}
