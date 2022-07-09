import { Col, Radio, Row } from 'antd'
import React, { useEffect } from 'react'
import { FaHeart } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import ModalLogin from 'src/components/ModalLogin'
import ProductCard from 'src/components/ProductCard'
import QuantityButton from 'src/components/QuantityButton'
import useRouting from 'src/hooks/UseRouting'
import './ProductDetail.scss'

type Props = {}

const ProductDetail = (props: Props) => {
    const user = useSelector((state: any) => state.auth.user)
    const params = useParams()
    const [amount, setAmount] = React.useState(1)
    const [isModalLogin, setIsModalLogin] = React.useState(false)
    const navigate = useNavigate()
    const { generate } = useRouting()

    const handleAddToCard = () => {
        if (user) {

        } else {
            setIsModalLogin(true)
        }
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [params])

    return (
        <div className="product-detail">
            <Row>
                <Col md={8} xs={24}>
                    <div className="product-detail-image">
                        <img src="https://woopimages.com/uploads/products/thumbs/aesthetic-heart-brown-apple-iphone-13--silicone-phone-case-cover.webp" alt="product" width={'100%'} />
                    </div>
                </Col>
                <Col md={16} xs={24}>
                    <div className="product-detail-info">
                        <h1>Aesthetic Heart Brown Apple iPhone 13 Silicone Phone Case Cover</h1>
                        <div className="product-detail-info-price">
                            <span className="product-detail-info-price-sale">$120</span>
                            <span className="product-detail-info-price-origin">$200</span>
                        </div>
                        <div className="product-detail-info-rate-count">
                            <FaHeart color='red' />
                            <FaHeart color='red' />
                            <FaHeart color='red' />
                            <FaHeart color='red' />
                            <FaHeart color='red' />
                            <span>(20)</span>
                        </div>
                        <div className="product-detail-info-description">
                            <h3>Description</h3>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam et vitae similique ipsum esse, animi quasi perspiciatis delectus architecto non vero officiis dolor exercitationem in mollitia fugiat optio unde! Similique.</p>
                        </div>
                        <div className="product-detail-info-color">
                            <h3>Color:</h3>
                            <Radio.Group className='radio-custom'>
                                <Radio value="a">red</Radio>
                                <Radio value="b">blue</Radio>
                                <Radio value="c">green</Radio>
                            </Radio.Group>
                        </div>
                        <div className="product-detail-info-quantity">
                            <h3>Amount:</h3>
                            <QuantityButton value={amount} onChange={setAmount} />
                        </div>
                        <div className="product-detail-info-button">
                            <button className='btn' onClick={handleAddToCard}>Add to cart</button>
                        </div>
                    </div>
                </Col>
            </Row>
            <div className="similar">
                <h1>You might also like</h1>
                <Row gutter={[30, 30]}>
                    {Array.from({ length: 4 }).map((_, index) =>
                        <Col key={index} md={6} xs={12}>
                            <ProductCard
                                id={index.toString()}
                                thumbnail="https://woopimages.com/uploads/products/thumbs/aesthetic-heart-brown-apple-iphone-13--silicone-phone-case-cover.webp"
                                name="Aesthetic Heart Brown Apple iPhone 13 Silicone Phone Case Cover"
                                price={120}
                                sale={120}
                                rate={4}
                            />
                        </Col>
                    )}
                </Row>

                <div className="btn-view-more">
                    <button className="btn" onClick={() => navigate(generate('category'))}>View more</button>
                </div>
            </div>
            <ModalLogin visible={isModalLogin} onCancel={() => setIsModalLogin(false)} />
        </div>
    )
}

export default ProductDetail