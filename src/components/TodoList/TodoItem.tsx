import { memo } from "react";
import type { FunctionComponent } from 'react'
import { ITodoForm } from "@/types";

interface Props {
  todo: ITodoForm,
  onChange: (todo: ITodoForm) => void
}

const TodoItem: FunctionComponent<Props> = (props: Props) => {
  const todo = props.todo;
  return <div className="flex py-3 border-b-1">
    <div className="basis-8">
      <input type="checkbox" checked={todo.done} onChange={() => props.onChange(todo)} />
    </div>
    <div className="flex-1">
      {todo.task}
    </div>
    <div className="basis-28 text-right">
      ₽{todo.rub}
    </div>
    <div className="basis-28 text-right">
      ¥{todo.cny}
    </div>
    <div className="basis-28 text-right">
      ${todo.usd}
    </div>
  </div>
}

export default memo(TodoItem)
