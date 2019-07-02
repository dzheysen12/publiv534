import React, { Component }  from 'react';
import { Tabs, Row, Col } from 'antd';
import MenuLeft from "../components/Menu/Menu";
import Setting from "./Setting/Setting";

class Bot extends Component {

  render() {
    const content = (
      <Row type="flex">
        <Col lg={24} md={24} xl={18}>
          <Setting/>
        </Col>
      </Row>
    );
    return (
      <div>
        <MenuLeft content={content}/>
      </div>
    );
  };
}

export default Bot;
