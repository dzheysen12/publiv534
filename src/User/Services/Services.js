import React, { Component } from "react";
import { Table, Button, Icon, Row, Col } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import MenuLeft from '../components/Menu/Menu';
import Popup from './AddOrEdit';
import NoData from "../components/NoData/NoData";
import { getServices, deleteService } from '../../thunks/services';
import { getCategories } from '../../thunks/categories';
import { getServicesList, showAddWindow } from "../../selectors/services";
import { getCategoriesList } from "../../selectors/categories";
import { getUserObject } from "../../selectors/user";
import { setServiceForEdit, showModalWindow } from "../../actions/services";


class ServicesList extends Component {

  componentDidMount() {
    if (!this.props.services.length) {
      this.props.getServices()
    }

    if (!this.props.categories.length) {
      this.props.getCategories()
    }
  };

  onDeleteServiceHandler = (e) => {
    let id = e.target.getAttribute('_id');
    this.props.deleteService(id);
  };

  onSetServiceForEditHandler = (service) => {
    this.onAddModalHandler();
    this.props.setServiceForEdit(service);
  };

  onAddModalHandler = () => {
    this.props.showModalWindow();
  };

  render() {
    let data = this.props.services && this.props.services.length;
  
    const columns = [
      {
        title: 'Название слуги',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Категория услуги',
        dataIndex: 'category.name',
        key: 'category.name'
      },
      {
        title: 'Стоимость услуги',
        dataIndex: 'price',
        key: 'price'
      },
      {
        title: 'Управление',
        dataIndex: '',
        key: 'manage',
        render: (service, record, index) => {
          return (
            <div>
              <Button
                _id={record._id}
                onClick={() => this.onSetServiceForEditHandler(service)}
                className={"btn__edit"}>
                <Icon type="edit" />
              </Button>

              <Button _id={record._id}
                      onClick={this.onDeleteServiceHandler}>
                <Icon type="delete" />
              </Button>
            </div>)
        }
      },
    ];

    const content = (<>
        {data > 0 ?
          <Row type="flex">
            <Col lg={24} md={24} xl={18}>



              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: "space-between"
                }}>
                  {!!this.props.showAddWindow ?
                    null :
                    <Button
                      type={"primary"}
                      onClick={this.onAddModalHandler}
                      className={"activator__btn"}> Добавить
                    </Button>}

                  <NavLink
                    to={`/user/category`}
                    className={"btn__border--gray"}>Категории
                  </NavLink>
                </div>

                {!!this.props.service || this.props.showAddWindow === true ?
                  <Popup /> :
                  null}

                <Table
                  bordered
                  rowKey={'_id'}
                  columns={columns}
                  dataSource={this.props.services}
                />

              </div>
            </Col>
          </Row> :
          <div className={"no-data--main"}>
            <div className={"data__main--column"}>
              <NoData />
              <span style={{ padding: "10px 0" }}>У вас пока нет ни одной услуги</span>
              <Popup />
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
    services: getServicesList(state),
    categories: getCategoriesList(state),
    showAddWindow: showAddWindow(state),
  }
};

const mapDispatchToProps = ({
  deleteService,
  setServiceForEdit,
  getServices,
  getCategories,
  showModalWindow
});

const ConnectedServicesList = connect(mapStateToProps, mapDispatchToProps)(ServicesList);

export default ConnectedServicesList;
