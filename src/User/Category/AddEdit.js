import  React, { Component }  from  'react'
import {Form, Input, Button, message, Row, Col} from 'antd';
import MenuLeft from '../components/Menu/Menu';
import { setErrors, setLoadingStatus } from '../../actions/error';
import { addCategoryToList, setCategoryForEdit, saveCategory, setCategoryList }
  from '../../actions/category';
import { connect } from 'react-redux';
import Category from "../../helpers/Api/Category";
const helpers = require('../../helpers/functions.js');

const FormItem = Form.Item;
const { TextArea } = Input;

class AddEdit extends Component {
  state = {
    value: '',
  };

  setDataInForm = () => {
    this.props.form.setFieldsValue({
      name: this.props.category.name,
      description: this.props.category.description,
    });
  };

  setCategoryForEdits = () => {
    const index = this.props.match.params.id;
    if (index) {
      this.props.setCategoryForEdit(index);
    }
  };

  componentWillMount () {
    if (!this.props.categories.dataWasLoad) {
      Category.list({}, (data) => {
        this.props.setCategoryList(data.categories);
        this.setCategoryForEdits();
      });

    }
    else {
      this.setCategoryForEdits();
    }
  }

  componentDidUpdate(prevProps) {
    const chooseCategoryForEdit = prevProps.category === null && this.props.category;

    if (chooseCategoryForEdit) {
      this.setDataInForm();
    }
  }

  onOkHandler = () => {
    this.props.form.validateFields(
      (err, values) => {

        if (!err) {
          this.props.cleanErrors();
          this.props.setLoadingStatus(true);

          if (this.props.category) {
            Category.edit({
              ...values,
              categoryid: this.props.category._id,
            }, (data) => {
              this.props.saveCategory(data, this.props.category_index);
              this.props.setLoadingStatus(false);

              message.success('Сохранено');
            }, (code, error) => {
              this.props.setErrors({
                name: error
              });
              this.props.setLoadingStatus(false);
            });
          } else {
            Category.add({
              ...values,
            }, (data) => {
              this.props.addCategoryToList(data);
              this.props.setLoadingStatus(false);
              message.success('Создана новая категория');
              helpers.redirect('user/position');

            }, (code, error) => {
              this.props.setErrors({
                name: error
              });
              this.props.setLoadingStatus(false);
            });
          }
        }
      },
    );
  };

  render(){
    const { getFieldDecorator } = this.props.form;
    const errors = this.props.errors;

    const nameProps = errors.name ? {
      help: errors.name,
      validateStatus: 'error'
    } : (errors.loadingStatus ? {
      validateStatus: 'validating'
    } : {});

    const content = (
        <Form layout={'vertical'}>
          <FormItem   label="Название" hasFeedback>
            {getFieldDecorator('name', {
              rules: [{
                required: true,
                message: 'Введите название',
              }],
            })(
              <Input  size="large" />
            )}
          </FormItem>

          <FormItem label={"Описание"}>
            {getFieldDecorator('description', {
              rules: [{
                required: true,
                message: 'Введите описание',
              }],
            })(
              <TextArea
                placeholder="Описание категории" autosize
                autosize={{
                minRows: 6,
                maxRows: 10
              }} />
            )}
          </FormItem>

          <FormItem>

            <Button onClick={this.onOkHandler} type="primary">
              Сохранить
            </Button>
          </FormItem>
        </Form>
    );

    return(
      <div>
        <Row type="flex">
          <Col lg={24} md={24} xl={18}>
            <MenuLeft content={content}/>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors,
  categories: state.categories,
  category: state.categories.category_for_edit.payload,
  category_index: state.categories.category_for_edit.index,
});

const mapDispatchToProps = dispatch => {
  return {
    setErrors: (errors) => {
      dispatch(setErrors(errors));
    },
    cleanErrors: () => {
      dispatch(setErrors({}));
    },
    setLoadingStatus: (status) => {
      dispatch(setLoadingStatus(status));
    },
    addCategoryToList: (category) => {
      dispatch(addCategoryToList(category));
    },
    setCategoryList: (list) => {
      dispatch(setCategoryList(list));
    },
    setCategoryForEdit: (index) => {
      dispatch(setCategoryForEdit(index));
    },
    unsetCategoryForEdit: () => {
      dispatch(setCategoryForEdit(-1));
    },
    saveCategory: (position, index) => {
      dispatch(saveCategory(position, index));
    },
  };
};

const ConnectedPositionEdit = connect(mapStateToProps, mapDispatchToProps)(AddEdit);
const WrappedDynamicRule = Form.create()(ConnectedPositionEdit);
export default WrappedDynamicRule;
