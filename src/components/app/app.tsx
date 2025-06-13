import { Routes, Route, useLocation } from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';
import { ConstructorPage, NotFound404 } from '@pages';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';

export const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
      <Route path='*' element={<NotFound404 />} />
      <Route path='/' element={<ConstructorPage />} />
    </Routes>
  </div>
);
