import React from 'react';
import {
  Form, Input, Row,
  Select, Modal, Col
} from 'antd';
import * as Datetime from 'react-datetime';



const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class AddEditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataWasSet: false,
    };
  };

  componentDidMount() {
    let order = this.props.order && this.props.order
    if (!!order) {
      this.setDataInForm(order)
    }
  };

  setDataInForm = (order) => {
    let { form } = this.props;
    let service = order.service && order.service._id;
    let employee = order.employee && order.employee._id;
    let description = order.description && order.description;
    form.setFieldsValue({
      name: order.name,
      service: service,
      employee: employee,
      contacts: order.contacts,
      description: description,
    });
  };

  orderTime = (time) => {
    this.props.setOrderTime(time)
  };

  orderDate = (date) => {
    this.props.setOrderDate(date)
  };

  onCancelHandler = () => {
    this.props.setOrderDate(null);
    this.props.setOrderTime(null);
    this.props.setOrderForEdit(null);
    this.props.form.resetFields();
    this.props.addModalHandler()
  };

  render() {
    let { getFieldDecorator } = this.props.form
    return (
      <Modal
        centered
        cancelText="Отмена"
        okText={!!this.props.order ? "Сохранить" : "Добавить"}
        visible={this.props.showAddWindow}
        onOk={() => { this.props.onEditOrderHandler(this.props.time, this.props.date)}}
        onCancel={this.onCancelHandler}>

        <div className="activator__popup">
          <Form >
            <FormItem label="Имя клиента" hasFeedback>
              {getFieldDecorator('name', {
                rules: [{
                  required: true,
                  message: 'Введите имя',
                }],
              })(
                <Input size="large" />
              )}
            </FormItem>

            <FormItem label="Контакты" hasFeedback>
              {getFieldDecorator('contacts', {
                rules: [{
                  required: true,
                  message: 'Введите контакты',
                }],
              })(
                <Input size="large" />
              )}
            </FormItem>

            <Row type="flex" gutter={12}>
              <Col span={8} >
                <FormItem label="Время" required >
                  {/* {getFieldDecorator('time', {
                    rules: [{
                      required: true,
                      message: 'Введите время',
                    }],
                  })( */}
                    <Datetime
                      className="order-time"
                      // value={this.state.time}
                      value={this.props.time}
                      onChange={this.orderTime}
                      dateFormat={false}
                      locale={"ru"} />
                      {/* )} */}
                      
                </FormItem>
              </Col>

              <Col span={16} >
                <FormItem label="Дата" required >
                  
                  {/* {getFieldDecorator('date', {
                    rules: [{
                      required: true,
                      message: 'Введите дату',
                    }],
                  })( */}

                    <Datetime
                      className="order-time"
                      // value={this.state.date}
                      value={this.props.date}
                      onChange={this.orderDate}
                      dateFormat={true}
                      timeFormat={false}
                      locale={"ru"} />
                  {/* )}   */}
                </FormItem>
              </Col>
            </Row>
            <FormItem label="Услуга">
              {getFieldDecorator('service', {
                rules: [{
                  required: true,
                  message: 'Вы не ввели услугу',
                }]
              })(
                <Select size="large" style={{ width: '100%' }}>
                  {this.props.services.map(function (service, key) {
                    return (<Option getfieldvalue={service._id} key={key} value={service._id}>{service.name}</Option>);
                  })}
                </Select>
              )}
            </FormItem>

            <FormItem label="Менеджер">
              {getFieldDecorator('employee', {})(
                <Select size="large" style={{ width: '100%' }}>
                  {this.props.employees.map(function (employee, key) {
                    return (<Option getfieldvalue={employee._id} key={key} value={employee._id}>{employee.name}</Option>);
                  })}
                </Select>
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator('description', {
                rules: [{
                  required: false,
                  message: 'Введите описание',
                }],
              })(
                <TextArea
                  placeholder={'Комментарий к заказу'}
                  autosize={{
                    minRows: 3,
                    maxRows: 6
                  }} />
                )
              }
            </FormItem>
          </Form>
        </div>
      </Modal>
    )
  }
};

export default AddEditModal;
