import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'moment/locale/ru';
import moment from 'moment';
import { Form, Button } from 'antd';
import AddEditModal from './AddEditModal';
import { setOrderForEdit, showModalWindow, setOrderTime, setOrderDate } from '../../actions/orders';
import { editOrder, addOrder } from '../../thunks/orders';
import { setBotsList } from '../../actions/bots';
import { getEmployeesList } from '../../selectors/employees';
import { getEmployees } from '../../thunks/employees';
import { getServices } from '../../thunks/services';
import { getOrderForEdit, showAddWindow, getOrderTime, getOrderDate } from '../../selectors/orders';
import { getServicesList } from '../../selectors/services';


class OrderEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataWasSet: false
    };

    this.onEditOrderHandler = this.onEditOrderHandler.bind(this);
  }

  componentDidMount() {
    let { employees,
          getEmployees,
          getServices,
          services } = this.props;

    if (!employees.length) {
      getEmployees();
    }

    if (!services.length) {
      getServices()
    }
  };

  onEditOrderHandler (time, date) {
    let { form } = this.props;
    let hour = moment(time).get('hour');
    let minute = moment(time).get('minute');
    let orderTime = moment(date).set('hour', hour)
      .set('minute', minute).toISOString();
    
    form.validateFields(
      (err, values) => {
        if (!err) {

          if (!!this.props.order) {
            let isOrderTime = (!(time && time._d) || !(date && date._d))
              ? time : orderTime;

            let crm_orderid = this.props.order._id;
            this.props.editOrder(values, crm_orderid, isOrderTime);
            form.resetFields();

          } else if (!this.props.order) {
            this.props.addOrder(values, orderTime);
            form.resetFields();
          }
        }
      }
    );
  };

  addModalHandler = () => {
    this.props.showModalWindow();
  };

  render() {
    return (
      <div>
        <Button
          type={"primary"}
          onClick={this.addModalHandler}
          className={"activator__btn"}>Добавить
        </Button>

        {!!this.props.order || this.props.showAddWindow === true ?
          <AddEditModal
            {...this.props}
            onEditOrderHandler={this.onEditOrderHandler}
            addModalHandler={this.addModalHandler}
            time={this.props.time}
            date={this.props.date}/>
          : null
        }
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    employees: getEmployeesList(state),
    services: getServicesList(state),
    order: getOrderForEdit(state),
    showAddWindow: showAddWindow(state),
    date: getOrderDate(state),
    time: getOrderTime(state)
  }
};

const mapDispatchToProps = ({
  setOrderForEdit,
  showModalWindow,
  setBotsList,
  editOrder,
  addOrder,
  getEmployees,
  getServices,
  setOrderDate,
  setOrderTime
});

const ConnectedEditOrder = connect(mapStateToProps, mapDispatchToProps)(OrderEdit);
const WrappedDynamicRule = Form.create()(ConnectedEditOrder);

export default WrappedDynamicRule;
