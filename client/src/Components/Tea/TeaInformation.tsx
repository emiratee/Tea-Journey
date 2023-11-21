import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Information from '../Information/Information';
import Close from '../../Assets/close.png';
import EmptyStar from '../../Assets/star-empty.png';
import FilledStar from '../../Assets/star-filled.png';
import { markAsFavourite } from '../../apiService';
import TeaRatingModal from './TeaRatingModal';
import { useAuth } from '../../Utils/auth';
import { Tea } from '../../../../interfaces/Tea';
import '../../Styles/TeaInformation.css';

const TeaCardStyle: ReactModal.Styles = {
  overlay: {
    backgroundColor: 'transparent',
  },
  content: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    background: 'linear-gradient(90deg, #73a86d, #aedc8a)',
    transform: 'translate(-50%, -50%)',
    height: 'calc(100vh - 30%)',
    width: 'calc(100vw - 14%)',
  },
};

interface TeaInformationProps {
  tea: Tea;
  setTeaInformationVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const TeaInformation: React.FC<TeaInformationProps> = ({
  tea,
  setTeaInformationVisible,
}) => {
  const { userInfo, setUserInfo } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [star, setStar] = useState(false);
  const [rating, setRating] = useState('Rate');

  useEffect(() => {
    if (isModalOpen) document.querySelector('.Home')?.classList.add('Blurred');

    if (userInfo.reviews) {
      const dbRating = userInfo.reviews.find(
        (review) => review.name === tea.name
      );

      if (dbRating) {
        setStar(true);
        setRating(`${dbRating.score}/10`);
      }
    }
  }, [userInfo.reviews, tea.name, isModalOpen]);

  function setFavourite() {
    const token = localStorage.getItem('accessToken');
    if (token !== null) {
      markAsFavourite(tea.name, token);
      setUserInfo((prev) => ({
        ...prev,
        favourite_tea: tea.name,
      }));
    } else {
      console.error('No authentication token found');
    }
  }

  function openRateModal() {
    setIsRateModalOpen(true);
  }

  function close() {
    setIsModalOpen(false);
    setTeaInformationVisible(false);
    document.querySelector('.Home')?.classList.remove('Blurred');
  }

  return (
    <>
      <div className="TeaInformation" id={tea._id}>
        <Modal className={'Page'} style={TeaCardStyle} isOpen={isModalOpen}>
          <div className="Description" id="TeaInformationDescription">
            <div className="Title">
              <div className="Start">
                <h1>{tea.name}</h1>
                <span>{tea.description}</span>
              </div>
              <div className="End">
                <div className="End-Content">
                  <div className="Rating" onClick={openRateModal}>
                    <img src={!star ? EmptyStar : FilledStar} alt="Empty" />
                    <h4>{rating}</h4>
                  </div>
                  {userInfo.favourite_tea === tea.name ? (
                    <button style={{ backgroundColor: '#5caa48' }}>
                      Current favourite
                    </button>
                  ) : (
                    <button onClick={setFavourite}>Mark as favourite</button>
                  )}
                  <img src={Close} alt="Close" onClick={close} />
                </div>
              </div>
            </div>
            <div className="Information">
              <div className="Information-Item">
                <h3>Type:</h3>
                <Information text={tea.type} className={''} />
              </div>
              <div className="Information-Item">
                <h3>Origin:</h3>
                <Information text={tea.origin} className={''} />
              </div>
              <div className="Information-Item">
                <h3>Brew time:</h3>
                <Information text={`${tea.brewTime} minutes`} className={''} />
              </div>
              <div className="Information-Item">
                <h3>Brew temperature:</h3>
                <Information text={tea.temperature} className={''} />
              </div>
              {tea.caffeineLevel && (
                <div className="Information-Item">
                  <h3>Caffeine:</h3>
                  <Information
                    text={
                      tea.caffeineLevel.charAt(0).toUpperCase() +
                      tea.caffeineLevel.slice(1)
                    }
                    className={''}
                  />
                </div>
              )}
              <div className="Information-Item">
                <h3>Color description:</h3>
                <Information text={tea.colorDescription} className={''} />
              </div>
              <div className="Information-Item">
                <h3>Taste description:</h3>
                <Information text={tea.tasteDescription} className={''} />
              </div>
            </div>
          </div>
        </Modal>
      </div>
      {isRateModalOpen && (
        <TeaRatingModal
          name={tea.name}
          setIsRateModalOpen={setIsRateModalOpen}
          setRating={setRating}
          setStar={setStar}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        />
      )}
    </>
  );
};

export default TeaInformation;
