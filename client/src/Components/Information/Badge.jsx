const Badge = ({ img, text }) => {
    return (
        <div className="Badge">
            <img src={img} alt="Test" />
            <div className="Badge-Popup">{text}</div>
        </div>
    )
}

export default Badge