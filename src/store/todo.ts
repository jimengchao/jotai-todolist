import { ITodoListState } from '@/types'
export const calcForexRates = (price: number, form = 0, to = 0, fixed = 6) => {
  return Number((price / form * to).toFixed(fixed))
}

export const calcTodoTotal = function <T extends ITodoListState[]>(list: T) {
  return list.reduce((current, item) => {
    current.cny += item.cny!;
    current.usd += item.usd!;
    current.rub += item.rub!;
    return current
  }, {
    cny: 0,
    usd: 0,
    rub: 0
  })
}
