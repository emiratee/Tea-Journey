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
      <Modal className={'TEST'} style={customStyles} isOpen={true}>
        <h1>Hi</h1>
      </Modal>
    </div>
  )
}

export default TeaInformation