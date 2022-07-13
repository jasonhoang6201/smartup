import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import cart from 'src/assets/icons/cart.svg'
import search from 'src/assets/icons/search.svg'
import user from 'src/assets/icons/user.svg'
import logo from 'src/assets/images/logo.png'
import useRouting from 'src/hooks/UseRouting'
import { User } from 'src/redux/auth'
import ModalLogin from '../ModalLogin'
import './Layout.scss'
type Props = {}

const Header = (props: Props) => {
    const userState: User = useSelector((state: any) => state.auth.user)
    const [isModalLogin, setIsModalLogin] = React.useState(false)
    const navigate = useNavigate();
    const { generate } = useRouting()

    const category = useMemo(() => {
        return [
            {
                name: 'All',
                link: '/category'
            },
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
                    <img src={search} alt="search" width={30} />
                </div>
                <Link to={'/'}>
                    <div className="logo">
                        <img src={logo} alt="logo" height={100} />
                    </div>
                </Link>
                <div className="feature">
                    {userState ?
                        <>
                            <img src={cart} alt="cart" width={30} onClick={() => navigate(generate('cart'))} />
                            <img src={user} alt="user" width={30} onClick={() => navigate(generate('profile'))} />
                        </>
                        :
                        <span onClick={() => setIsModalLogin(true)}>Login/Register</span>
                    }
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

            <ModalLogin visible={isModalLogin} onCancel={() => setIsModalLogin(false)} />
        </div>
    )
}

export default Header