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
        console.log(token);
        return new Nodes_1.LiteralNode(token.inside);
    }
}
exports.EmbeddedJavaScript = EmbeddedJavaScript;
