import { createStore } from "https://framer.com/m/framer/store.js@^1.0.0"

export const useStore = createStore({
    amount: 1,
    time: 1,
    rate: 4,
    completionFee: 0,
    totalInterest: 0,
    totalPayable: 0,
    totalMonthly: 0,
})
