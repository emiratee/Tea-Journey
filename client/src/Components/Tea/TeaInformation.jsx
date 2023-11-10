import '../../Styles/TeaInformation.css';
import Modal from 'react-modal';

const TeaInformation = ({ tea }) => {
  const customStyles = {
    overlay: {
      backgroundColor: 'transparent', // Adjust the transparency here
    },
    content: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      height: 'calc(100vh - 8%)',
      width: 'calc(100vw - 16%)'
    },
  };

  return (
    <div className='TeaInformation' id={tea._id}>
      <Modal className={'Page'} style={customStyles} isOpen={true} >
        <div className="Description">
          <h1>{tea.name}</h1>
          <span>{tea.description}</span>
          <h3>Type: {tea.type}</h3>
          <h3>Origin: {tea.origin}</h3>
          <h3>Brew time: {tea.brewTime} minutes</h3>
          <h3>Brew temperature: {tea.temperature}</h3>
          {tea.caffeineLevel && (
            <h3>Caffeine: {tea.caffeineLevel.charAt(0).toUpperCase() + tea.caffeineLevel.slice(1)}</h3>
          )}
          <h3>Main ingredients: {tea.mainIngredients}</h3>
          <h3>Color description: {tea.colorDescription}</h3>
          <h3>Taste description: {tea.tasteDescription}</h3>
        </div>
      </Modal>
    </div>
  )
}

export default TeaInformation