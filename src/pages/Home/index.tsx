import hero from 'src/assets/images/hero.png'
import { Link } from 'react-router-dom'
import PromotionItem from './components/PromotionItem'
import './Home.scss'
import ProductCard from '../../components/ProductCard'
import { Col, Row } from 'antd'
import promotionV2 from 'src/assets/images/promotion-v2.png'

type Props = {}

const Home = (props: Props) => {
    return (
        <div className="home">
            <div className="hero">
                <img src={hero} alt="hero" />
                <div className="hero-content">
                    <h1>Phone accessories for people who love decorate their smart phone</h1>
                    <Link to="/category">View collection</Link>
                </div>
            </div>
            <div className="container">
                <div className="promotion">
                    <h1>What makes our brand different</h1>
                    <PromotionItem />
                </div>

                <div className="product-list">
                    <h1>Best seller</h1>
                    <Row gutter={[30, 30]}>
                        <Col md={6} xs={12}>
                            <ProductCard
                                id="1"
                                name='Test'
                                sale={0}
                                price={120}
                                rate={20}
                                thumbnail={'https://woopimages.com/uploads/products/thumbs/aesthetic-heart-brown-apple-iphone-13--silicone-phone-case-cover.webp'}
                            />
                        </Col>
                        <Col md={6} xs={12}>
                            <ProductCard
                                id="2"
                                name='Test'
                                sale={0}
                                price={120}
                                rate={20}
                                thumbnail={'https://woopimages.com/uploads/products/thumbs/aesthetic-heart-brown-apple-iphone-13--silicone-phone-case-cover.webp'}
                            />
                        </Col>
                        <Col md={6} xs={12}>
                            <ProductCard
                                id="3"
                                name='Test'
                                sale={0}
                                price={120}
                                rate={20}
                                thumbnail={'https://woopimages.com/uploads/products/thumbs/aesthetic-heart-brown-apple-iphone-13--silicone-phone-case-cover.webp'}
                            />
                        </Col>
                        <Col md={6} xs={12}>
                            <ProductCard
                                id="4"
                                name='Test'
                                sale={0}
                                price={120}
                                rate={20}
                                thumbnail={'https://woopimages.com/uploads/products/thumbs/aesthetic-heart-brown-apple-iphone-13--silicone-phone-case-cover.webp'}
                            />
                        </Col>
                    </Row>
                    <p><Link to="/category">View all</Link></p>
                </div>
            </div>
            <div className="promotion-v2">
                <Row>
                    <Col md={12} xs={24}>
                        <div>
                            <div>
                                <h1>Start buying and decorating your phone</h1>
                                <p>Your satisfaction is our greatest motivation</p>
                            </div>
                            <p className='link-container'><Link to="/category">View collection</Link></p>
                        </div>
                    </Col>
                    <Col md={12} xs={24}>
                        <div>
                            <img src={promotionV2} alt="" width={'100%'} />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Home