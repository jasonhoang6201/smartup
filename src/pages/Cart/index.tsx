import { Table } from 'antd'
import React, { useEffect, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import cartAPI,{ ItemInCart } from 'src/api/cart'
import ModalCheckout from 'src/components/ModalCheckout'
import QuantityButton from 'src/components/QuantityButton'
import useRouting from 'src/hooks/UseRouting'
import './Cart.scss'
type Props = {}

const Cart = (props: Props) => {
  const user = useSelector((state: any) => state.auth.user);
  const [subTotal, setSubTotal] = React.useState(0);
  const navigate = useNavigate();
  const { generate } = useRouting();

    const [isCheckoutModal, setIsCheckoutModal] = React.useState(false)
    const columns = [
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
            render: (_: string, record: any) => (
                <div className="product-info">
                    <div className="product-image">
                        <img src={record.product.image[0]} alt="product" height={100} />
                    </div>
                    <div className="product-name">
                        <h1>{record.product.name}</h1>
                        <p>{record.product.description}</p>
                    </div>
                </div>
            ),
            width: '60%',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render(_: string, record: any, index: number) {
                return <QuantityButton value={record.quantity} onChange={(value) => {
                    setData(data.map((item, i) => {
                        if (i === index) {
                            return { ...item, quantity: value }
                        }
                        return item
                    }))
                }} />
            },
            width: '20%',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (_: string, record: any) => {
                return `$${parseFloat(record.price) * record.quantity}`
            },
            width: '20%',
        }
    ]
    const [data, setData] = React.useState<Array<ItemInCart>>([
        // {
        //     key: '1',
        //     name: 'Product 1',
        //     description: 'Description 1',
        //     thumbnail: 'https://woopimages.com/uploads/products/thumbs/aesthetic-heart-brown-apple-iphone-13--silicone-phone-case-cover.webp',
        //     quantity: 1,
        //     price: 120
        // },
        // {
        //     key: '2',
        //     name: 'Product 2',
        //     description: 'Description 2',
        //     thumbnail: 'https://woopimages.com/uploads/products/thumbs/aesthetic-heart-brown-apple-iphone-13--silicone-phone-case-cover.webp',
        //     quantity: 2,
        //     price: 120
        // }
    ])
    console.log(data)

    const getData = async () => {
        const res = await cartAPI.getCart()
        setData(res.data.product ?? [])
    }

    useEffect(() => {
        if (!user) {
            navigate(generate('home'))
        } else {
            getData()
        } 
    }, [user, navigate])

    useLayoutEffect(() => {
        setSubTotal(data.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0))
    }, [data])

    return (
        <div className="cart">
            <h1>Your shopping cart</h1>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                rowKey="code"
            />

      <div className="checkout">
        <h3>
          Subtotal: <span>${subTotal}</span>
        </h3>
        <p>Shipping and total will be calculated at checkout</p>
        <button className="btn" onClick={() => setIsCheckoutModal(true)}>
          Checkout
        </button>
      </div>

      <ModalCheckout
        visible={isCheckoutModal}
        onCancel={() => setIsCheckoutModal(false)}
      />
    </div>
  );
};

export default Cart;
