import '../Styles/Explore.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from 'react';
import { getAllTeas } from '../apiService';
import TeaCard from './Tea/TeaCard';
import LoginAlert from './Login/LoginAlert';
import { useAuth } from '../Utils/auth';

const Explore = ({ userInfo, setUserInfo }) => {
    const { authenticated } = useAuth();
    const [teas, setTeas] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await getAllTeas();
            setTeas(data);
        })();
    }, []);

    useEffect(() => {
        if (!authenticated) {
            document.querySelector('.Explore').classList.add('ExploreBlurred');
        }
    }, [authenticated]);

    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 650,
        slidesToShow: 3, //3
        slidesToScroll: 3,
        //centerMode: true,
        centerPadding: '0',
        rows: 1,
        slidesPerRow: 2, //2
        autoplay: true,
        autoplaySpeed: 5000,
    }

    //console.log(userInfo);

    return (
        <div className="Frame-Explore">
            {!authenticated && (
                <LoginAlert />
            )}
            <div className="Explore">
                <div className="Title">
                    <h1>Explore the world of tea</h1>
                </div>
                <div className="Cards">
                    <Slider {...settings}>
                        {teas.map(tea => { return <TeaCard key={tea._id} tea={tea} userInfo={userInfo} setUserInfo={setUserInfo} /> })}
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default Explore