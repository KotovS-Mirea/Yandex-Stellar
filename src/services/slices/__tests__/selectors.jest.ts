import { expect, test, describe, jest } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import stellarBurgerSlice, {
  selectConstructorItems,
  selectErrorMessage,
  selectIngredients,
  selectIsAuthenticated,
  selectIsInitialized,
  selectIsModalOpen,
  selectIsLoading,
  selectOrderModalData,
  selectIsOrderRequested,
  selectOrders,
  selectTodaysOrdersCount,
  selectTotalOrdersCount,
  selectUser,
  selectUserOrders
} from '../appInitStateSlice';
import { mockStore } from '../mockData';

let store = configureStore({
  reducer: {
    stellarBurger: stellarBurgerSlice
  },
  preloadedState: {
    stellarBurger: mockStore
  }
});

describe('Test selectors', () => {
  test('Test selectUser', () => {
    const user = selectUser(store.getState());
    expect(user).toEqual({
      name: 'Name',
      email: 'mail@example.ru'
    });
  });

  test('Test selectIsInitialized', () => {
    const isInit = selectIsInitialized(store.getState());
    expect(isInit).toBe(false);
  });

  test('Test selectIsModalOpen', () => {
    const isModalOpened = selectIsModalOpen(store.getState());
    expect(isModalOpened).toBe(false);
  });

  test('Test selectErrorMessage', () => {
    const errorText = selectErrorMessage(store.getState());
    expect(errorText).toBe('test error text');
  });

  test('Test selectIsAuthenticated', () => {
    const isAuthenticated = selectIsAuthenticated(store.getState());
    expect(isAuthenticated).toBe(true);
  });

  test('Test selectIsLoading', () => {
    const loading = selectIsLoading(store.getState());
    expect(loading).toBe(false);
  });

  test('Test selectIsOrderRequested', () => {
    const orderRequest = selectIsOrderRequested(store.getState());
    expect(orderRequest).toBe(false);
  });

  test('Test selectTotalOrdersCount', () => {
    const totalOrders = selectTotalOrdersCount(store.getState());
    expect(totalOrders).toBe(125);
  });

  test('Test selectTodaysOrdersCount', () => {
    const todayOrders = selectTodaysOrdersCount(store.getState());
    expect(todayOrders).toBe(5);
  });

  test('Test selectIngredients', () => {
    const ingredients = selectIngredients(store.getState());
    expect(ingredients).toEqual(mockStore.ingredients);
  });

  test('Test selectConstructorItems', () => {
    const constructorItems = selectConstructorItems(store.getState());
    expect(constructorItems).toEqual(mockStore.constructorItems);
  });

  test('Test selectOrderModalData', () => {
    const orderModalData = selectOrderModalData(store.getState());
    expect(orderModalData).toEqual(mockStore.orderModalData);
  });

  test('Test selectOrders', () => {
    const orders = selectOrders(store.getState());
    expect(orders).toEqual(mockStore.orders);
  });

  test('Test selectUserOrders', () => {
    const userOrders = selectUserOrders(store.getState());
    expect(userOrders).toEqual(mockStore.userOrders);
  });
});
