import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Radio, Collapse } from 'antd';
import { editUser } from '../../../../thunks/user';
import { getUserObject } from '../../../../selectors/user';


const FormItem = Form.Item;
const Panel = Collapse.Panel;
const config = require('../../../../config.js');


class Settings extends Component {
  constructor() {
    super();
    this.state = {
      formLayout: 'vertical',
    };
  };

  componentDidMount() {
    if (!!this.props.user) {
      this.setDataInForm(this.props.user)
    };
  };

  componentDidUpdate(prevProps) {
     if (this.props.user && this.props.user !== prevProps.user) {
       this.setDataInForm(this.props.user)
     };
  };

  setDataInForm = (user) => {
    this.props.form.setFieldsValue({
      name: user.name,
      email: user.email,
    });
  };

  onEditUserHandler = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.editUser(values)
      }
    })
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Пароли не совпадают');
    } else {
      callback();
    }
  };

  render () {
    const { getFieldDecorator } = this.props.form;
    const { formLayout } = this.state;

    return (
      <div>
        <Form layout={formLayout}>

        <FormItem label="Имя" hasFeedback>
          {getFieldDecorator('name', {
            rules: [{
              required: true,
              message: 'Введите имя',
            }],
          })(
            <Input size="large" />
          )}
        </FormItem>

          <FormItem  label="Email" hasFeedback>
            {getFieldDecorator('email', {
              rules: [{
                required: true,
                message: 'Введите email',
              }],
            })(
              <Input size="large" />
            )}
          </FormItem>

            <div>
              <Collapse  bordered={false} defaultActiveKey={['1']}>
                <Panel showArrow={false} header="Сменить пароль" key="2" >
                  <FormItem  label="Новый пароль" hasFeedback>
                    {getFieldDecorator('password', {
                      rules: config.validate.password_not_required,
                    })(
                      <Input size="large" type={"password"}/>
                    )}
                  </FormItem>

                  <FormItem label="Новый пароль еще раз" hasFeedback>
                    {getFieldDecorator('repeatPassword', {
                      rules: config.validate.password_not_required.concat({
                        validator: this.compareToFirstPassword,
                      }),
                    })(
                      <Input size="large" type={"password"} />
                    )}
                  </FormItem>
                </Panel>
              </Collapse>
            </div>

          {/*<div className={"reveive"}>*/}
          {/*  <span className={"receive__event"}>Получать уведомления</span>*/}

          {/*  <Radio.Group defaultValue="a" buttonStyle="solid">*/}
          {/*    <Radio checked value="a">на Email</Radio>*/}

          {/*    <Radio value="b">на Телефон</Radio>*/}
          {/*  </Radio.Group>*/}
          {/*</div>*/}

          <FormItem style={{marginTop: 15}}>
          <Button type="primary" onClick={this.onEditUserHandler}>
            Сохранить
          </Button>
        </FormItem>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: getUserObject(state)
  }
};

const mapDispatchToProps = ({
  editUser
});

const ConnectedSettings = connect(mapStateToProps, mapDispatchToProps)(Settings);

const WrappedDynamicRule = Form.create()(ConnectedSettings);
export default WrappedDynamicRule;
