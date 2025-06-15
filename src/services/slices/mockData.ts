export const mockStore = {
  ingredients: [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0
    },
    {
      _id: '643d69a5c3f7b9001cfa093d',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
      __v: 0
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      __v: 0
    },
    {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      __v: 0
    }
  ],
  isLoading: false,
  orderModalData: {
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa093f',
      '643d69a5c3f7b9001cfa0944',
      '643d69a5c3f7b9001cfa093c'
    ],
    _id: '664fb57597ede0001d06bfee',
    status: 'done',
    name: 'Краторный традиционный-галактический бессмертный бургер',
    createdAt: '2025-06-15T14:05:29.446Z',
    updatedAt: '2025-06-15T14:10:29.901Z',
    number: 12341
  },
  constructorItems: {
    bun: {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0
    },
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa093f',
        name: 'Мясо бессмертных моллюсков Protostomia',
        type: 'main',
        proteins: 433,
        fat: 244,
        carbohydrates: 33,
        calories: 420,
        price: 1337,
        image: 'https://code.s3.yandex.net/react/code/meat-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
        __v: 0,
        uniqueId: 'test_id_1'
      },
      {
        _id: '643d69a5c3f7b9001cfa0944',
        name: 'Соус традиционный галактический',
        type: 'sauce',
        proteins: 42,
        fat: 24,
        carbohydrates: 42,
        calories: 99,
        price: 15,
        image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
        __v: 0,
        uniqueId: 'test_id_2'
      }
    ]
  },
  isOrderRequested: false,
  user: {
    name: 'Name',
    email: 'mail@example.ru'
  },
  orders: [
    {
      _id: '664fc0ee97ede0001d06c012',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный био-марсианский бургер',
      createdAt: '2025-06-15T12:30:45.983Z',
      updatedAt: '2025-06-15T12:35:27.392Z',
      number: 12345
    },
    {
      _id: '664fc0ba97ede0001d06c00f',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'pending',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2025-06-15T11:45:22.249Z',
      updatedAt: '2025-06-15T11:50:34.685Z',
      number: 12344
    }
  ],
  totalOrdersCount: 125,
  todaysOrdersCount: 5,
  userOrders: [
    {
      _id: '664fb57597ede0001d06bfee',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa0944',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный традиционный-галактический бессмертный бургер',
      createdAt: '2025-06-15T14:05:29.446Z',
      updatedAt: '2025-06-15T14:10:29.901Z',
      number: 12341
    },
    {
      _id: '664fb57b97ede0001d06bfef',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa0945',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный spicy антарианский бургер',
      createdAt: '2025-06-15T16:10:35.290Z',
      updatedAt: '2025-06-15T16:15:35.749Z',
      number: 12342
    }
  ],
  isAuthenticated: true,
  isInitialized: false,
  isModalOpen: false,
  errorMessage: 'test error text'
};

export const mockIngredient = {
  _id: '643d69a5c3f7b9001cfa093f',
  name: 'Мясо бессмертных моллюсков Protostomia',
  type: 'main',
  proteins: 433,
  fat: 244,
  carbohydrates: 33,
  calories: 420,
  price: 1337,
  image: 'https://code.s3.yandex.net/react/code/meat-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
  __v: 0,
  uniqueId: 'test_id_1'
};

export const mockBun = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0
};
