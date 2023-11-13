import '../../Styles/TeaInformation.css';
import Modal from 'react-modal';
import Information from '../Information/Information';
import Close from '../../Assets/close.png';
import EmptyStar from '../../Assets/star-empty.png'
import { markAsFavourite } from '../../apiService';
import { useState } from 'react';


const customStyles = {
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
    transform: 'translate(-50%, -50%)',
    height: 'calc(100vh - 30%)',
    width: 'calc(100vw - 16%)'
  },
};

const TeaInformation = ({ tea, setTeaInformationVisible }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [rating, setRating] = useState('Rate')
  
  function setFavourite() {
    const token = localStorage.getItem('accessToken')
    markAsFavourite(tea.name, token);
    document.querySelector('.FavouriteTea').innerHTML = `<h4>${tea.name}</h4>`
  }

  function close() {
    setIsModalOpen(false);
    setTeaInformationVisible(false);
  }

  return (
    <div className='TeaInformation' id={tea._id}>
      <Modal className={'Page'} style={customStyles} isOpen={isModalOpen} >
        <div className="Description">
          <div className="Title">
            <div className="Start">
              <h1>{tea.name}</h1>
              <span>{tea.description}</span>
            </div>
            <div className="End">
              <div className="End-Content">
                <div className="Rating">
                  <img src={EmptyStar} alt="Empty" />
                  <h4>{rating}</h4>
                </div>
                <button onClick={setFavourite}>Mark as favourite</button>
                <img src={Close} alt="Close" onClick={close} />
              </div>
            </div>
          </div>
          <div className="Information">
            <div className="Information-Item">
              <h3>Type:</h3>
              <Information text={tea.type} />
            </div>
            <div className="Information-Item">
              <h3>Origin:</h3>
              <Information text={tea.origin} />
            </div>
            <div className="Information-Item">
              <h3>Brew time:</h3>
              <Information text={`${tea.brewTime} minutes`} />
            </div>
            <div className="Information-Item">
              <h3>Brew temperature:</h3>
              <Information text={tea.temperature} />
            </div>
            {tea.caffeineLevel && (
              <div className="Information-Item">
                <h3>Caffeine:</h3>
                <Information text={tea.caffeineLevel.charAt(0).toUpperCase() + tea.caffeineLevel.slice(1)} />
              </div>
            )}
            <div className="Information-Item">
              <h3>Main ingredients:</h3>
              <Information text={tea.mainIngredients} />
            </div>
            <div className="Information-Item">
              <h3>Color description:</h3>
              <Information text={tea.colorDescription} />
            </div>
            <div className="Information-Item">
              <h3>Taste description:</h3>
              <Information text={tea.tasteDescription} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default TeaInformation