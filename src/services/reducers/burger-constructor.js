const initialState = {
  items: [
    {
      _id: '',
      name: '',
      price: 0,
      image: ''
    }
  ]
};

export const burgerConstructor = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
