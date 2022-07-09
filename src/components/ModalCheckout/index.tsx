import { Modal } from 'antd'
import React from 'react'
import './ModalCheckout.scss'

type Props = {
    visible: boolean,
    onCancel: () => void,
}

const ModalCheckout = (props: Props) => {
    const {
        visible = false,
        onCancel = () => { },
    } = props

    return (
        <Modal
            visible={visible}
            onCancel={onCancel}
            footer={null}
        >
            <div>test</div>
        </Modal>
    )
}

export default ModalCheckout