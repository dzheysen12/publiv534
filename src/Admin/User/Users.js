import React, { Component } from 'react';
import MenuLeft from "../component/Menu/MenuLeft";
import {Button, Icon, Input, Table} from 'antd';
import moment from 'moment';
import { deleteUser, getUsers, requestUserData } from '../../thunks/usersAdmin';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { getUsersList } from '../../selectors/userAdmin';
import Highlighter from "react-highlight-words";

class Users extends Component {

    state = {
        searchText: '',
    };

  componentDidMount() {
    this.props.getUsers();
  };

  deleteUserFromList = (e) => {
    const _id = e.target.getAttribute('_id');
    this.props.deleteUser(_id);
  };

  onChangePageHandler = (userid) => {
    this.props.requestUserData(userid);
  };

  getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text ? text.toString() : text}
            />
        ),
    });

  handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

  handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    // moment(time).format('DD.MM.YYYY, HH:mm')
  render() {
    const columns = [
      {
        title: 'Имя', 
        dataIndex: 'name', 
        key: 'name', 
        ...this.getColumnSearchProps('name')
      },
      {
        title: 'Email', 
        dataIndex: 'email', 
        key: 'email', 
        ...this.getColumnSearchProps('email')
      },
      {
        title: 'Телефон', 
        dataIndex: 'phoneNumber', 
        key: 'phoneNumber', 
        ...this.getColumnSearchProps('phoneNumber')
      },
      {
        title: 'Последняя активность', 
        dataIndex: 'updatedAt', 
        key: 'updatedAt', 
        render: (updatedAt) => moment(updatedAt).format('DD.MM.YYYY, HH:mm')
      },
      {
        title: 'Последняя активность бота', 
        dataIndex: 'lastBotActivity', 
        key: 'lastBotActivity', 
        render: (lastBotActivity) => moment(lastBotActivity).format('DD.MM.YYYY, HH:mm')
      },
      {
        title: 'Дата регистрации', 
        dataIndex: 'createdAt', 
        key: 'createdAt',
        render: (createdAt) => moment(createdAt).format('DD.MM.YYYY, HH:mm'),
      },
      {
        title: 'Кол. ботов', 
        dataIndex: 'numberOfBots', 
        key: 'numberOfBots'
      },
      {
        title: 'Статус', 
        dataIndex: 'status', 
        key: 'status'
      },
      {
        title: 'Баланс', 
        dataIndex: 'money', 
        key: 'money', 
        ...this.getColumnSearchProps('money')
      },
      {title: 'Управление', dataIndex: 'x', key: 'x', render: (text, record, index) =>
        <div>
          <Button
            onClick={() => this.onChangePageHandler(record._id)}
            className={"btn__edit"}>
            <Icon type="export"/>
          </Button>

          <Link to={`/admin/user/edit/${record._id}`}>
            <Button
              className={"btn__edit"}>
              <Icon type="edit"/>
            </Button>
          </Link>

          <Button _id={record._id} onClick={this.deleteUserFromList}>
            <Icon type="delete"/>
          </Button>
        </div>
      },
    ];

    const content = (
      <div>
        {/* <Add/> */}
          <Table className="adminTable" rowKey={'_id'}
                 columns={columns}
                 dataSource={this.props.users} />
      </div>
    );

      return (
        <div>
          <MenuLeft content={content}/>
        </div>
      );
  };
};







const mapStateToProps = state => ({
    users: getUsersList(state),
});

const mapDispatchToProps = {
    getUsers,
    deleteUser,
    requestUserData
};

export default Users = connect(mapStateToProps, mapDispatchToProps)(Users);
