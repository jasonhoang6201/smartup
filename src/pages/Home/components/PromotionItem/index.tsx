import React from 'react'
import ship from 'src/assets/icons/ship.svg'
import tickCircle from 'src/assets/icons/tick-circle.svg'
import creditCard from 'src/assets/icons/credit-card.svg'
import plant from 'src/assets/icons/plant.svg'
import { Col, Row } from 'antd'
import './PromotionItem.scss'

const PromotionItem = () => {
    const data = [
        {
            icon: ship,
            title: 'Next day as standard',
            detail: 'Order before 3pm and get your order the next day as standard',
        },
        {
            icon: tickCircle,
            title: 'Branch and reputation',
            detail: 'Imported directly from well-know branch in the world'
        },
        {
            icon: creditCard,
            title: 'Unbeatable prices',
            detail: 'For our materials and quality you won’t find better prices anywhere'
        },
        {
            icon: plant,
            title: 'Trending design',
            detail: 'We have a wide range of products that are trending in the market'
        }
    ]

    return (
        <Row gutter={[30, 30]}>
            {data.map((item, index) =>
                <Col md={6} sm={12} xs={24} key={index}>
                    <div className='promotion-card'>
                        <img src={item.icon} alt="" />
                        <h1>{item.title}</h1>
                        <p>{item.detail}</p>
                    </div>
                </Col>
            )}
        </Row>
    )
}

export default PromotionItem