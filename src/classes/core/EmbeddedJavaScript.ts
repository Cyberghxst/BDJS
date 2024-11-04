import { BaseCompetence, Token } from 'akore'
import { Transpiler } from './Transpiler'
import { LiteralNode } from './Nodes'

export class EmbeddedJavaScript extends BaseCompetence<Transpiler> {
    public identifier = '__bdjs__:__embedded_js__'
    public patterns = {
        foremost: /@/,
        opener: /\{/,
        closer: /\}/,
        inside: /(.*?)/
    }
    resolve(token: Token<Transpiler>) {
        return new LiteralNode(token.inside)
    }
}