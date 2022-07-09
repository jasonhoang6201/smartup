import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useRouting from 'src/hooks/UseRouting'
import './Profile.scss'

type Props = {}

const Profile = (props: Props) => {
    const user = useSelector((state: any) => state.auth.user)
    const navigate = useNavigate()
    const { generate } = useRouting()

    useEffect(() => {
        // if (!user) {
        //     navigate(generate('home'))
        // }
    }, [user, navigate, generate])

    return (
        <div>Profile</div>
    )
}

export default Profile