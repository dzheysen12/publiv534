import React, { Component } from 'react';
import MenuLeft from "../component/Menu/MenuLeft";
import { Button, Col, Form, Input, message, Row } from 'antd';
import { connect } from 'react-redux';
import { setCurrentUserId } from '../../actions/usersAdmin';
import { editUser, getUsers } from '../../thunks/usersAdmin';
import { getCurrentUserMoney } from '../../selectors/userAdmin';

const FormItem = Form.Item;

class UserEdit extends Component {

    state = {
        // objectUser: {},
        formLayout: 'vertical',
        checkNick: false,
        inputValue: 1,
        money: '',
    };

    componentDidMount() {
        this.props.getUsers();
        let id = this.props.match.params.userid;
        this.props.setCurrentUserId(id)
    }

    componentWillReceiveProps(prev, next) {
        if (prev.money !== next.money) {
            this.setState({money: prev.money})
        }
    }

    navigateBack = () => {
        window.history.back();
    };

    onChangeHandle = (e) => {
        // this.setState({
        //   ...this.state,
        //   objectUser: {...this.state.objectUser, [e.target.name]: e.target.type === 'number' ?
        //     parseInt(e.target.value) :
        //     e.target.value}
        // });
        this.setState({
            money: e.target.type === 'number' ?
                parseInt(e.target.value) :
                e.target.value
        })
    };

    onSubmitHandle = (e) => {
        e.preventDefault();
        let id = this.props.match.params.userid;
        const money = this.state.money;
        this.props.editUser(id, money)
    };

    render() {
        // const { getFieldDecorator } = this.props.form;
        const {formLayout} = this.state;

        const success = () => {
            message.success('Сохранено');
        };

        if (this.props.status === 'SUCCESS') {
            success()
        }
        const content = (
            <div>
                <Row type="flex">
                    <Col lg={24} md={24} xl={18}>
                        <Form layout={formLayout} onSubmit={this.onSubmitHandle}>
                            {/* <FormItem  label="Имя">
                {getFieldDecorator('name', {
                  rules: [{
                    required: true,
                    message: 'Введите имя',
                  }],
                })(
                  <Input onChange={this.onChangeHandle}
                         type={"text"}
                         name={"name"}
                         required
                  />
                )}
              </FormItem>

              <FormItem  label="Email">
                {getFieldDecorator('email', {
                  rules: [{
                    required: true,
                    message: 'Введите email',
                  }],
                })(
                  <Input onChange={this.onChangeHandle}
                         type={"email"}
                         name={"mail"}
                         required
                  />
                )}
              </FormItem> */}

                            <FormItem label="На счету">
                                <Input onChange={this.onChangeHandle}
                                       type={"number"}
                                       name={"money"}
                                       value={this.state.money}
                                       required/>
                            </FormItem>

                            {/* <FormItem  label="Статус">
                <Input onChange={this.onChangeHandle}
                       type={"text"}
                       name={"status"}
                       required
                />
              </FormItem> */}

                            <FormItem>
                                <div className="btn__back">
                                    <Button onClick={this.navigateBack}>
                                        Назад
                                    </Button>
                                </div>
                                <Button type="primary" htmlType="submit">
                                    Сохранить
                                </Button>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </div>
        );

        return (
            <div>
                <MenuLeft content={content}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    status: state.usersAdmin.status,
    money: getCurrentUserMoney(state)
});

const mapDispatchToProps = {
    editUser,
    getUsers,
    setCurrentUserId
};

const WrappedDynamicRule = Form.create()(connect(mapStateToProps,
    mapDispatchToProps)(UserEdit));
export default WrappedDynamicRule;
