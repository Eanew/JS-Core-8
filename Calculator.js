const DIVISION_BY_ZERO_ERROR = `Division by zero is not possible`
const INPUT_NODE_NAME = `INPUT`
const DOT = `.`
const SPACE = ` `

const Operator = {
    DOT,
    PLUS: `+`,
    MINUS: `-`,
    MULTIPLY: `*`,
    DIVIDE: `/`,
    RESULT: `=`,
    RESET: `Backspace`,
}

const Calculator = class {
    #value = `0`
    #input = null
    #dot = false
    #operator = null
    #error = null
    #screen
    #handler

    constructor(screenElement, outputHandler) {
        if (screenElement instanceof Element && screenElement.nodeName === INPUT_NODE_NAME) this.#screen = screenElement
        if (typeof outputHandler === `function`) this.#handler = outputHandler
    }
    
    display() {
        if (!this.#screen) return

        if (this.#error) {
            this.#screen.value = this.#error
            this.#screen.style.fontSize = `20px`
            return
        }

        if (this.#operator === null) {
            this.#screen.value = this.#input !== null ? this.#input : this.#value
            this.#screen.scrollLeft += 20
            return
        }

        this.#screen.value = `${this.#value} ${this.#operator} ${this.#input || ``}`
        this.#screen.scrollLeft += 20
    }
    
    enter(symbol) {
        if (symbol === SPACE) return

        if (this.#error) {
            this.#error = null
            this.#screen.style.fontSize = ``
        }
        
        if (symbol >= 0 && symbol <= 9) {
            if (this.#operator !== null) {
                this.#input = (Number(this.#input) || this.#dot) ? (this.#input || ``) + symbol : String(symbol)
            } else {
                this.#value = (Number(this.#value) || this.#dot) ? (this.#value || ``) + symbol : String(symbol)
            }
            return this.display()
        }
        
        if (!Object.values(Operator).includes(symbol)) return

        switch (symbol) {
            case Operator.RESULT:
                this.count()
                this.#dot = this.#value.indexOf(DOT) === -1 ? false : true
                break

            case Operator.DOT:
                if (this.#dot) return

                if (this.#operator !== null) {
                    this.#input = this.#input === null ? 0 + DOT : this.#input + DOT
                } else {
                    this.#value = this.#value === null ? 0 + DOT : this.#value + DOT
                }
                this.#dot = true
                break

            case Operator.RESET:
                this.reset(true)
                break
            
            default:
                this.count()
                if (!this.#error) this.#operator = symbol
        }
        this.display()
    }

    count() {
        let result

        if (this.#input !== null) {
            switch (this.#operator) {
                case Operator.PLUS:
                    result = +this.#value + +this.#input
                    break

                case Operator.MINUS:
                    result = this.#value - this.#input
                    break

                case Operator.MULTIPLY:
                    result = this.#value * this.#input
                    break

                case Operator.DIVIDE:
                    if (this.#input == 0) return this.fail(DIVISION_BY_ZERO_ERROR)
                    result = this.#value / this.#input
                    break

            }
        } else {
            result = +this.#value
        }

        this.#value = String((typeof this.#handler === `function`) ? this.#handler(result) : result)
        this.reset()
    }

    reset(full = false) {
        if (full) this.#value = `0`
        this.#input = null
        this.#dot = false
        this.#operator = null
        this.#error = null
    }

    fail(error) {
        this.reset(true)
        this.#error = error
    }
}

export { Operator }
export default Calculator
