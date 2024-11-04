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
        if (!token.inside) return new LiteralNode('');

        let inside = token.inside || ''
        const possibles = this.transpiler.tokenize(inside)

        if (possibles.length > 0) {
            for (const matchedToken of possibles) {
                let gotValue = matchedToken.match[0]

                if (matchedToken.inside) {
                    gotValue += `[${matchedToken.inside}]`
                }

                const transpiled = this.transpiler.transpile(gotValue, false)

                inside = inside.replace(gotValue, transpiled)
            }
        }

        return new LiteralNode(inside)
    }
}