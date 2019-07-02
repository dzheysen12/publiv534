import React from 'react';
import { successModal, errorModal } from './helpers/modals';

import { connect } from 'react-redux';


class Modal extends React.Component {
  componentDidUpdate() {
    if (this.props.status === 'SUCCESS') {
      successModal();
    } else if (this.props.status === 'ERROR') {
      errorModal(this.props.errorNumber);
    }
  };

  render() {
    return (
      <>
      </>
    )
  }


}
const mstp = state => {
  return {
    status: state.statuses.status,
    errorNumber: state.statuses.errorNumber
  }
}

export default connect(mstp, null)(Modal);