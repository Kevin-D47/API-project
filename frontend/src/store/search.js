
const SEARCH_ALL = '/searchAll'


const getAllSearch = (payload) => {
    return {
        type: SEARCH_ALL,
        payload,
    };
};


export const searchAllSpotThunk = () => async (dispatch) => {
    const res = await fetch('/api/spots');
    if (res.ok) {
        const spots = await res.json();
        dispatch(getAllSearch(spots));
        return spots
    }
};


const initialState = {};

const searchReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SEARCH_ALL: {
        newState = {};
        action.payload.allSpots.forEach((spot) => (newState[spot.id] = spot));
        return newState;
        }
    default:
      return state;
  }
};


export default searchReducer
