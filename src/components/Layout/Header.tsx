import React, { useMemo } from 'react'
import search from 'src/assets/icons/search.svg'
import logo from 'src/assets/images/logo.png'
import user from 'src/assets/icons/user.svg'
import cart from 'src/assets/icons/cart.svg'
import './Layout.scss'
import { Link } from 'react-router-dom'
import ModalLogin from '../ModalLogin'
import { useSelector } from 'react-redux'
import { User } from 'src/redux/auth'
type Props = {}

const Header = (props: Props) => {
    const userState: User = useSelector((state: any) => state.auth.user)
    const [isModalLogin, setIsModalLogin] = React.useState(false)

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
                            <img src={cart} alt="cart" width={30} />
                            <img src={user} alt="user" width={30} />
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