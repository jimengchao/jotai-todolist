import { memo, FunctionComponent } from 'react'

interface Props {
  total: { rub: number, cny: number, usd: number }
}

const TotalTotal: FunctionComponent<Props> = (props) => {
  const total = props.total
  return <>
    <div className='flex justify-end'>
      <div className="basis-28 text-right">
        ₽{total.rub}
      </div>
      <div className="basis-28 text-right">
        ¥{total.cny}
      </div>
      <div className="basis-28 text-right">
        ${total.usd}
      </div>
    </div>
  </>
}


export default memo(TotalTotal)
