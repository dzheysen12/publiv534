import React, { Component } from "react";
import { Modal, Input, Button, Form } from 'antd';
import { connect } from 'react-redux';
import { addBot } from '../../thunks/bots';
import { showModalWindow } from "../../actions/bots";
import { getUserObject } from "../../selectors/user";
import { showAddWindow } from "../../selectors/bots";

const FormItem = Form.Item;
const { TextArea } = Input;


class Add extends Component {

  onAddBotHandler = () => {
    let { form, addBot } = this.props;
    form.validateFields(
      (err, values) => {
         if (!err) {
          addBot(values);
          form.resetFields();
        }
      }
    )
  };

  addModalHandler = () => {
    this.props.showModalWindow();
  };

  onCancelHandler = () => {
    this.props.showModalWindow();
    this.props.form.resetFields();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Button
          type={"primary"}
          onClick={this.addModalHandler}
          className={"activator__btn"}>
          Добавить
        </Button>

        <Modal
          centered
          cancelText="Отмена"
          okText={"Сохранить"}
          visible={this.props.showAddWindow}
          onOk={this.onAddBotHandler}
          onCancel={this.onCancelHandler}>

          <div className="activator__popup">
            <Form>
              <FormItem label="Название" hasFeedback>
                {getFieldDecorator('name', {
                  rules: [{
                    required: true,
                    message: 'Введите название',
                  }],
                })(
                  <Input size="large" />
                )}
              </FormItem>

              <FormItem label="Описание">
                {getFieldDecorator('description', {
                    rules: [{
                        required: true,
                        message: 'Вы не ввели описание',
                      }],
                })(
                  <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
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
    showAddWindow: showAddWindow(state)
  }
};

const mapDispatchToProps = ({
  addBot,
  showModalWindow
});

const ConnectedAdd = connect(mapStateToProps, mapDispatchToProps)(Add);

const WrappedDynamicRule = Form.create()(ConnectedAdd);
export default WrappedDynamicRule
