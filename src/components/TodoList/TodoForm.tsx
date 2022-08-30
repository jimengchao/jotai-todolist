import { useState, memo } from 'react'
import type { FunctionComponent, ChangeEvent } from 'react'
import { ITodoFormState, COIN_TYPE, COIN_KEY_TYPE, ITodoListState, } from '@/types'

interface IProps {
  addTodo: (formState: ITodoListState) => void
}

let id = 0;
const defaultData: ITodoFormState = {
  task: '',
  price: null,
  coinType: 'USD',
}

const TodoForm: FunctionComponent<IProps> = ({ addTodo }: IProps) => {
  console.log('TodoForm re-render')
  const [formState, setFormState] = useState(defaultData);
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name: key, value } = e.currentTarget

    if (!value.trim()) return;

    setFormState({
      ...formState,
      [key]: value
    })
  }

  const handleSubmit = () => {
    if (!formState.price || !formState.task || !formState.coinType) {
      alert('请完成选择')
      return;
    }

    addTodo({ ...formState, id: ++id })
    setFormState({ ...defaultData })

  }

  return (
    <div className='text-black'>
      <input className='px-3 ' placeholder='请输入计划' type="text" value={formState.task} name="task" onChange={handleChange} />
      <input className='mx-3 px-3 decoration-black' placeholder='请输入价格' type="number" value={formState.price || ''} name="price" onChange={handleChange} />
      <select name="coinType" onChange={handleChange} className="decoration-black">
        {
          (Object.keys(COIN_TYPE) as COIN_KEY_TYPE[]).map((item) =>
            <option key={item} value={item} label={COIN_TYPE[item]}>{COIN_TYPE[item]}</option>
          )
        }
      </select>
      <button className='text-small px-4 py-1 ml-5 text-white' onClick={handleSubmit}>添加</button>
    </div>
  )
}


export default memo(TodoForm)
