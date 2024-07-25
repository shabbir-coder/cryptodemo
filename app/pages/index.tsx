import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import CoinDashboard from '../components/CoinDashboard';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <CoinDashboard />
    </div>
  );
};

export default Home;
