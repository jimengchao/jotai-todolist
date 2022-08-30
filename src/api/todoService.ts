import { COIN_KEY_TYPE } from "@/types";
export interface IForexRates {
  success: boolean,
  base: COIN_KEY_TYPE,
  date: string,
  rates: Partial<Record<COIN_KEY_TYPE, number>>,
}

export const fetchForexRates = () => {
  console.log('fetch')
  return new Promise<IForexRates>((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        base: "USD",
        date: "2022-08-16",
        rates: {
          CNY: 6.781836,
          RUB: 61.263275,
        },
      });
    }, 200);
  })
};
