import '../../Styles/Information.css';
import Up from '../../Assets/up.png';
import { counter } from '../../apiService';

const Information = ({ className, text, arrows }) => {
  async function counterUp() {
    await counter('up')
    document.getElementById('Counter').innerHTML = +document.getElementById('Counter').innerHTML + 1;
  }

  async function counterDown() {
    await counter('down')
    document.getElementById('Counter').innerHTML = +document.getElementById('Counter').innerHTML - 1;
  }

  return (
    <div className={className} id='Information'>
      {arrows ? (
        <>
          <img src={Up} alt="Up" onClick={counterDown} />
          <h4 id='Counter'>{text}</h4>
          <img src={Up} alt="Down" onClick={counterUp} />
        </>
      ) : (
        <h4>{text}</h4>
      )}
    </div>
  );
}

export default Information;
