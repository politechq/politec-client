import { __, always, compose, cond, curry, equals, modulo, prop, T } from 'ramda'
import { between } from 'ramda-extension'

const declOfNum = curry((amount: number, wordForms: [string, string, string]): string => {
    const form = prop(__, wordForms)
    const num1 = modulo(Math.abs(amount), 100)
    const num2 = modulo(num1, 10)
    return cond([
      [compose(between(10.01, 19.99), prop(0)), always(form(2))],
      [compose(between(1.01, 4.99), prop(1)), always(form(1))],
      [compose(equals(1), prop(1)), always(form(0))],
      [T, always(form(2))],
    ])([num1, num2])
})

export default declOfNum
