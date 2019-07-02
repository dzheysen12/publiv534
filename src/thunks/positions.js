import Positions from '../helpers/Api/Positions';
import { setPositionsList, 
         deletePositionFromList, 
         setPositionForEdit } from '../actions/positions';
import { setStatus } from '../actions/statuses';
import { statuses } from '../helpers/statuses';

export const getPositionsList = () => dispatch => {
  dispatch(setStatus(statuses.LOADING));
    Positions.list( {}, 
      (data) => {
        dispatch(setStatus(statuses.NOT_INITIALIZED));
        dispatch(setPositionsList(data.positions));
    }, (data) => {
        dispatch(setStatus(statuses.ERROR, data));
        dispatch(setStatus(statuses.NOT_INITIALIZED));
    });
};

export const getPositionForEdit = (id) => dispatch => {
  dispatch(setStatus(statuses.LOADING));
    Positions.list( {}, 
      (data) => {
        dispatch(setStatus(statuses.NOT_INITIALIZED));
        let position = data.positions.filter(position => position._id === id);
        dispatch(setPositionForEdit(position[0]));
    }, (data) => {
        dispatch(setStatus(statuses.ERROR, data));
        dispatch(setStatus(statuses.NOT_INITIALIZED));
    });
};

export const editPosition = (values, positionid, schedule) => dispatch => {
  dispatch(setStatus(statuses.LOADING));
  Positions.edit({
    positionid: positionid,
    schedule: schedule,
    description: values.description,
    name: values.name,
    serviceTime: values.serviceTime,
    services: values.services
  }, () => {
      dispatch(setStatus(statuses.SUCCESS));
      dispatch(setStatus(statuses.NOT_INITIALIZED));
      dispatch(getPositionsList());
  }, (data) => {
      dispatch(setStatus(statuses.ERROR, data));
      dispatch(setStatus(statuses.NOT_INITIALIZED));
  });
};

export const addPosition = (values, schedule) => dispatch => {
  dispatch(setStatus(statuses.LOADING));
  Positions.add({
    schedule: schedule,
    description: values.description,
    name: values.name,
    serviceTime: values.serviceTime,
    services: values.services
  }, () => {
      dispatch(setStatus(statuses.SUCCESS));
      dispatch(setStatus(statuses.NOT_INITIALIZED));
      dispatch(getPositionsList());
  }, (data) => {
      dispatch(setStatus(statuses.ERROR, data));
      dispatch(setStatus(statuses.NOT_INITIALIZED));
  });
};

export const deletePosition = (id) => (dispatch) => {
  dispatch(setStatus(statuses.LOADING));
    Positions.delete({
        positionid: id
      }, () => {
          dispatch(setStatus(statuses.SUCCESS));
          dispatch(setStatus(statuses.NOT_INITIALIZED));
          dispatch(deletePositionFromList(id));
          dispatch(getPositionsList());
      }, (data) => {
          dispatch(setStatus(statuses.ERROR, data));
          dispatch(setStatus(statuses.NOT_INITIALIZED));
  });
};