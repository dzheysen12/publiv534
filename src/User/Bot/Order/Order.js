import React, { Component } from 'react';
import { Table} from 'antd';


class Order extends Component {
  render() {
    const columns = [
      { title: 'Имя', dataIndex: 'name', key: 'name' },
      { title: 'Исполнитель', dataIndex: 'position', key: 'position' },
      { title: 'Услуга', dataIndex: 'service', key: 'service' },
      { title: 'Дата', dataIndex: 'date', key: 'date' }
    ];

    const data = [
      { key: 1,
        name: 'Леонид',
        position: 'Александр',
        service: 'Ремонт машин',
        date: '05.05.2018'
      },
    ];
    return (
      <Table
        bordered
        columns={columns}
        dataSource={data}
      />
    )
  }
}

export default Order;
