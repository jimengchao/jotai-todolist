import { memo } from 'react'
import type { FunctionComponent, ChangeEvent } from 'react'
import { useAtom } from 'jotai'
import { useImmerAtom } from 'jotai/immer'
import { useResetAtom } from 'jotai/utils'
import { ITodoState, COIN_TYPE, COIN_KEY_TYPE, } from '@/types'
import { todoState, addTodo } from '@/store/todo'

const TodoForm: FunctionComponent = () => {
  console.log('TodoForm re-render')
  const [formState, setFormState] = useImmerAtom(todoState)
  const [, setTodoList] = useAtom(addTodo)
  const reset = useResetAtom(todoState)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name: key, value } = e.currentTarget
    setFormState((dart) => {
      dart[key as keyof ITodoState] = value as (unknown & COIN_KEY_TYPE)
    })
  }

  const handleSubmit = () => {
    if (!formState.price || !formState.task || !formState.coinType) {
      alert('请完成选择')
      return;
    }

    setTodoList({ ...formState })
    reset()
  }

  return (
    <div>
      <input className='px-3' placeholder='请输入计划' type="text" value={formState.task} name="task" onChange={handleChange} />
      <input className='mx-3 px-3' placeholder='请输入价格' type="number" value={formState.price || ''} name="price" onChange={handleChange} />
      <select name="coinType" onChange={handleChange}>
        {
          (Object.keys(COIN_TYPE) as COIN_KEY_TYPE[]).map((item) =>
            <option key={item} value={item} label={COIN_TYPE[item]}>{COIN_TYPE[item]}</option>
          )
        }
      </select>
      <button className='text-small px-4 py-1 ml-5' onClick={handleSubmit}>添加</button>
    </div>
  )
}


export default memo(TodoForm)
