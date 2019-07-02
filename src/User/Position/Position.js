import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Table, Button, Icon, Row, Col } from 'antd';
import NoData from "../components/NoData/NoData";
import MenuLeft from "../components/Menu/Menu";
import { setPositionsList, setPositionForEdit } from '../../actions/positions';
import { connect } from 'react-redux';
import { getPositions } from '../../selectors/positions';
import { getPositionsList, deletePosition } from '../../thunks/positions';
import { getUserObject } from '../../selectors/user.js';

class Position extends Component {

  componentDidMount() {
    if (!this.props.positions.length) {
      this.props.getPositionsList()
    }
  };

  onDeletePositionHandler = (e) => {
    const id = e.target.getAttribute('_id');
    this.props.deletePosition(id)
  };

  render() {
    const data = this.props.positions.length;
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
        render: ( record, index) => {
          return (
            <div>
              <NavLink
                to={`/user/position/edit/` + record._id}
                className={"ant-btn mr-1"}>

                <Icon type="edit"/>
              </NavLink>

              <Button _id={record._id} onClick={this.onDeletePositionHandler}>
                <Icon type="delete" />
              </Button>
            </div>)
        }
      }
    ];

    const content = (
      <>
        { data > 0 ?
          <Row type="flex">
            <Col lg={24} md={24} xl={18}>
              <NavLink
                to={`/user/position/add`}
                className={"btn__border--blue mb-1"}>Добавить
              </NavLink>

              <Table
                locale={{emptyText: ''}}
                bordered
                rowKey={'_id'}
                columns={columns}
                dataSource={this.props.positions}/>
            </Col>
          </Row>

          :
          <div className={"no-data--main"}>
            <div className={"data__main--column"}>
              <NoData />
              <span style={{ padding: "10px 0" }}>У вас пока нет зарегистрированных должностей</span>
              <NavLink className={"btn__border--blue mb-1"} to="/user/position/add">Добавить</NavLink>
            </div>
          </div>
        }
      </>

    );
    return (
      <div>
        <MenuLeft content={content} />
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    user: getUserObject(state),
    positions: getPositions(state)
  }
};

const mapDispatchToProps = ({
  setPositionsList,
  setPositionForEdit,
  getPositionsList,
  deletePosition
});

const ConnectedPosition= connect(mapStateToProps, mapDispatchToProps)(Position);
export default ConnectedPosition;
