"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedJavaScript = void 0;
const akore_1 = require("akore");
const Nodes_1 = require("./Nodes");
class EmbeddedJavaScript extends akore_1.BaseCompetence {
    constructor() {
        super(...arguments);
        this.identifier = '__bdjs__:__embedded_js__';
        this.patterns = {
            foremost: /@/,
            opener: /\{/,
            closer: /\}/,
            inside: /(.*?)/
        };
    }
    resolve(token) {
        if (!token.inside)
            return new Nodes_1.LiteralNode('');
        let inside = token.inside || '';
        const possibles = this.transpiler.tokenize(inside);
        if (possibles.length > 0) {
            for (const matchedToken of possibles) {
                let gotValue = matchedToken.match[0];
                if (matchedToken.inside) {
                    gotValue += `[${matchedToken.inside}]`;
                }
                const transpiled = this.transpiler.transpile(gotValue, false);
                inside = inside.replace(gotValue, transpiled);
            }
        }
        return new Nodes_1.LiteralNode(inside);
    }
}
exports.EmbeddedJavaScript = EmbeddedJavaScript;
