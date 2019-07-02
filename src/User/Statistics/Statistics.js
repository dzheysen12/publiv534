import React from 'react';
import {  Row, Col,  Radio } from 'antd';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import MenuLeft from '../components/Menu/Menu';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { getOrdersList} from '../../thunks/orders';
import { getOrders } from '../../selectors/orders';

class Statistics extends React.Component{
  state = {
    size: 'large',
  };

  componentDidMount() {
    if (!this.props.orders.length) {
      this.props.getOrdersList()
    }
  };

  handleSizeChange = e => {
    this.setState({ size: e.target.value });
  };

  render(){
    const {orders} = this.props;
    const size = this.state.size;

    const content = (
      <div>
        <Row type="flex"  gutter={16}>
          <Col lg={24} md={24} xl={18}>

            <Col span={12}>
              <div className={"statistics__block"}>
                <h3 style={{marginBottom: "10px"}}>Заказы</h3>
                <Radio.Group value={size} onChange={this.handleSizeChange} style={{marginBottom: "15px"}}>
                  <Radio.Button value="large">Сегодня</Radio.Button>

                  <Radio.Button value="default">Месяц</Radio.Button>

                  <Radio.Button value="small">Год</Radio.Button>
                </Radio.Group>

                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <AreaChart
                      width={500}
                      height={400}
                      data={orders}
                      margin={{
                        top: 10, right: 30, left: 0, bottom: 0,
                      }}>

                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />

                      <Tooltip />

                      <Area
                        type="monotone"
                        dataKey="uv"
                        stroke="rgb(50, 59, 165)"
                        fill="rgb(122, 131, 230)"
                        fillOpacity={0.3} />

                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Col>

          </Col>
        </Row>
      </div>
    );

    return (
      <MenuLeft content={content}/>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: getOrders(state),
  }
};

const mapDispatchToProps = ({
    getOrdersList,
  }
);

const StatisticsList = withRouter(connect(mapStateToProps, mapDispatchToProps)(Statistics));
export default StatisticsList;
