import React, { Component } from 'react'
import { Table, Button, Icon, Row, Col } from 'antd';
import { connect } from 'react-redux';
import MenuLeft from '../components/Menu/Menu';
import Add from './Add';
import { getPositionsList } from '../../thunks/positions';
import { getEmployees, deleteEmployee } from '../../thunks/employees';
import { getEmployeesList, showAddWindow } from '../../selectors/employees';
import { getPositions } from '../../selectors/positions';
import { setEmployeeForEdit, showModalWindow } from '../../actions/employees';
import NoData from "../components/NoData/NoData";


class Employee extends Component {

  componentDidMount() {
    let { employees, positions } = this.props;

    if (!employees.length) {
      this.props.getEmployees();
    }

    if (!positions.length) {
      this.props.getPositionsList();
    }
  };

  onDeleteEmployeeHandler = (emoloyee) => {
    const id = emoloyee._id;
    this.props.deleteEmployee(id);
  };

  onSetEmployeeForEditHandler = (employee) => {
    this.props.setEmployeeForEdit(employee);
    this.onAddModalHandler();
  };

  onAddModalHandler = () => {
    this.props.showModalWindow();
  };

  render() {
    let { employees, positions } = this.props;

    const columns = [
      {
        title: 'Имя',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Фамилия',
        dataIndex: 'surname',
        key: 'surname'
      },
      {
        title: 'Должность',
        dataIndex: 'position',
        key: 'position',
        render: (id) => {
          let pos = positions.find(function (item) {
            return item._id === id;
          });

          return (
            <div>
              {pos && pos.name}
            </div>);
        }
      },
      {
        title: 'Статус',
        dataIndex: 'status',
        key: 'status'
      },
      {
        title: 'Управление',
        dataIndex: '',
        key: 'action',
        render: (employee) => {
          let onEdit = () => this.onSetEmployeeForEditHandler(employee);
          let onDelete = () => this.onDeleteEmployeeHandler(employee);

          return (
            <div>
              <Button onClick={onEdit}
                className={"btn__edit"}>
                <Icon type="edit" />
              </Button>

              <Button onClick={onDelete}>
                <Icon type="delete" />
              </Button>
            </div>);
        }
      },
    ];

    const content = (
      <>
      {!!employees.length ?
        <Row type="flex">
          <Col lg={24} md={24} xl={18}>
          {!!this.props.showAddWindow ?
            null :
            <Button
              type={"primary"}
              onClick={this.onAddModalHandler}
              className={"activator__btn"}> Добавить
            </Button>}
            {!!this.props.employee || this.props.showAddWindow === true ?
              <Add /> : null}

            <Table
              bordered
              columns={columns}
              dataSource={employees}
              rowKey="_id"
            />
          </Col>
        </Row> :
          <div className={"no-data--main"}>
            <div className={"data__main--column"}>
              <NoData/>
              <span style={{padding: "10px 0"}}>У вас пока нет ни одного зарегистрированного сотрудника</span>
                <Add />
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
  }
}

const mapStateToProps = state => {
  return {
    employees: getEmployeesList(state),
    positions: getPositions(state),
    showAddWindow: showAddWindow(state),
  }
};
const mapDispatchToProps = ({

  setEmployeeForEdit,
  showModalWindow,
  getPositionsList,
  getEmployees,
  deleteEmployee
});

const ConnectedEmolyeeList = connect(mapStateToProps, mapDispatchToProps)(Employee);

export default ConnectedEmolyeeList;
