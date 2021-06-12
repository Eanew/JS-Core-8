const MAX_DIGITS_AFTER_DOT_COUNT = 8

const multiplier = `1` + new Array(MAX_DIGITS_AFTER_DOT_COUNT).fill(0).join(``)

const cut = number => Math.round(number * multiplier) / multiplier

export {
    cut,
}
