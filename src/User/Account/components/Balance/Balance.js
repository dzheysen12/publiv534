import React, { Component } from 'react';
import { Input, Select, Form, Button } from 'antd';
import { connect } from 'react-redux';
import { getUserObject } from '../../../../selectors/user.js';

const Option = Select.Option;
const FormItem = Form.Item;

 class Balance extends Component {
   check = () => {
     this.props.form.validateFields(
       (err) => {
         if (!err) {
           console.info('success');
         }
       },
     );
   };

 render() {
    const { getFieldDecorator } = this.props.form;
    let money = this.props.user && this.props.user.money;
   return(
     <div>
       <div className="account__balance">

         <div className="balance__money">
           <span className={"balance__text"}>Ваш баланс: </span>

           <span className={"balance__number"}>{money || 0}руб</span>
         </div>

       </div>

       <div style={{ marginBottom: 16 }}>
         <FormItem label="Введите сумму для пополнения">
           {getFieldDecorator('username', {
             rules: [{
               required: true,
               message: 'Вы не ввели сумму для пополнения',
             }],
           })(
             <Input  size="large" type={'number'} addonAfter="RUB"/>
           )}

         </FormItem>

         <FormItem label="Выберите способы пополнить баланс:">
           <Select size="large" defaultValue="Оплата картой" style={{ width: '100%' }}>
             <Option value="1">Яндекс деньги</Option>

             <Option value="2">Оплата картой</Option>
           </Select>

           <Button onClick={this.check} type="primary">Пополнить</Button>
         </FormItem>


       </div>
     </div>
   );
 }
 }

const mapStateToProps = state => {
  return {
    user: getUserObject(state),
  }
};

const ConnectedBalance = connect(mapStateToProps, null)(Balance);

const WrappedDynamicRule = Form.create()(ConnectedBalance);
export default WrappedDynamicRule;
