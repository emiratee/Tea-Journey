import React, { useEffect, useState } from 'react';
import '../../Styles/TeaRatingModal.css';
import Modal, { Styles } from 'react-modal';
import Close from '../../Assets/close.png';
import EmptyStar from '../../Assets/star-empty.png';
import FilledStar from '../../Assets/star-filled.png';
import { rateTea } from '../../apiService';
import { useAuth } from '../../Utils/auth';
import { User } from '../../../../interfaces/User';

interface TeaRatingModalProps {
  name: string;
  setIsRateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRating: React.Dispatch<React.SetStateAction<string>>;
  setStar: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: User; // Add the userInfo prop here
  setUserInfo: React.Dispatch<React.SetStateAction<User>>;
}

const RatingStyle: Styles = {
  overlay: {
    backgroundColor: 'transparent',
  },
  content: {
    position: 'fixed',
    background: 'linear-gradient(-90deg, #6a994e, #386641)',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    borderRadius: '10px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '125px',
    width: '400px',
  },
};

const TeaRatingModal: React.FC<TeaRatingModalProps> = ({
  name,
  setIsRateModalOpen,
  setRating,
  setStar,
}) => {
  const { setUserInfo } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  useEffect(() => {
    if (isModalOpen)
      document
        .getElementById('TeaInformationDescription')
        ?.classList.add('Blurred');
  }, [isModalOpen]);

  const handleStarClick = async (num: number) => {
    const token = localStorage.getItem('accessToken');
    setSelectedRating(num);
    setRating(`${num}/10`);
    setStar(true);
    closeModal();
    if (token !== null) {
      const ratedTea = await rateTea(name, num, token);
      setUserInfo((prev) => {
        const currentReviews = prev.reviews || [];
        const updatedReviews = [
          ...currentReviews.filter((review) => review.name !== name),
          { name, score: num },
        ];
        const averageRating =
          updatedReviews.reduce((sum, review) => sum + review.score, 0) /
          updatedReviews.length;
        return {
          ...prev,
          badges: ratedTea.result,
          reviews: updatedReviews,
          average_rating: isNaN(averageRating) ? 0 : averageRating,
        };
      });
    } else {
      console.error('Authentication token is missing');
    }
  };

  const handleStarHover = (num: number) => {
    setHoveredRating(num);
  };

  const handleStarLeave = () => {
    setHoveredRating(null);
  };

  function closeModal() {
    setIsModalOpen(false);
    setIsRateModalOpen(false);
    document
      .getElementById('TeaInformationDescription')
      ?.classList.remove('Blurred');
  }

  const renderStar = (index: number) => {
    const isFilled =
      index <= (hoveredRating !== null ? hoveredRating : selectedRating || 0);

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
