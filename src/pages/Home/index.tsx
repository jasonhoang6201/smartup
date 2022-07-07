import './Home.scss'
import hero from 'src/assets/images/hero.png'

type Props = {}

const Home = (props: Props) => {
    return (
        <div className="home">
            <div className="hero">
                <img src={hero} alt="hero" />
            </div>
        </div>
    )
}

export default Home