import { Col, Row } from 'antd'
import { Link } from 'react-router-dom'
import gitHub from 'src/assets/icons/github.svg'

type Props = {}

const Footer = (props: Props) => {
    return (
        <div className="footer">
            <Row gutter={[0, 20]}>
                <Col md={12} xs={24}>
                    <Row>
                        <Col md={12} xs={12}>
                            <div>
                                <h1>SmartSup</h1>
                                <h5>225 Nguyễn Văn Cừ</h5>
                                <h5>Hồ Chí Minh City</h5>
                                <h5>Việt Nam</h5>
                                <h5>EC01-03</h5>
                            </div>
                        </Col>
                        <Col md={12} xs={12}>
                            <div>
                                <h1>Social links</h1>
                                <img src={gitHub} alt="github" />
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col md={12} xs={24}>
                    <Row>
                        <Col md={12} xs={12}>
                            <div>
                                <h1>Menu</h1>
                                <p><Link to={'/'}>New Arrivals</Link></p>
                                <p><Link to={'/'}>Best Sellers</Link></p>
                                <p><Link to={'/'}>Recently View</Link></p>
                                <p><Link to={'/'}>All product</Link></p>
                            </div>
                        </Col>
                        <Col md={12} xs={12}>
                            <div>
                                <h1>Our Company</h1>
                                <h5><Link to={'/about'}>About us</Link></h5>
                                <h5><Link to={'/contact'}>Contact us</Link></h5>
                                <h5><Link to={'/privacy'}>Privacy Policy</Link></h5>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Footer