import Spinner from "react-bootstrap/Spinner";

const LoadingVisual = () => {
  return (
    <div className="loading_container">
      <Spinner className="_spinner" animation="border" variant="primary" />
      <p className="_text">Loading...</p>
    </div>
  );
};

export default LoadingVisual;
