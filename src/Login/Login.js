import React, { Component } from "react";
import { Form, Icon, Input } from 'antd';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import { userSession } from '../thunks/login'

const FormItem = Form.Item;
var config = require('../config.js');

class Login extends Component {

  onSubmitHandler = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.userSession(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className={"main__login"}>
        <div className="main__overlow">
          <Link to={'/'} className="login__logo">
            <img src="/img/logo.png" alt=""/>
          </Link>

          <Form className="login-form">

            <FormItem hasFeedback>
              {getFieldDecorator('email', {
                rules: config.validate.email
              })(
                <Input
                  size="large"
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  } placeholder="Введите email" />
              )}
            </FormItem>

            <FormItem hasFeedback>
              {getFieldDecorator('password', {
                rules: config.validate.password
              })(
                <Input
                  size="large"
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="Password" />
              )}
            </FormItem>

            <div className="login__text">
              <div className={"text__account"}>
                <span>Нет аккаунта?</span>
                <Link to={"/register"}>Регистрация</Link>
              </div>
              <div className={"login__forgot"}>
                <Link to={"/forgot"}>Забыли пароль?</Link>
              </div>
            </div>

            <button 
              onClick={this.onSubmitHandler}
              className={"btn__login"} 
              type={"submit"}>Войти</button>

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
  userSession
})

var ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

const WrappedNormalLoginForm = Form.create()(ConnectedLogin);
export default WrappedNormalLoginForm;









// import React, { Component } from "react";
// import { Form, Icon, Input } from 'antd';
// import Users from '../helpers/Api/Users.js';
// import { connect } from 'react-redux';
// import { setErrors, setLoadingStatus } from '../actions/error';
// import {Link} from "react-router-dom";

// const FormItem = Form.Item;

// var helpers = require('../helpers/functions.js');
// var config = require('../config.js');

// class Login extends Component {

//   handleSubmit = (e) => {
//     e.preventDefault();
//     this.props.form.validateFields((err, values) => {
//       if (!err) {
//         var { email, password } = values;

//         this.props.cleanErrors();
//         this.props.setLoadingStatus(true);

//         Users.session({
//           email: email,
//           password: password
//         }, (data) => {
//           helpers.login(data.auth, data.type, data.language_id);
//         }, (code, error) => {
//           this.props.setErrors({
//             email: error
//           });
//           this.props.setLoadingStatus(false);
//         });
//       }
//     });
//   };

//   render() {
//     const { getFieldDecorator } = this.props.form;
//     const errors = this.props.errors;

//     const emailProps = errors.email ? {
//       help: errors.email,
//       validateStatus: 'error'
//     } : (errors.loadingStatus ? {
//       validateStatus: 'validating'
//     } : {});

//     return (
//       <div className={"main__login"}>
//         <div className="main__overlow">
//           <Link to={'/'} className="login__logo">
//             <img src="/img/logo.png" alt=""/>
//           </Link>

//           <Form onSubmit={this.handleSubmit} className="login-form">

//             <FormItem {...emailProps} hasFeedback>
//               {getFieldDecorator('email', {
//                 rules: config.validate.email
//               })(
//                 <Input
//                   size="large"
//                   prefix={
//                     <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
//                   } placeholder="Введите email" />
//               )}
//             </FormItem>

//             <FormItem hasFeedback>
//               {getFieldDecorator('password', {
//                 rules: config.validate.password
//               })(
//                 <Input
//                   size="large"
//                   prefix={
//                     <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
//                   }
//                   type="password"
//                   placeholder="Password" />
//               )}
//             </FormItem>

//             <div className="login__text">
//               <div className={"text__account"}>
//                 <span>Нет аккаунта?</span>
//                 <Link to={"/register"}>Регистрация</Link>
//               </div>
//               <div className={"login__forgot"}>
//                 <Link to={"/forgot"}>Забыли пароль?</Link>
//               </div>
//             </div>

//             <button className={"btn__login"} type={"submit"}>Войти</button>

//           </Form>
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     errors: state.errors
//   }
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     setErrors: (errors) => {
//       dispatch(setErrors(errors));
//     },
//     cleanErrors: () => {
//       dispatch(setErrors({}));
//     },
//     setLoadingStatus: (status) => {
//       dispatch(setLoadingStatus(status));
//     },
//   };
// };

// var ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

// const WrappedNormalLoginForm = Form.create()(ConnectedLogin);
// export default WrappedNormalLoginForm;
