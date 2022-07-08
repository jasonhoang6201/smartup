import React, { useMemo } from 'react'
import search from 'src/assets/icons/search.svg'
import logo from 'src/assets/images/logo.png'
import user from 'src/assets/icons/user.svg'
import cart from 'src/assets/icons/cart.svg'
import './Layout.scss'
import { Link } from 'react-router-dom'
type Props = {}

const Header = (props: Props) => {
    const category = useMemo(() => {
        return [
            {
                name: 'Charge',
                link: '/category/charge'
            },
            {
                name: 'Case',
                link: '/category/case'
            },
            {
                name: 'Headphone',
                link: '/category/headphone'
            },
            {
                name: 'Tempered Glass',
                link: '/category/tempered-glass'
            },
            {
                name: 'Protector',
                link: '/category/protector'
            },
            {
                name: 'Other',
                link: '/category/other'
            }
        ]
    }, [])

    return (
        <div className="header">
            <div className="header-up">
                <div className="search">
                    <img src={search} alt="search" />
                </div>
                <Link to={'/'}>
                    <div className="logo">
                        <img src={logo} alt="logo" height={50} />
                    </div>
                </Link>
                <div className="feature">
                    <img src={cart} alt="cart" />
                    <img src={user} alt="user" />
                </div>
            </div>
            <div className="header-down">
                <ul>
                    {category.map((item, index) =>
                        <li key={index}>
                            <Link to={item.link}>{item.name}</Link>
                        </li>)}
                </ul>
            </div>
        </div>
    )
}

export default Header