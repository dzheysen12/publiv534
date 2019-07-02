import  React, { Component } from 'react';
import { NavLink }  from  'react-router-dom';
import { connect } from 'react-redux';
import {Table, Button, Icon, Row, Col} from 'antd';
import MenuLeft from "../components/Menu/Menu";
import NoData from "../components/NoData/NoData";
import Popup from './AddOrEdit';
import { setCategoryForEdit, showModalWindow } from '../../actions/categories';
import { getCategories, deleteCategory } from '../../thunks/categories';
import { getCategoriesList, showAddWindow } from '../../selectors/categories';
import { getUserObject } from '../../selectors/user';
import { getServicesList } from '../../selectors/services';

import { getServices } from '../../thunks/services';

class CategoryList extends Component {

  componentDidMount() {
    if (!this.props.categories.length) {
      this.props.getCategories()
    };
    if (!this.props.services.length) {
      this.props.getServices()
    }
  };

  onDeleteCategoryHandler = (e) => {
    const id = e.target.getAttribute('_id');
    this.props.deleteCategory(id);
  };

  onSetCategoryForEditHandler = (category) => {
    this.onAddModalHandler()
    this.props.setCategoryForEdit(category);
  };

  onAddModalHandler = () => {
    this.props.showModalWindow();
  };

  render() {
    const columns = [
      {
        title: 'Название категории',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Описание категории',
        dataIndex: 'description',
        key: 'description'
      },
      {
        title: 'Колличество услуг',
        dataIndex: '',
        key: 'record',
        render: category => this.props.services.filter(cervice => cervice.category._id === category._id).length        
      },
      {
        title: 'Управление',
        dataIndex: '',
        key: 'manage',
        render: (category, record, index) => {
          return(
            <div>
               <Button
                _id={record._id}
                onClick={() => this.onSetCategoryForEditHandler(category)}
                className={"btn__edit"}>
                <Icon type="edit" />
              </Button>

              <Button _id={record._id} onClick={this.onDeleteCategoryHandler}>
                <Icon type="delete" />
              </Button>
            </div>)
        }
      }
    ];

    const content = (<>
      {this.props.categories.length > 0 ?
      <Row type="flex">
        <Col lg={24} md={24} xl={18}>


          <div>
            <div style={{
              display: "flex"
            }}>
              <NavLink
                to={`/user/services`}
                className={"btn__border--gray mb-1 mr-1"}>Назад к услугам
              </NavLink>

          {!!this.props.showAddWindow ?
            null :
            <Button
              type={"primary"}
              onClick={this.onAddModalHandler}
              className={"activator__btn"}> Добавить
            </Button>}
            </div>
            {!!this.props.category || this.props.showAddWindow === true ?
                <Popup /> :
              null}

            <Table
              bordered
              rowKey={'_id'}
              columns={columns}
              dataSource={this.props.categories}/>
          </div>
        </Col>
      </Row> :
      <div className={"no-data--main"}>
        <div className={"data__main--column"}>
          <NoData />
          <span style={{ padding: "10px 0" }}>У вас пока нет ни одной категории</span>
          <Popup />
        </div>
      </div>
      }
      </>
    );
    return (
      <div>
        <MenuLeft content={content}/>
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    user: getUserObject(state),
    categories: getCategoriesList(state),
    services: getServicesList(state),
    showAddWindow: showAddWindow(state),
  }
};

const mapDispatchToProps = ({
  showModalWindow,
  deleteCategory,
  setCategoryForEdit,
  getCategories,
  getServices
})

const ConnectedCategory= connect(mapStateToProps, mapDispatchToProps)(CategoryList);

export default ConnectedCategory;
