import { Button, Checkbox, Col, Form, Radio, Row } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import React, { useEffect, useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom'
import hero from 'src/assets/images/hero.png'
import ProductCard from 'src/components/ProductCard'
import './Category.scss'

type Props = {}

const Category = (props: Props) => {
    const params = useParams()
    const [title, setTitle] = React.useState('')
    const [form] = useForm()

    const handleFilter = () => {
        console.log(form.getFieldsValue())
    }

    useLayoutEffect(() => {
        switch (params.category) {
            case 'charge':
                setTitle('Charge')
                break
            case 'case':
                setTitle('Case')
                break
            case 'headphone':
                setTitle('Headphone')
                break
            case 'tempered-glass':
                setTitle('Tempered Glass')
                break
            case 'protector':
                setTitle('Protector')
                break
            case 'other':
                setTitle('Other')
                break
            default:
                setTitle('All products')
        }
    }, [params]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])

    return (
        <div className="category">
            <div className="hero">
                <img src={hero} alt="" width={'100%'} height={'200px'} />
                <h3>{title}</h3>
            </div>
            <div className="category-wrapper">
                <Row>
                    <Col md={4} xs={0}>
                        <Form form={form} onFinish={handleFilter}>
                            <ul>
                                <h4>Category</h4>
                                <Form.Item name={['category', 'charge']} valuePropName="checked">
                                    <label>
                                        <li>
                                            <Checkbox />
                                            Charge
                                        </li>
                                    </label>
                                </Form.Item>
                                <Form.Item name={['category', 'case']} valuePropName="checked">
                                    <label>
                                        <li>
                                            <Checkbox />
                                            Case
                                        </li>
                                    </label>
                                </Form.Item>
                                <Form.Item name={['category', 'headphone']} valuePropName="checked">
                                    <label>
                                        <li>
                                            <Checkbox />
                                            Headphone
                                        </li>
                                    </label>
                                </Form.Item>
                                <Form.Item name={['category', 'temperedGlass']} valuePropName="checked">
                                    <label>
                                        <li>
                                            <Checkbox />
                                            Tempered Glass
                                        </li>
                                    </label>
                                </Form.Item>
                                <Form.Item name={['category', 'protector']} valuePropName="checked">
                                    <label>
                                        <li>
                                            <Checkbox />
                                            Protector
                                        </li>
                                    </label>
                                </Form.Item>
                                <Form.Item name={['category', 'other']} valuePropName="checked">
                                    <label>
                                        <li>
                                            <Checkbox />
                                            Other
                                        </li>
                                    </label>
                                </Form.Item>
                            </ul>

                            <ul>
                                <h4>Price</h4>
                                <Form.Item
                                    name='price'
                                    initialValue={0}
                                >
                                    <Radio.Group>
                                        <label>
                                            <li>
                                                <Radio value={0}>
                                                    $0 - $50
                                                </Radio>
                                            </li>
                                        </label>
                                        <label>
                                            <li>
                                                <Radio value={1}>
                                                    $50 - $100
                                                </Radio>
                                            </li>
                                        </label>
                                        <label>
                                            <li>
                                                <Radio value={2}>
                                                    $100 - $200
                                                </Radio>
                                            </li>
                                        </label>
                                        <label>
                                            <li>
                                                <Radio value={3}>
                                                    $200+
                                                </Radio>
                                            </li>
                                        </label>
                                    </Radio.Group>
                                </Form.Item>
                            </ul>

                            <ul>
                                <h4>Brand</h4>
                                <Form.Item name={['brand', 'apple']} valuePropName="checked">
                                    <label>
                                        <li>
                                            <Checkbox />
                                            Apple
                                        </li>
                                    </label>
                                </Form.Item>
                                <Form.Item name={['brand', 'magnolia']} valuePropName="checked">
                                    <label>
                                        <li>
                                            <Checkbox />
                                            Magnolia
                                        </li>
                                    </label>
                                </Form.Item>
                                <Form.Item name={['brand', 'olive']} valuePropName="checked">
                                    <label>
                                        <li>
                                            <Checkbox />
                                            Olive
                                        </li>
                                    </label>
                                </Form.Item>
                                <Form.Item name={['brand', 'other']} valuePropName="checked">
                                    <label>
                                        <li>
                                            <Checkbox />
                                            Beats
                                        </li>
                                    </label>
                                </Form.Item>
                            </ul>

                            <Button htmlType='submit' block>Filter</Button>
                        </Form>
                    </Col>
                    <Col md={20} xs={24}>
                        <div className="product-list">
                            <Row gutter={[30, 30]}>
                                {Array.from({ length: 10 }).map((_, index) =>
                                    <Col key={index} md={6} xs={12}>
                                        <ProductCard
                                            id="4"
                                            name='Test'
                                            sale={0}
                                            price={120}
                                            rate={20}
                                            thumbnail={'https://woopimages.com/uploads/products/thumbs/aesthetic-heart-brown-apple-iphone-13--silicone-phone-case-cover.webp'}
                                        />
                                    </Col>
                                )}
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Category