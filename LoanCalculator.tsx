import type { ComponentType } from "react"
import { useEffect } from "react"
import { useStore } from "./state.jsx"

export function wihtPrinciple(Component): ComponentType {
    return (props) => {
        const [store, setStore] = useStore()
        return <Component {...props} />
    }
}
export function withLoanAmount(Component): ComponentType {
    return (props) => {
        const [store, setStore] = useStore()
        return (
            <Component
                {...props}
                text={`$${parseFloat(store?.amount)
                    .toFixed(2)
                    .toString()}`}
            />
        )
    }
}
export function withInterest(Component): ComponentType {
    return (props) => {
        const [store, setStore] = useStore()
        const calculateInterest = () => {
            const principle = parseFloat(store?.amount)
            const rate = parseFloat(store?.rate)
            const time = parseFloat(store?.time)
            const totalInterest = (principle * rate * time) / 100
            return totalInterest
        }

        const totalInterest = calculateInterest()

        useEffect(() => {
            setStore((prev) => ({ ...prev, totalInterest }))
        }, [totalInterest])
        return <Component {...props} text={`$${totalInterest.toFixed(2)}`} />
    }
}
export function withCompletionFee(Component): ComponentType {
    return (props) => {
        const [store, setStore] = useStore()
        const completionFee = parseFloat(store.amount) * 0.05
        useEffect(() => {
            setStore((prev) => ({ ...prev, completionFee }))
        }, [completionFee])
        return (
            <Component
                {...props}
                text={`$${completionFee.toFixed(2).toString()}`}
            />
        )
    }
}
export function withTotalPayment(Component): ComponentType {
    return (props) => {
        const [store, setStore] = useStore()
        const totalPayable =
            parseFloat(store?.totalInterest) +
            parseFloat(store?.amount) +
            parseFloat(store?.completionFee)
        useEffect(() => {
            setStore((prev) => ({ ...prev, totalPayable }))
        }, [totalPayable])
        return (
            <Component
                {...props}
                text={`$${totalPayable.toFixed(2).toString()}`}
            />
        )
    }
}

export function wihtMonthly(Component): ComponentType {
    return (props) => {
        const [store, setStore] = useStore()
        const monthly = parseFloat(store.totalPayable) / parseFloat(store.time)

        useEffect(() => {
            setStore((prev) => ({ ...prev, monthly }))
        }, [monthly])
        return (
            <Component
                {...props}
                text={`$${monthly.toFixed(2).toString() || 0}`}
            />
        )
    }
}
