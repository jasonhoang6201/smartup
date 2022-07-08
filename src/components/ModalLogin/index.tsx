import { Modal } from 'antd'
import React from 'react'

type Props = {
    visible: boolean,
    onCancel: () => void,
}

const ModalLogin = (props: Props) => {
    return (
        <Modal
            visible={props.visible}
            onCancel={props.onCancel}
            footer={null}
            closable={false}
            destroyOnClose
        >
            <p>hello</p>
        </Modal>
    )
}

export default ModalLogin