import React, { Component } from 'react';
import { Form, Icon, Input } from 'antd';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import  { userRegister } from '../thunks/login';


const FormItem = Form.Item;
var config = require('../config.js');


class Register extends Component {

  onSubmitHandler = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.userRegister(values);
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Пароли не совпадают');
    } else {
      callback();
    }
  };

  render(){
    const { getFieldDecorator } = this.props.form;

    return(
      <div className={"main__login"}>
        <div className="main__overlow">
          <Link to={'/'} className="login__logo">
            <img src="/img/logo.png" alt=""/>
          </Link>

          <Form className="login-form">

            <FormItem hasFeedback>
              {getFieldDecorator('name', {
                rules: [{
                  required: true,
                  message: 'Введите имя'
                }],
              })(
                <Input
                  size="large"
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  } placeholder="Имя" />
              )}
            </FormItem>

            {/*<FormItem hasFeedback>*/}
              {/*{getFieldDecorator('surname', {*/}
                {/*rules: [{*/}
                  {/*required: true,*/}
                  {/*message: 'Введите фамилию'*/}
                {/*}],*/}
              {/*})(*/}
                {/*<Input*/}
                  {/*prefix={*/}
                    {/*<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />*/}
                  {/*} placeholder="Фамилия" />*/}
              {/*)}*/}
            {/*</FormItem>*/}

            <FormItem hasFeedback>
            {getFieldDecorator('email', {
                rules: config.validate.email
              })(
                <Input
                  size="large"
                  prefix={

                    <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="email"
                  placeholder="Email" />
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
                  } placeholder="Пароль" />
              )}
            </FormItem>

            {/*<FormItem hasFeedback>*/}
              {/*{getFieldDecorator('repeatPassword', {*/}
                {/*rules: config.validate.password.concat({*/}
                  {/*validator: this.compareToFirstPassword,*/}
                {/*}),*/}
              {/*})(*/}
                {/*<Input*/}
                  {/*prefix={*/}
                    {/*<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />*/}
                  {/*} placeholder="Повторите пароль" />*/}
              {/*)}*/}
            {/*</FormItem>*/}

            <span>У Вас уже есть аккаунт?
              <Link to="/login" style={{marginLeft: '5px'}}>Войти</Link>
            </span>

            <button 
              onClick={this.onSubmitHandler}
              className={"btn__login"} 
              type={"submit"} >Регистрация</button>
          </Form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors
  }
};

const mapDispatchToProps = ({
  userRegister
});

var ConnectedRegister = connect(mapStateToProps, mapDispatchToProps)(Register);

const WrappedNormalLoginForm = Form.create()(ConnectedRegister);
export default WrappedNormalLoginForm;



// import React, { Component } from 'react';
// import { Form, Icon, Input } from 'antd';
// import Users from '../helpers/Api/Users.js';
// import { connect } from 'react-redux';
// import { setErrors, setLoadingStatus } from '../actions/error';
// import {Link} from "react-router-dom";
// const FormItem = Form.Item;
// var helpers = require('../helpers/functions.js');
// var config = require('../config.js');


// class Register extends Component {

//   handleSubmit = (e) => {
//     e.preventDefault();
//     this.props.form.validateFields((err, values) => {
//       if (!err) {
//         const { email, password, name, surname } = values;

//         this.props.cleanErrors();
//         this.props.setLoadingStatus(true);

//         Users.register({
//           name: name,
//           surname: surname,
//           email: email,
//           password: password,
//           usertype: 'user'
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

//   compareToFirstPassword = (rule, value, callback) => {
//     const form = this.props.form;
//     if (value && value !== form.getFieldValue('password')) {
//       callback('Пароли не совпадают');
//     } else {
//       callback();
//     }
//   };


//   render(){
//     const { getFieldDecorator } = this.props.form;

//     const errors = this.props.errors;

//     const emailProps = errors.email ? {
//       help: errors.email,
//       validateStatus: 'error'
//     } : (errors.loadingStatus ? {
//       validateStatus: 'validating'
//     } : {});


//     return(
//       <div className={"main__login"}>
//         <div className="main__overlow">
//           <Link to={'/'} className="login__logo">
//             <img src="/img/logo.png" alt=""/>
//           </Link>

//           <Form onSubmit={this.handleSubmit} className="login-form">

//             <FormItem hasFeedback>
//               {getFieldDecorator('name', {
//                 rules: [{
//                   required: true,
//                   message: 'Введите имя'
//                 }],
//               })(
//                 <Input
//                   size="large"
//                   prefix={
//                     <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
//                   } placeholder="Имя" />
//               )}
//             </FormItem>

//             {/*<FormItem hasFeedback>*/}
//               {/*{getFieldDecorator('surname', {*/}
//                 {/*rules: [{*/}
//                   {/*required: true,*/}
//                   {/*message: 'Введите фамилию'*/}
//                 {/*}],*/}
//               {/*})(*/}
//                 {/*<Input*/}
//                   {/*prefix={*/}
//                     {/*<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />*/}
//                   {/*} placeholder="Фамилия" />*/}
//               {/*)}*/}
//             {/*</FormItem>*/}

//             <FormItem {...emailProps} hasFeedback>
//             {getFieldDecorator('email', {
//                 rules: config.validate.email
//               })(
//                 <Input
//                   size="large"
//                   prefix={

//                     <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
//                   }
//                   type="email"
//                   placeholder="Email" />
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
//                   } placeholder="Пароль" />
//               )}
//             </FormItem>

//             {/*<FormItem hasFeedback>*/}
//               {/*{getFieldDecorator('repeatPassword', {*/}
//                 {/*rules: config.validate.password.concat({*/}
//                   {/*validator: this.compareToFirstPassword,*/}
//                 {/*}),*/}
//               {/*})(*/}
//                 {/*<Input*/}
//                   {/*prefix={*/}
//                     {/*<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />*/}
//                   {/*} placeholder="Повторите пароль" />*/}
//               {/*)}*/}
//             {/*</FormItem>*/}

//             <span>У Вас уже есть аккаунт?
//               <Link to="/login" style={{marginLeft: '5px'}}>Войти</Link>
//             </span>

//             <button className={"btn__login"} type={"submit"}>Регистрация</button>
//           </Form>
//         </div>
//       </div>
//     )
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

// var ConnectedRegister = connect(mapStateToProps, mapDispatchToProps)(Register);

// const WrappedNormalLoginForm = Form.create()(ConnectedRegister);
// export default WrappedNormalLoginForm;
