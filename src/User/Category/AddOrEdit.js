import React, { Component } from "react";
import { connect } from 'react-redux';
import { Modal, Input, Button, Form } from 'antd';
import { showModalWindow, setCategoryForEdit } from '../../actions/categories';
import { getCategorForEdit, showAddWindow } from "../../selectors/categories";
import { getCategoriesList } from "../../selectors/categories";
import { getUserObject } from "../../selectors/user";
import { editCategory, addCategory } from "../../thunks/categories";


const FormItem = Form.Item;
const { TextArea } = Input;


class Add extends Component {

  componentDidMount() {
    let category = this.props.category && this.props.category;
    if (!!category) {
      this.setDataInForm(category)
    }
  };

  setDataInForm = (category) => {
    let { form } = this.props;
    form.setFieldsValue({
      name: category.name,
      description: category.description,
    });
  };

  onOkHandler = () => {
    let { category, editCategory, addCategory } = this.props
    this.props.form.validateFields(
      (err, values) => {
        if (!err) {
          if (!!category) {
            editCategory(values, category._id)
          } else {
            addCategory(values);
          }
        }
      }
    )
  };

  onCancelHandler = () => {
    this.onAddModalHandler();
    this.props.setCategoryForEdit(null)
  };

  onAddModalHandler = () => {
    this.props.showModalWindow();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let { categories, showAddWindow } = this.props;
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
          okText={categories ? "Сохранить" : "Добавить"}
          visible={showAddWindow}
          onOk={this.onOkHandler}
          onCancel={this.onCancelHandler}>

          <div className="activator__popup">
            <Form>
              <FormItem label="Название категории" hasFeedback>
                {getFieldDecorator('name', {
                  rules: [{
                    required: true,
                    message: 'Вы не ввели тип категории',
                  }],
                })(
                  <Input size="large" type={"text"} />
                )}
              </FormItem>

              <FormItem label={"Описание"}>
                {getFieldDecorator('description', {
                  rules: [{
                    required: false,
                    message: 'Введите описание',
                  }],
                })(
                  <TextArea
                    placeholder="Описание категории" 
                    autosize={{
                      minRows: 6,
                      maxRows: 10
                    }} />
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
    category: getCategorForEdit(state),
    showAddWindow: showAddWindow(state),
    categories: getCategoriesList(state),
  }
};

const mapDispatchToProps = ({
  showModalWindow,
  setCategoryForEdit,
  editCategory, 
  addCategory
})

const ConnectedAdd = connect(mapStateToProps, mapDispatchToProps)(Add);

const WrappedDynamicRule = Form.create()(ConnectedAdd);
export default WrappedDynamicRule
