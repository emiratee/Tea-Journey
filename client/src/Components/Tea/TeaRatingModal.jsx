import React, { useState } from 'react';
import '../../Styles/TeaRatingModal.css';
import Modal from 'react-modal';
import Close from '../../Assets/close.png'
import EmptyStar from '../../Assets/star-empty.png';
import FilledStar from '../../Assets/star-filled.png';
import { rateTea } from '../../apiService';

const RatingStyle = {
    content: {
        position: 'fixed',
        background: 'linear-gradient(-90deg, #969f77, #968f54)',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '125px',
        width: '400px'
    }
};

const TeaRatingModal = ({ name, setIsRateModalOpen, setRating, setStar }) => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [hoveredRating, setHoveredRating] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);

    const handleStarClick = (num) => {
        const token = localStorage.getItem('accessToken');
        setSelectedRating(num);
        setRating(`${num}/10`);
        setStar(true);
        closeModal();
        rateTea(name, num, token)
    };

    const handleStarHover = (num) => {
        setHoveredRating(num);
    };

    const handleStarLeave = () => {
        setHoveredRating(null);
    };

    function closeModal() {
        setIsModalOpen(false)
        setIsRateModalOpen(false);
    }

    const renderStar = (index) => {
        const isFilled = index <= (hoveredRating !== null ? hoveredRating : selectedRating);

        return (
            <div
                key={index}
                className="StarWrapper"
                onClick={() => handleStarClick(index)}
                onMouseEnter={() => handleStarHover(index)}
                onMouseLeave={handleStarLeave}
            >
                <img
                    src={isFilled ? FilledStar : EmptyStar}
                    alt={`Star-${index}`}
                    className="StarImage"
                />
            </div>
        );
    };

    return (
        <Modal style={RatingStyle} isOpen={isModalOpen}>
            <div className="TeaRatingModal">
                <div className="Close">
                    <img src={Close} alt="Close" onClick={closeModal} />
                </div>
                <h2>{name}</h2>
                <div className="Stars">
                    {[...Array(10).keys()].map((index) => renderStar(index + 1))}
                </div>
            </div>
        </Modal>
    );
};

export default TeaRatingModal;
