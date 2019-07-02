import { setMessagesFromServer, 
         setBotsList, 
         deleteBotFromList,
         setBotForEdit } from '../actions/bots';
import Bots from '../helpers/Api/Bots';
import { showModalWindow } from '../actions/bots';
import { setStatus } from '../actions/statuses';
import { statuses } from '../helpers/statuses';


export const getBots = () => dispatch => {
  dispatch(setStatus(statuses.LOADING));
  Bots.list({}, 
    (data) => {
      dispatch(setStatus(statuses.NOT_INITIALIZED));
      dispatch(setBotsList(data.bots));
    }, (data) => {
        dispatch(setStatus(statuses.ERROR, data));
        dispatch(setStatus(statuses.NOT_INITIALIZED));
  });
};

export const setBot = (id) => dispatch => {
  dispatch(setStatus(statuses.LOADING));
  Bots.list({}, 
    (data) => {
      dispatch(setStatus(statuses.NOT_INITIALIZED));
      let q = data.bots.filter(bot => bot._id === id);
      dispatch(setBotForEdit(q[0]));
    }, (data) => {
        dispatch(setStatus(statuses.ERROR, data));
        dispatch(setStatus(statuses.NOT_INITIALIZED));
  });
};

export const addBot = (values) => dispatch => {
  dispatch(setStatus(statuses.LOADING));
  Bots.add({
      name: values.name,
      description: values.description
    }, () => {
        dispatch(setStatus(statuses.SUCCESS));
        dispatch(showModalWindow());
        dispatch(getBots());
        dispatch(setStatus(statuses.NOT_INITIALIZED));
    }, (data) => {
        dispatch(setStatus(statuses.ERROR, data));
        dispatch(setStatus(statuses.NOT_INITIALIZED));
    });
};

export const deleteBot = (id) => (dispatch) => {
  dispatch(setStatus(statuses.LOADING));
  Bots.delete({
      botid: id
    }, () => {
        dispatch(setStatus(statuses.SUCCESS));
        dispatch(setStatus(statuses.NOT_INITIALIZED));
        dispatch(deleteBotFromList(id));
    }, (data) => {
        dispatch(setStatus(statuses.ERROR, data));
        dispatch(setStatus(statuses.NOT_INITIALIZED));
  });
};

export const editBot = (values, botid, empoloyees) => dispatch => {
  dispatch(setStatus(statuses.LOADING));
  Bots.edit({
      name: values.name,
      description: values.description,
      botid: botid,
      empoloyees: empoloyees
    }, () => {
        dispatch(setStatus(statuses.SUCCESS));
        dispatch(setStatus(statuses.NOT_INITIALIZED));
        dispatch(getBots());
    }, (data) => {
        dispatch(setStatus(statuses.ERROR, data));
        dispatch(setStatus(statuses.NOT_INITIALIZED));
    });
};

export const sendMessage = ( botid, text ) => dispatch => {
  dispatch(setStatus(statuses.LOADING));
  Bots.sendMessage({
    botid: botid,
    text: text
  }, (data) => {
      dispatch(setStatus(statuses.NOT_INITIALIZED));
      dispatch(setMessagesFromServer(data));
  }, (data) => {
      dispatch(setStatus(statuses.ERROR, data));
      dispatch(setStatus(statuses.NOT_INITIALIZED));
  });
};
