import '../../Styles/Loading.css';
import Spinner from '../../Assets/spinner.gif';

const Loading = () => {
  return (
    <div className="Loading">
        <h1>Loading</h1>
        <img src={Spinner} alt="Spinner" />
    </div>
  )
}

export default Loading