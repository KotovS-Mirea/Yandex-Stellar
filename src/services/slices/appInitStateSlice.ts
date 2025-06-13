import {
  TLoginData,
  TRegisterData,
  getFeedsApi,
  getIngredientsApi,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  orderBurgerApi,
  registerUserApi,
  updateUserApi
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TConstructorItems,
  TIngredient,
  TIngredientUnique,
  TOrder,
  TUser
} from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

type TAppState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  orderModalData: TOrder | null;
  constructorItems: TConstructorItems;
  isOrderRequested: boolean;
  user: TUser;
  orders: TOrder[];
  totalOrdersCount: number;
  todaysOrdersCount: number;
  userOrders: TOrder[] | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  isModalOpen: boolean;
  errorMessage: string;
};

export const initialState: TAppState = {
  ingredients: [],
  isLoading: false,
  orderModalData: null,
  constructorItems: {
    bun: { price: 0 },
    ingredients: []
  },
  isOrderRequested: false,
  user: { name: '', email: '' },
  orders: [],
  totalOrdersCount: 0,
  todaysOrdersCount: 0,
  userOrders: null,
  isAuthenticated: false,
  isInitialized: false,
  isModalOpen: false,
  errorMessage: ''
};

const appInitSlice = createSlice({
  name: 'stellarBurger',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<TIngredient>) {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        state.constructorItems.ingredients.push({
          ...action.payload,
          uniqueId: uuidv4()
        });
      }
    },
    resetOrderRequest(state) {
      state.isOrderRequested = false;
      state.orderModalData = null;
      state.constructorItems = {
        bun: { price: 0 },
        ingredients: []
      };
    },
    clearOrders(state) {
      state.orders = [];
    },
    clearUserOrders(state) {
      state.userOrders = null;
    },
    initializeApp(state) {
      state.isInitialized = true;
    },
    showModal(state) {
      state.isModalOpen = true;
    },
    hideModal(state) {
      state.isModalOpen = false;
    },
    removeIngredient(state, action: PayloadAction<TIngredientUnique>) {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.uniqueId !== action.payload.uniqueId
        );
    },
    setErrorMessage(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
    clearErrorMessage(state) {
      state.errorMessage = '';
    },
    moveIngredientUp(state, action: PayloadAction<TIngredientUnique>) {
      const currentIndex = state.constructorItems.ingredients.findIndex(
        (item) => item.uniqueId === action.payload.uniqueId
      );
      const previousItem = state.constructorItems.ingredients[currentIndex - 1];
      state.constructorItems.ingredients.splice(
        currentIndex - 1,
        2,
        action.payload,
        previousItem
      );
    },
    moveIngredientDown(state, action: PayloadAction<TIngredientUnique>) {
      const currentIndex = state.constructorItems.ingredients.findIndex(
        (item) => item.uniqueId === action.payload.uniqueId
      );
      const nextItem = state.constructorItems.ingredients[currentIndex + 1];
      state.constructorItems.ingredients.splice(
        currentIndex,
        2,
        nextItem,
        action.payload
      );
    }
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIsLoading: (state) => state.isLoading,
    selectOrderModalData: (state) => state.orderModalData,
    selectConstructorItems: (state) => state.constructorItems,
    selectIsOrderRequested: (state) => state.isOrderRequested,
    selectUser: (state) => state.user,
    selectOrders: (state) => state.orders,
    selectTotalOrdersCount: (state) => state.totalOrdersCount,
    selectTodaysOrdersCount: (state) => state.todaysOrdersCount,
    selectUserOrders: (state) => state.userOrders,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectIsInitialized: (state) => state.isInitialized,
    selectIsModalOpen: (state) => state.isModalOpen,
    selectErrorMessage: (state) => state.errorMessage
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createOrder.pending, (state) => {
        state.isOrderRequested = true;
      })
      .addCase(createOrder.rejected, (state) => {
        state.isOrderRequested = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.isOrderRequested = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message || '';
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message || '';
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = { name: '', email: '' };
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFeed.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.totalOrdersCount = action.payload.total;
        state.todaysOrdersCount = action.payload.totalToday;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserOrders.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrders = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = { name: '', email: '' };
        state.isAuthenticated = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      });
  }
});

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchAll',
  getIngredientsApi
);

export const createOrder = createAsyncThunk('orders/create', orderBurgerApi);

export const loginUser = createAsyncThunk('user/login', loginUserApi);

export const registerUser = createAsyncThunk('user/register', registerUserApi);

export const fetchUser = createAsyncThunk('user/fetch', getUserApi);

export const fetchFeed = createAsyncThunk('feed/fetch', getFeedsApi);

export const fetchUserOrders = createAsyncThunk(
  'userOrders/fetch',
  getOrdersApi
);

export const logoutUser = createAsyncThunk('user/logout', logoutApi);

export const updateUser = createAsyncThunk('user/update', updateUserApi);

export const {
  selectIsLoading,
  selectIngredients,
  selectOrderModalData,
  selectConstructorItems,
  selectIsOrderRequested,
  selectUser,
  selectOrders,
  selectTotalOrdersCount,
  selectTodaysOrdersCount,
  selectUserOrders,
  selectIsAuthenticated,
  selectIsInitialized,
  selectIsModalOpen,
  selectErrorMessage
} = appInitSlice.selectors;

export const {
  addIngredient,
  resetOrderRequest,
  clearOrders,
  clearUserOrders,
  initializeApp,
  showModal,
  hideModal,
  removeIngredient,
  setErrorMessage,
  clearErrorMessage,
  moveIngredientUp,
  moveIngredientDown
} = appInitSlice.actions;

export default appInitSlice.reducer;
