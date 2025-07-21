import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/dashboard/Dashboard';
import styles from './styles.module.css';
import Layout from '@/shared/layouts/Layout';
import OrdersBookPage from '@/pages/ordersBookPage/OrdersBookPage';
import Posts from '@/pages/posts/Posts';
import { StrictMode } from 'react';

function App() {
  return (
    <StrictMode>
      <div className={styles.main}>
        <Routes>
          <Route path='/' element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path='orders' element={<OrdersBookPage />} />
              <Route path='posts' element={<Posts />} />
          </Route>
        </Routes>
      </div>
      </StrictMode>
  );
}

export default App;


 

        