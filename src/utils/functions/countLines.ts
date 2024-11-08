export default function(text: string) {
    return text.match(/\n/).length ?? 0
}