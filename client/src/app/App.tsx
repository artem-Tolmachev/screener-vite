import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/dashboard/Dashboard';
import styles from './styles.module.css';
import Layout from '@/shared/layouts/Layout';
import OrdersBookPage from '@/pages/ordersBookPage/OrdersBookPage';
import { StrictMode } from 'react';
import HeatMap from '@/pages/heat-map/components/HeatMap';

function App() {
  return (
    <StrictMode>
      <div className={styles.main}>
        <Routes>
          <Route path='/' element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path='orders' element={<OrdersBookPage />} />
              <Route path='heat-map' element={<HeatMap/>} />
          </Route>
        </Routes>
      </div>
      </StrictMode>
  );
}

export default App;


 

        