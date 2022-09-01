import { useState, useEffect, useMemo, useCallback } from 'react'
import type { FunctionComponent, ChangeEvent } from 'react'
import produce from "immer"
import { calcForexRates, calcTodoTotal } from '@/store/todo'
import { fetchForexRates, } from '@/api/todoService'
import { ITodoListState, COIN_KEY_TYPE, ITodoFormState } from '@/types'
import TodoForm from './TodoForm'
import TodoItem from './TodoItem'
import Total from './TodoTotal'

let id = 0;
const defaultData: ITodoFormState = {
  task: '',
  price: null,
  coinType: 'USD',
}


const TodoList: FunctionComponent = () => {

  const [formState, setFormState] = useState(defaultData);

  const [todoList, setTodoList] = useState<ITodoListState[]>([]);

  const [rates, setRates] = useState<Partial<Record<COIN_KEY_TYPE, number>>>({})

  useEffect(() => {
    const getRates = async () => {
      let result = await fetchForexRates();
      setRates({
        ...result.rates,
        [result.base]: 1
      })
    }

    getRates()
  }, [])

  const planList = useMemo(() => todoList.filter(todo => !todo.done), [todoList])

  const doneList = useMemo(() => todoList.filter(todo => todo.done), [todoList])

  const planTotal = useMemo(() => calcTodoTotal(planList), [planList])

  const doneTotal = useMemo(() => calcTodoTotal(doneList), [doneList])

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name: key, value } = e.currentTarget

    if (!value.trim()) return;

    setFormState(
      produce<ITodoFormState>(drat => {
        drat[key as keyof ITodoFormState] = value as (unknown & COIN_KEY_TYPE)
      })
    )


  }, [formState])

  const handleSubmit = useCallback(() => {
    if (!formState.price || !formState.task || !formState.coinType) {
      alert('请完成选择')
      return;
    }

    setTodoList(
      produce<ITodoListState[]>(drat => {
        drat.push({
          ...formState,
          id: ++id,
          rub: calcForexRates(Number(formState.price), rates[formState.coinType], rates.RUB),
          cny: calcForexRates(Number(formState.price), rates[formState.coinType], rates.CNY),
          usd: calcForexRates(Number(formState.price), rates[formState.coinType], rates.USD),
        })
      })
    )

    setFormState({ ...defaultData })
  }, [formState])

  const onTodoChange = useCallback((todo: ITodoListState) => {
    setTodoList(
      produce<ITodoListState[]>(drat => {
        let item = drat.find(item => item.id === todo.id) as ITodoListState
        item.done = !item.done
      })
    )
  }, [todoList])

  const onTodoDelete = (todo: ITodoListState) => {
    setTodoList(todoList.filter(item => item.id !== todo.id))
  }

  return (
    <div>
      <TodoForm formData={formState} onChange={handleChange} onSubmit={handleSubmit} />
      <div className='text-right my-2'>
        <span>{calcForexRates(1, rates.CNY, rates.RUB)}₽/￥</span>
        <span className='ml-10'>{calcForexRates(1, rates.USD, rates.RUB)}₽/$</span>
        <span className='ml-10'>{calcForexRates(1, rates.USD, rates.CNY)}￥/$</span>
      </div>

      <div className='mb-10'>
        <div className='mb-2'>计划</div>
        {
          planList.map((item) => <TodoItem key={item.id} todo={item} onChange={onTodoChange} onDelete={onTodoDelete} />)
        }
        <div className='flex'>
          <div>将要花费：</div>
          <div className="flex-1">
            <Total total={planTotal} />
          </div>
        </div>
      </div>

      <div>
        <div className='mb-2'>已完成</div>
        {
          doneList.map((item) => <TodoItem key={item.id} todo={item} onChange={onTodoChange} onDelete={onTodoDelete} />)
        }
        <div className='flex'>
          <div>一共花了：</div>
          <div className="flex-1">
            <Total total={doneTotal} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoList
