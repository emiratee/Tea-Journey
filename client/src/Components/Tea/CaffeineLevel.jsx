import { useState } from 'react';
import '../../Styles/CaffeineLevel.css';

const CaffeineLevel = ({ caffeine }) => {
    const [dots, setDots] = useState();
    switch(caffeine) {
        case !caffeine:
            setDots('N/A')
        break;
        case 'None':
            setDots('None')
        break;
        case 'Very Low':
            setDots(dot(1, '#adff2f'))
        break;
        case 'Low':

        break;
        case 'Moderate':

        break;
        case 'High':

        break;
        case 'Very High':

        break;
    }

    function dot(coloredDots, color) {
        let result = '';
        for(let i = 0; i < coloredDots; i++) {
            //add colored dots
            //  result += 
        }
        for(let i = coloredDots; coloredDots < 5; i++) {
            //add white dots
        }

    }
  return (
    <div className='Dot'>
        {dots}
    </div>
  )
}

export default CaffeineLevel