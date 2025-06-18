export const consoleRed = (text: string) =>
    `\x1b[31m${text}\x1b[0m`
export const consoleGreen = (text: string) =>
    `\x1b[32m${text}\x1b[0m`
export const consoleYellow = (text: string) =>
    `\x1b[33m${text}\x1b[0m`
export const consoleDarkBlue = (text: string) =>
    `\x1b[34m${text}\x1b[0m`
export const consolePurple = (text: string) =>
    `\x1b[35m${text}\x1b[0m`
export const consoleBlue = (text: string) =>
    `\x1b[36m${text}\x1b[0m`

export const printMessage = (title: string, text?: string) => {
    const time = new Date().toLocaleTimeString();
    console.log(`${consoleDarkBlue(time)} ${consolePurple(title)} ${text ? consoleYellow(text) : ''}`)
}

export const printError = (title: string, text) => {
    const time = new Date().toLocaleTimeString();
    console.log(`${consoleDarkBlue(time)} ${consoleRed(title)} ${consoleYellow(text)}`)
}