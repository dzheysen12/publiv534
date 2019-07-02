import { SET_POSITIONS_LIST,
         SET_POSITION_FOR_EDIT,
         DELETE_POSITION_FROM_LIST } from '../actions/types';


const initialState = {
  list: [],
  dataWasLoad: false,
  position_for_edit: null,
};

const positionsReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_POSITIONS_LIST:
      return {
        ...state,
        dataWasLoad: true,
        list: action.payload
      };
    
    case DELETE_POSITION_FROM_LIST:
      return {
        ...state,
        list: state.list.filter(position => position._id !== action.id)
      };

    case SET_POSITION_FOR_EDIT:
      return {
        ...state,
        position_for_edit: action.position ? {...action.position} : null,
      };
      
    default:
      return state;
  }
};

export default positionsReducer;
