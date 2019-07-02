import React, { Component } from 'react';
import MenuLeft from "../component/Menu/MenuLeft";
import { Button, Col, Form, Input, Row } from 'antd';
import AdminSettings from "../../helpers/Api/AdminSettings";
// import AdminSettings from  "../../helpers/Api/AdminSettings";

const FormItem = Form.Item;

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activatePrice: null,
            messagePrice: null,
        };
    }

    componentDidMount() {
        AdminSettings.list({}, (data) => {
            this.setState({
                activatePrice: data.settings.activate_price,
                messagePrice: data.settings.message_price
            })
        });
    }

    onChangePriceHandler = (e) => {
        let val = e.target.value;
        this.setState({
            activatePrice: val
        });
    };

    onChangeMessageHandler = (e) => {
        let val = e.target.value;
        this.setState({
            messagePrice: val

        });
    };

    onSubmitHandler = (e) => {
        e.preventDefault();
        let active = {
            name: "activate_price",
            value: this.state.activatePrice
        };

        let message = {
            name: "message_price",
            value: this.state.messagePrice
        };

        AdminSettings.edit(active, (data) => {
        });
        AdminSettings.edit(message, (data) => {
        })
    };

    render() {
        const content = (
            <div>
                <Row type="flex">
                    <Col lg={24} md={24} xl={18}>
                        <form>
                            <FormItem label="Стоимость активации">
                                <Input
                                    name={"activate_price"}
                                    type="text"
                                    value={this.state.activatePrice}
                                    onChange={this.onChangePriceHandler}/>
                            </FormItem>

                            <FormItem label="Стоимость 1 сообщения">
                                <Input
                                    name={"message_price"}
                                    type="text"
                                    value={this.state.messagePrice}
                                    onChange={this.onChangeMessageHandler}/>
                            </FormItem>

                            <Button
                                onClick={this.onSubmitHandler}
                                type="primary">
                                Сохранить
                            </Button>
                        </form>
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

const WrappedSettings = Form.create()(Setting);
export default WrappedSettings;
