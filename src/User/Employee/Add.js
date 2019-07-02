import React, { Component } from "react";
import { Modal, Input, Form, Select, Icon, Button } from 'antd';
import { connect } from 'react-redux';
import * as config from '../../config';
import { editEmployee, addEmployee } from '../../thunks/employees';
import { getPositions } from "../../selectors/positions";
import { getUserForEdit, showAddWindow } from "../../selectors/employees";
import { setEmployeeForEdit, showModalWindow } from '../../actions/employees';
import { setPositionsList } from '../../actions/positions';


const FormItem = Form.Item;
const Option = Select.Option;

class Add extends Component {
  state = {
    dataWasSet: false
  };

  componentDidMount() {
    let employee = this.props.employee && this.props.employee;
    if (!!employee) {
      this.setDataInForm(employee)
    }
  };

  onAddModalHandler = () => {
    this.props.showModalWindow();
  };

  onCancelHandler = () => {
    this.props.form.resetFields();
    this.setState({ dataWasSet: false });
    this.onAddModalHandler();
  };

  componentWillUnmount() {
    this.props.setEmployeeForEdit(null);
  };

  setDataInForm = (employee) => {
    let { form } = this.props;

    form.setFieldsValue({
      name: employee.name,
      email: employee.email,
      surname: employee.surname,
      // password: employee.password,
      position: employee.position
    });
    this.setState({ dataWasSet: true });
  };

  check = () => {
    let { form, employee, editEmployee, addEmployee } = this.props;

    form.validateFields(
      (err, values) => {
        if (!err) {
          if (!!employee) {
            editEmployee(values, employee._id);
                form.resetFields();
          } else {
            addEmployee(values, 'employee');
              form.resetFields();
          }
        }
      },
    );
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let { positions, employee, showAddWindow } = this.props;

    return (
      <div>
        <Button
          type={"primary"}
          onClick={this.onAddModalHandler}
          className={"activator__btn"}>Добавить
        </Button>

        <Modal
          centered
          cancelText="Отмена"
          okText={employee ? "Сохранить" : "Добавить"}
          visible={showAddWindow}
          onOk={this.check}
          onCancel={this.onCancelHandler}>

          <div className="activator__popup">
            <Form>
              <FormItem label="Имя" hasFeedback>
                {getFieldDecorator('name', {
                  rules: [{
                    required: true,
                    message: 'Вы не ввели имя',
                  }],
                })(
                  <Input type={"text"} size="large"/>
                )}
              </FormItem>

              <FormItem label="Фамилия" hasFeedback>
                {getFieldDecorator('surname', {
                  rules: [{
                    required: true,
                    message: 'Вы не ввели фамилию',
                  }],
                })(
                  <Input type={"text"} size="large"/>
                )}
              </FormItem>

              <FormItem label="Email" hasFeedback>
                {getFieldDecorator('email', {
                  rules: config.validate.email
                })(
                  <Input
                    prefix={
                      <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    type="email"
                    placeholder="Email" 
                    size="large"
                  />
                )}
              </FormItem>

              <FormItem label="Пароль" hasFeedback>
                {getFieldDecorator('password', {
                  rules: config.validate.password
                })(
                  <Input disabled={false}
                    prefix={
                      <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                    } placeholder="Пароль" size="large"/>
                )}
              </FormItem>

              <FormItem label="Должность" hasFeedback>
                {getFieldDecorator('position', {
                  rules: [{
                    required: true,
                    message: 'Вы не ввели должность',
                  }]
                })(
                  <Select style={{ width: '100%' }} size="large">
                    {positions.map(function (position, key) {
                      return (<Option key={key} value={position._id}>{position.name}</Option>);
                    })}

                  </Select>
                )}
              </FormItem>
            </Form>
          </div>
        </Modal>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    positions: getPositions(state),
    employee: getUserForEdit(state),
    showAddWindow: showAddWindow(state),
  }
};

const mapDispatchToProps = ({
  setPositionsList,
  setEmployeeForEdit,
  showModalWindow,
  editEmployee,
  addEmployee
})

const ConnectedAdd = connect(mapStateToProps, mapDispatchToProps)(Add);

const WrappedDynamicRule = Form.create()(ConnectedAdd);
export default WrappedDynamicRule
