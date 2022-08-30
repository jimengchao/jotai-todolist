
export enum COIN_TYPE {
  "USD" = "美元",
  "CNY" = "人民币",
  "RUB" = "卢布"
}

export type COIN_KEY_TYPE = keyof typeof COIN_TYPE

export interface ITodoFormProps {
  onSubmit: (todo: ITodoFormState) => void
}

export interface ITodoFormState {
  task: string,
  price: string | null,
  coinType: COIN_KEY_TYPE,
}

export interface ITodoListState extends ITodoFormState {
  id: number,
  done?: boolean
  rub?: number,
  cny?: number,
  usd?: number,
}

