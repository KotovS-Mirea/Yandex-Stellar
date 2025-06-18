import { FC } from 'react';
import {
  selectOrders,
  selectTodaysOrdersCount,
  selectTotalOrdersCount
} from '../../services/slices/appInitStateSlice';
import { useAppSelector } from '../../services/store';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useAppSelector(selectOrders);
  const total = useAppSelector(selectTotalOrdersCount);
  const totalToday = useAppSelector(selectTodaysOrdersCount);

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={{ total, totalToday }}
    />
  );
};
