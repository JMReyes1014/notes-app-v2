import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NotFound.css'; // Ensure you have the CSS file for styling

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Notes App | 404 - Not Found';
  }, []);

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h3>Oops! Page not found</h3>
          <h1><span>4</span><span>0</span><span>4</span></h1>
        </div>
        <h3>We are sorry, but the page you requested was not found</h3>
        <button onClick={handleGoHome} className="btn dark">Go Back Home</button>
      </div>
    </div>
  );
}

export default NotFound;