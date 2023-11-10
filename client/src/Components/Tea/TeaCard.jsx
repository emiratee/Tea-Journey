import '../../Styles/TeaCard.css';
import TeaInformation from './TeaInformation';

const TeaCard = ({ tea }) => {
    function openTeaInformation() {
        document.getElementById(tea._id).style.display = 'none'
    }

    return (
        <>
            <TeaInformation tea={tea} />
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