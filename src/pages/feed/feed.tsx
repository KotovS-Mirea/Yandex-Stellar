import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  selectOrders,
  fetchFeed,
  clearOrders,
  fetchIngredients
} from '../../services/slices/appInitStateSlice';

export const Feed: FC = () => {
  const orders: TOrder[] = useAppSelector(selectOrders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    Promise.all([dispatch(fetchIngredients()), dispatch(fetchFeed())]);
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(clearOrders());
        dispatch(fetchFeed());
      }}
    />
  );
};
