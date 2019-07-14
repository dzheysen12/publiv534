import  React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {Table, Button, Icon, Row, Col} from 'antd';
import Popup from './BotAdd';
import NoData from "../components/NoData/NoData";
import MenuLeft from "../components/Menu/Menu";
import { getBots, deleteBot } from '../../thunks/bots';
import { getBotsList } from '../../selectors/bots';
import { setBotForEdit } from '../../actions/bots';
import { getUserObject } from '../../selectors/user';
import { getEmployeesList } from '../../selectors/employees';


class BotList extends Component {

  componentDidMount () {
    if (!this.props.bots.length) {
      this.props.getBots()
    };
  };

  onDeleteBotHandler = (e) => {
    let id = e.target.getAttribute('_id');
    this.props.deleteBot(id);
  };

  render() {
    let bots = this.props.bots && this.props.bots,
      data = bots.length;
    const columns = [
      {
        title: 'Название',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Управление',
        dataIndex: '',
        key: 'manage',
        render: (bot, record, index) => {
          return(
            <div>
              <NavLink
                to={`/user/bot/${record._id}`}
                className={"ant-btn mr-1"}>
                <Icon type="edit"/>
              </NavLink>

              <Button
                _id={record._id}
                onClick={this.onDeleteBotHandler}>
                <Icon type="delete" />
              </Button>
            </div>)
        }
      }
    ];

    const content = (
      <>
        {data ?
          <>
            <Row type="flex">
              <Col
                lg={24}
                md={24}
                xl={18}>
                <Popup/>

                <Table
                  bordered
                  rowKey={'_id'}
                  columns={columns}
                  dataSource={bots}/>
              </Col>
            </Row> 
          </> : 

          <div className={"no-data--main"}>
            <div className={"data__main--column"}>
              <NoData/>
              <span style={{padding: "10px 0"}}>У вас пока нет ни одного бота</span>
              <Popup employees={this.props.employees}/>
            </div>
          </div>
        }
      </>
    );

    return (
      <>
        <MenuLeft content={content}/>
      </>
    );
  };
}

const mapStateToProps = state => {
  return {
    employees: getEmployeesList(state),
    user: getUserObject(state),
    bots: getBotsList(state),
  }
};

const mapDispatchToProps = ({
  deleteBot,
  getBots,
  setBotForEdit,
});

const ConnectedPosition= connect(mapStateToProps, mapDispatchToProps)(BotList);

export default ConnectedPosition;
