import React, { Component } from "react";
import { Modal, Input, Button, Form, Select } from 'antd';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { showModalWindow, setServiceForEdit } from '../../actions/services';
import { getServiceForEdit, showAddWindow } from "../../selectors/services";
import { getCategoriesList } from "../../selectors/categories";
import { getUserObject } from "../../selectors/user";
import { editService, addService } from "../../thunks/services";


const FormItem = Form.Item;
const Option = Select.Option;
const config = require('../../config.js');



class Add extends Component {

  componentDidMount() {
    let service = this.props.service && this.props.service;
    if (!!service) {
      this.setDataInForm(service)
    }
  }

  setDataInForm = (service) => {
    let { form } = this.props;
    form.setFieldsValue({
      name: service.name,
      description: service.description,
      price: service.price,
    });
  };

  onOkHandler = () => {
    let {service, editService, addService} = this.props;
    this.props.form.validateFields(
      (err, values) => {
        if (!err) {
          if (!!service) {
            editService( values, service._id)
          } else {
            addService(values);
            }
        }
      }
    )
  };

  onCancelHandler = () => {
    this.onAddModalHandler();
    this.props.setServiceForEdit(null)
  };

  onAddModalHandler = () => {
    this.props.showModalWindow();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let { service, showAddWindow } = this.props;
    return (
      <div>
        <Button
          type={"primary"}
          onClick={this.onAddModalHandler}
          className={"activator__btn"}> Добавить
        </Button>

        <Modal
          centered
          cancelText="Отмена"
          okText={service ? "Сохранить" : "Добавить"}
          visible={showAddWindow}
          onOk={this.onOkHandler}
          onCancel={this.onCancelHandler}>

          <div className="activator__popup">
            <Form>
              {this.props.categories.length > 0 ?
                <FormItem label="Категория">
                {getFieldDecorator('categoryid', {
                  rules: [{
                    required: true,
                    message: 'Вы не ввели категория',
                  }]
                })(
                  <Select size="large" style={{ width: '100%' }}>
                    {this.props.categories.map(function (category, key) {
                      return (
                        <Option
                          getfieldvalue={category._id}
                          key={key}
                          value={category._id}>
                          {category.name}
                        </Option>);
                    })}
                  </Select>
                )}
                </FormItem> :
                <>
                  <p>У вас пока нет ни одной категории, </p>
                  <p>для создания услуги необходима категория услуги.</p>
                  <p> Перейти к созданию категории: </p>
                    <NavLink
                      to={`/user/category`}
                      className={"btn__border--gray mb-1"}>Категории
                    </NavLink>
                </>
              }

              <FormItem  label="Название услуги" hasFeedback>
                {getFieldDecorator('name', {
                  rules: [{
                    required: true,
                    message: 'Вы не ввели тип услуги',
                  }],
                })(
                  <Input size="large" type={"text"} />
                )}
              </FormItem>

              <FormItem label="Цена">
                {getFieldDecorator('price', {
                  rules: config.validate.price,
                })(
                  <Input size="large" type={"number"} addonAfter="RUB" />
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
    user: getUserObject(state),
    service: getServiceForEdit(state),
    showAddWindow: showAddWindow(state),
    categories: getCategoriesList(state),
  }
};

const mapDispatchToProps = ({
  showModalWindow,
  setServiceForEdit,
  editService,
  addService
})

const ConnectedAdd = connect(mapStateToProps, mapDispatchToProps)(Add);

const WrappedDynamicRule = Form.create()(ConnectedAdd);
export default WrappedDynamicRule
