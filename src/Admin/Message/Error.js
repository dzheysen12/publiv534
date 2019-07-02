import React, { Component } from 'react';
import { Button, Icon, Modal } from 'antd';
import {Link} from "react-router-dom";

class Error extends Component {
    state = {visible: false};

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <Link to="/admin/message/dialog">
                    <Button className={"btn__edit"}>
                        Перейти в диалог
                    </Button>
                </Link>

                <Button
                    onClick={this.showModal}
                    className={"btn__edit"}>
                    <Icon type="message"/>
                </Button>

                <Modal
                    width={700}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>

                    <ul className={"history__list"} style={{marginTop: '40px'}}>
                        <li className={"history__item"}>
                            <div className="error__message">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet blanditiis
                                consectetur culpa dolorum ducimus esse, nihil non perspiciatis quas vel?
                            </div>
                        </li>
                    </ul>
                </Modal>
            </div>
        );
    }
}

export default Error;
