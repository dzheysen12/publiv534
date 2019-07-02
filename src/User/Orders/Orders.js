import React, { Component } from 'react'
import {Form, Table, Button, Icon, Row, Col} from 'antd';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import MenuLeft from "../components/Menu/Menu";
import NoData from "../components/NoData/NoData";
import OrderEdit from './OrderEdit';
import { setOrderForEdit, showModalWindow, setOrderDate, setOrderTime } from '../../actions/orders';
import { getOrdersList, deleteOrder } from '../../thunks/orders';
import { getBots } from '../../thunks/bots';
import { getBotsList } from '../../selectors/bots';
import { getOrders } from '../../selectors/orders';
import { getEmployeesList } from '../../selectors/employees';


class Orders extends Component {
  componentDidMount() {
    if (!this.props.orders.length) {
      this.props.getOrdersList()
    }
  };

  onEditOrderHandler = (order) => {
    this.props.setOrderForEdit(order);
    this.props.setOrderDate(moment(order.time));
    this.props.setOrderTime(moment(order.time));
    this.props.showModalWindow();
  };

  render() {
    let { orders } = this.props,
      data = orders.length;

    const columns = [
      {
        title: 'Имя клиента',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Контакты',
        dataIndex: 'contacts',
        key: 'contacts'
      },
      {
        title: 'Начало приема',
        dataIndex: 'time',
        key: 'time',
        render: (time) => moment(time).format('DD.MM.YYYY, HH:mm')
      },
      {
        title: 'Источник',
        dataIndex: 'bot',
        key: 'bot',
        render: (bot) => bot ? bot.name : "Запись добавлена вручную"
      },
      {
        title: 'Сервис',
        dataIndex: 'service',
        key: 'service',
        render: (service) => service ? service.name : ''
      },
      {
        title: 'Менеджер',
        dataIndex: 'employee',
        key: 'employee',
        render: (employee) => employee && employee.name + " " + employee.surname
      },
      {
        title: 'Управление', dataIndex: '', key: 'action', render: (order, record) => {
          let onEdit = () => this.onEditOrderHandler(order);
          let onDelete = () => this.props.deleteOrder(record._id);

          return (
            <div>
              <Button
                onClick={onEdit}
                className={"btn__edit"}>
                <Icon type="edit" />
              </Button>

              <Button
                onClick={onDelete}>
                <Icon type="delete" />
              </Button>
            </div>)
        }
      },
    ];

    const content = (
      <>
        { data > 0 ?
          <Row type="flex">
            <Col lg={24} md={24} xl={18}>

              <OrderEdit />

              <Table
                bordered
                columns={columns}
                dataSource={orders}
                rowKey="_id"/>
            </Col>
          </Row> :
            <div className={"no-data--main"}>
              <div className={"data__main--column"}>
                <NoData/>
                  <span style={{padding: "10px 0"}}>У вас пока нет ни одного заказа</span>
                <OrderEdit />
              </div>
            </div>
        }
      </>
    );

    return (
      <div>
        <MenuLeft content={content} />
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    orders: getOrders(state),
    employees: getEmployeesList(state),
    bots: getBotsList(state),
  }
};

const mapDispatchToProps = ({
    getOrdersList,
    deleteOrder,
    setOrderForEdit,
    showModalWindow,
    getBots,
    setOrderDate,
    setOrderTime
  }
);

const ConnectedOrders = withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders));

export default Form.create()(ConnectedOrders);
