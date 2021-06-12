import { cut } from "./util.js"
import Calculator, { Operator } from "./Calculator.js"

const calculatorElement = document.querySelector(`.calculator__body`)
const screenElement = document.querySelector(`.calculator__screen`)
const calculator = new Calculator(screenElement, cut)

calculatorElement.addEventListener(`click`, evt => {
    if (evt.target.classList.contains(`calculator__button`)) calculator.enter(evt.target.value)
})

document.addEventListener(`keydown`, evt => {
    if (evt.key >= 0 && evt.key <= 9 || Object.values(Operator).includes(evt.key)) {
        evt.preventDefault()
        calculator.enter(evt.key)
    }
})
