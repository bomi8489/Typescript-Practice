const split = (str: string, delim: string = ''): string[] => str.split(delim)

console.log(
    split('hello'),     // ['h', 'e', 'l', 'l', 'o']
    split('h_e_l_l_o', '_') // ['h', 'e', 'l', 'l', 'o']
)