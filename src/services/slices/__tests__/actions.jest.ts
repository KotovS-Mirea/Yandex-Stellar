import { expect, test, describe, jest } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import appInitStateSlice, {
  addIngredient,
  hideModal,
  resetOrderRequest,
  removeIngredient,
  initializeApp,
  moveIngredientDown,
  moveIngredientUp,
  showModal,
  clearErrorMessage,
  clearOrders,
  clearUserOrders,
  selectConstructorItems,
  selectErrorMessage,
  selectIsInitialized,
  selectIsModalOpen,
  selectOrderModalData,
  selectIsOrderRequested,
  selectOrders,
  selectUserOrders,
  setErrorMessage
} from '../appInitStateSlice';
import { mockStore, mockIngredient, mockBun } from '../mockData';

function initStore() {
  return configureStore({
    reducer: {
      stellarBurger: appInitStateSlice
    },
    preloadedState: {
      stellarBurger: mockStore
    }
  });
}

describe('Test actions', () => {
  test('Test addIngredient', () => {
    const store = initStore();
    store.dispatch(addIngredient(mockIngredient));
    store.dispatch(addIngredient(mockBun));

    const constructor = selectConstructorItems(store.getState());
    expect(constructor.ingredients.length).toEqual(3);
    expect(constructor.bun.name === 'Краторная булка N-200i');
  });
  
  test('Test removeIngredient', () => {
    const store = initStore();
    const before = selectConstructorItems(store.getState()).ingredients.length;
    store.dispatch(removeIngredient(mockIngredient));
    const after = selectConstructorItems(store.getState()).ingredients.length;
    expect(before).toBe(2);
    expect(after).toBe(1);
  });

  test('Test resetOrderRequest', () => {
    const store = initStore();
    store.dispatch(resetOrderRequest());

    const orderRequest = selectIsOrderRequested(store.getState());
    const orderModalData = selectOrderModalData(store.getState());
    const constructorItems = selectConstructorItems(store.getState());

    expect(orderRequest).toBe(false);
    expect(orderModalData).toBe(null);
    expect(constructorItems).toEqual({
      bun: {
        price: 0
      },
      ingredients: []
    });
  });

  test('Test clearOrders', () => {
    const store = initStore();
    const initialOrders = selectOrders(store.getState()).length;
    store.dispatch(clearOrders());
    const orders = selectOrders(store.getState()).length;
    expect(initialOrders).toBe(2);
    expect(orders).toBe(0);
  });

  test('Test clearUserOrders', () => {
    const store = initStore();
    const initialOrders = selectUserOrders(store.getState())!.length;
    store.dispatch(clearUserOrders());
    const orders = selectUserOrders(store.getState());
    expect(initialOrders).toBe(2);
    expect(orders).toBe(null);
  });

  test('Test initializeApp', () => {
    const store = initStore();
    const beforeInit = selectIsInitialized(store.getState());
    store.dispatch(initializeApp());
    const afterInit = selectIsInitialized(store.getState());
    expect(beforeInit).toBe(false);
    expect(afterInit).toBe(true);
  });

  test('Test showModal', () => {
    const store = initStore();
    const beforeOpen = selectIsModalOpen(store.getState());
    store.dispatch(showModal());
    const afterOpen = selectIsModalOpen(store.getState());
    expect(beforeOpen).toBe(false);
    expect(afterOpen).toBe(true);
  });

  test('Test hideModal', () => {
    const store = initStore();
    store.dispatch(hideModal());
    const isOpen = selectIsModalOpen(store.getState());
    expect(isOpen).toBe(false);
  });

  test('Test setErrorMessage', () => {
    const store = initStore();
    store.dispatch(setErrorMessage('my test error'));
    const errorText = selectErrorMessage(store.getState());
    expect(errorText).toBe('my test error');
  });

  test('Test clearErrorMessage', () => {
    const store = initStore();
    store.dispatch(setErrorMessage('Error here!'));
    store.dispatch(clearErrorMessage());
    const errorText = selectErrorMessage(store.getState());
    expect(errorText).toBe('');
  });

  test('Test moveIngredientUp', () => {
    const store = initStore();
    let ingredients = selectConstructorItems(store.getState()).ingredients;
    const lastIngredient = ingredients[ingredients.length - 1];

    store.dispatch(moveIngredientUp(lastIngredient));

    ingredients = selectConstructorItems(store.getState()).ingredients;

    expect(ingredients[ingredients.length - 2]).toEqual(lastIngredient);
  });

  test('Test moveIngredientDown', () => {
    const store = initStore();
    let ingredients = selectConstructorItems(store.getState()).ingredients;
    const firstIngredient = ingredients[0];

    store.dispatch(moveIngredientDown(firstIngredient));

    ingredients = selectConstructorItems(store.getState()).ingredients;

    expect(ingredients[1]).toEqual(firstIngredient);
  });
});
