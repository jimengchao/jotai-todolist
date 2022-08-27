import type { FunctionComponent } from 'react'
import { useAtom, useSetAtom } from 'jotai'
import TodoForm from './TodoForm'
import TodoItem from './TodoItem'
import Total from './TodoTotal'
import { doneTodoList, planTodoList, forexRates, calcForexRates, todoChange, todoDelete, useTotal } from '../../store/todo'

const TodoList: FunctionComponent = () => {
  console.log('TodoList re-render')
  const [rates] = useAtom(forexRates)
  const [planList] = useAtom(planTodoList)
  const [doneList] = useAtom(doneTodoList)
  const planTotal = useTotal(planList)
  const doneTotal = useTotal(doneList)
  const onTodoChange = useSetAtom(todoChange)
  const onTodoDelete = useSetAtom(todoDelete)


  return (
    <div>
      <TodoForm />
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
