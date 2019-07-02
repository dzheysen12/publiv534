import React, { Component } from 'react';
import MenuLeft from "../component/Menu/MenuLeft";
import { Table, Tabs } from 'antd';
import Error from "./Error";

const TabPane = Tabs.TabPane;

class Message extends Component {
    render() {

        const columns = [
            {title: 'Дата', dataIndex: 'name', key: 'name'},
            {title: 'Время', dataIndex: 'time', key: 'time'},
            {title: 'Сообщение', dataIndex: 'message', key: 'message'},
            {
                title: 'Управление', dataIndex: 'x', key: 'x', render: () => <div style={{display: 'flex'}}>

                    <Error/>
                </div>
            },
        ];

        const data = [
            {
                key: 1,
                name: '12',
                time: 'Test',
                bot: 'New York No. 1 Lake Park',
                service: 'Test',
                employee: 'Test',
                date: 'Дата',
                status: 'Статус'
            },
        ];

        const content = (
            <div>
                <Tabs
                    animated={false}
                    defaultActiveKey="1">

                    <TabPane tab="Ошибки" key="1">
                        <Table
                            columns={columns}
                            dataSource={data}/>
                    </TabPane>

                    <TabPane tab="Не распознанные" key="2">
                        <Table
                            columns={columns}
                            dataSource={data}/>
                    </TabPane>

                </Tabs>

            </div>
        );

        return (
            <div>
                <MenuLeft content={content}/>
            </div>
        );
    };
}

export default Message;
