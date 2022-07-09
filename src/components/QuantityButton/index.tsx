import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import './QuantityButton.scss'

type Props = {
    value: number,
    onChange: (value: number) => void,
}

const QuantityButton = (props: Props) => {
    const { value, onChange } = props

    const handleAddAmount = () => {
        onChange(value + 1)
    }

    const handleMinusAmount = () => {
        if (value > 1) {
            onChange(value - 1)
        }
    }

    return (
        <div className="quantity-button">
            <FaMinus onClick={handleMinusAmount} />
            <span>{value}</span>
            <FaPlus onClick={handleAddAmount} />
        </div>
    )
}

export default QuantityButton