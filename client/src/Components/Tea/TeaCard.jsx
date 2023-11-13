import { useState } from 'react';
import '../../Styles/TeaCard.css';
import TeaInformation from './TeaInformation';

const TeaCard = ({ tea, userInfo }) => {
    const [isTeaInformationVisible, setTeaInformationVisible] = useState(false);

    function openTeaInformation() {
        setTeaInformationVisible(true);
      }

    return (
        <>
            {isTeaInformationVisible && <TeaInformation tea={tea} setTeaInformationVisible={setTeaInformationVisible} userInfo={userInfo} />}
            <div className='TeaCard' onClick={openTeaInformation}>
                <div className="Image" style={{ backgroundImage: `url(${tea.image})` }} ></div>
                <h3>{tea.name}</h3>
                <div className="Description">
                    <p>Type: {tea.type}</p>
                    <p>Origin: {tea.origin}</p>
                    <p>Caffeine: {tea.caffeine}</p>
                    <p>Temperature: {tea.temperature}</p>
                </div>
            </div>
        </>
    )
}

export default TeaCard