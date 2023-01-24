const join = (strArray: string[], delim: string = ''): string => strArray.join(delim)

console.log(
    join(['h', 'e', 'l', 'l', 'o']),
    join(['h', 'e', 'l', 'l', 'o'], '_')
)