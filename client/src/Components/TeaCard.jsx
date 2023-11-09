import '../Styles/TeaCard.css';

const TeaCard = ({ tea }) => {
    return (
        <div className='TeaCard'>
            <div className="Image" style={{ backgroundImage: `url(${tea.image})` }} ></div>
            <h3>{tea.name}</h3>
            <div className="Description">
                <p>Type: {tea.type}</p>
                <p>Origin: {tea.origin}</p>
                <p>Caffeine: {tea.caffeine}</p>
                <p>Temperature: {tea.temperature}</p>
            </div>
        </div>
    )
}

export default TeaCard