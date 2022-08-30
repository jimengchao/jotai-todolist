import { atom, Atom, useAtomValue } from 'jotai'
import { atomWithReset, selectAtom } from 'jotai/utils'
import { ITodoState, ITodoForm } from '../types'
import { fetchForexRates } from '../api/todoService'

export const calcForexRates = (price: number, form = 0, to = 0, fixed = 6) => {
  return Number((price / form * to).toFixed(fixed))
}

export const forexRates = atom(async () => {
  let result = await fetchForexRates();
  return {
    ...result.rates,
    [result.base]: 1
  };
})

let id = 0;
export const todoState = atomWithReset<ITodoState>({
  task: '',
  price: null,
  coinType: 'USD',
})

export const todoList = atom<ITodoForm[]>([])

export const todoChange = atom(null, (get, set, update: ITodoForm) => {
  set(todoList, (prev): ITodoForm[] => {
    return prev.map(item => {
      item.id === update.id && (item.done = !item.done)
      return item;
    })
  })
})

export const todoDelete = atom(null, (get, set, update: ITodoForm) => {
  set(todoList, (prev): ITodoForm[] => prev.filter(item => item.id !== update.id))
})


export const planTodoList = selectAtom(todoList, (todo) => todo.filter(item => !item.done));

export const doneTodoList = selectAtom(todoList, (todo) => todo.filter(item => item.done));

export const useTotal = function <T extends ITodoForm[]>(list: T) {
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
