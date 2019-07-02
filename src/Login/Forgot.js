import React, { Component } from 'react';
import { Form, Icon, Input } from 'antd';
import { connect } from 'react-redux';
import { forgot } from '../thunks/login';
import {Link} from "react-router-dom";


const FormItem = Form.Item;
var config = require('../config.js');

class Forgot extends Component {

  onSubmitHandler = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.forgot(values.email);
      }
    });
  };

  render(){
    const { getFieldDecorator } = this.props.form;

    return (
      <div className={"main__login"}>
        <div className="main__overlow">
          <Link to={'/'} className="login__logo">
            <img src="/img/logo.png" alt=""/>
          </Link>

          <div className="forgot__text">
            <span>Восстановить пароль или
              <Link to="/login" style={{marginLeft: '5px'}}>Войти</Link>
            </span>

            <span>
              Введите адрес электронной почты <br/> для получения пароля
            </span>
          </div>

          <Form className="login-form">

            <FormItem hasFeedback>
            {getFieldDecorator('email', {
                rules: config.validate.email
              })(
                <Input
                  size="large"
                  prefix={
                    <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                  } placeholder="Email" />
              )}
            </FormItem>

            <button 
              onClick={this.onSubmitHandler}
              className={"btn__login"} 
              type={"submit"}>Восстановить пароль</button>

          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors
  }
};

const mapDispatchToProps = ({
  forgot
});

var ConnectedForgot = connect(mapStateToProps, mapDispatchToProps)(Forgot);

const WrappedNormalLoginForm = Form.create()(ConnectedForgot);
export default WrappedNormalLoginForm;
