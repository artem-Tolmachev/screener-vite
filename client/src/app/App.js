import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/dashboard/Dashboard';
import styles from './styles.module.css';
import Layout from '@/shared/layouts/Layout';
import OrdersBookPage from '@/pages/ordersBookPage/OrdersBookPage';
import Posts from '@/pages/posts/Posts';
import { StrictMode } from 'react';
function App() {
    return (_jsx(StrictMode, { children: _jsx("div", { className: styles.main, children: _jsx(Routes, { children: _jsxs(Route, { path: '/', element: _jsx(Layout, {}), children: [_jsx(Route, { index: true, element: _jsx(Dashboard, {}) }), _jsx(Route, { path: 'orders', element: _jsx(OrdersBookPage, {}) }), _jsx(Route, { path: 'posts', element: _jsx(Posts, {}) })] }) }) }) }));
}
export default App;
