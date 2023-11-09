import '../Styles/Explore.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from 'react';
import { getAllTeas } from '../apiService';
import TeaCard from './TeaCard';

const Explore = () => {
    const [teas, setTeas] = useState([]);

    useEffect(() => {
      (async () => {
        const data = await getAllTeas();
        setTeas(data);
      })();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    return (
        <div className="Frame-Explore">
            <div className="Explore">
                <div className="Title">
                    <h1>Explore the world of tea</h1>
                </div>
                    <div className="Cards">
                        <Slider {...settings}>
                            <div className='Card' >
                                {teas.slice(0,6).map(tea => { return <TeaCard key={tea._id} tea={tea} /> })}
                            </div>
                        </Slider>
                    </div>
            </div>
        </div>
    )
}

export default Explore