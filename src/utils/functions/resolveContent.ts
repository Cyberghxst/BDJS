import { Transpiler } from '@core/Transpiler'
import countLines from './countLines'
import { Token } from 'akore'

export default function(this: Transpiler, content: string, tokens: Token<Transpiler>[]) {
    for (const token of tokens) {
        const image = token.match[0] + (token.inside ? `[${token.inside}]` : '')

        const transpiled = this.transpile(image, false)
        const lines = countLines(transpiled)

        content = content.replace(image, lines === 0 ? transpiled : '')
    }

    return content
}