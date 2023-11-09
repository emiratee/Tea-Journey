import '../Styles/Journey.css';
import Destination from '../Assets/destination.png';
import TestBadge from '../Assets/medal.png';

const Journey = () => {
  return (
    <div className="Frame">
      <div className="Journey">
        <div className="Title">
          <h1>My Journey</h1>
          <img src={Destination} alt="Destination" />
        </div>
        <div className="Information">
          <div className="Badges">
            <h3>Badges:</h3>
            <div className="Badges-List">
              <div>
                <img src={TestBadge} alt="Test" />
                <div className="Badge-Popup">Tea Expert</div>
              </div>
              <div>
                <img src={TestBadge} alt="Test" />
                <div className="Badge-Popup">Tea Tester</div>
              </div>
              <div>
                <img src={TestBadge} alt="Test" />
                <div className="Badge-Popup">Tea Enthusiast</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journey;
