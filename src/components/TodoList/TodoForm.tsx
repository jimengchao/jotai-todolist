import { useState, memo } from 'react'
import type { FunctionComponent, ChangeEvent } from 'react'
import { ITodoFormState, COIN_TYPE, COIN_KEY_TYPE, ITodoListState, } from '@/types'

interface IProps {
  formData: ITodoFormState
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onSubmit: () => void
}

const TodoForm: FunctionComponent<IProps> = ({ formData, onChange, onSubmit }: IProps) => {

  return (
    <div className='text-black'>
      <input className='px-3 ' placeholder='请输入计划' type="text" value={formData.task} name="task" onChange={onChange} />
      <input className='mx-3 px-3 decoration-black' placeholder='请输入价格' type="number" value={formData.price || ''} name="price" onChange={onChange} />
      <select name="coinType" onChange={onChange} className="decoration-black">
        {
          (Object.keys(COIN_TYPE) as COIN_KEY_TYPE[]).map((item) =>
            <option key={item} value={item} label={COIN_TYPE[item]}>{COIN_TYPE[item]}</option>
          )
        }
      </select>
      <button className='text-small px-4 py-1 ml-5 text-white' onClick={onSubmit}>添加</button>
    </div>
  )
}


export default memo(TodoForm)
