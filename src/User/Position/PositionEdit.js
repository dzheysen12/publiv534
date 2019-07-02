import  React, { Component }  from  'react'
import { Form, Input, Button, Row, Col,
  Select, Slider, Tooltip, Icon } from 'antd';
import * as Datetime from 'react-datetime';
import 'moment/locale/ru';
import { connect } from 'react-redux';
import {Link, Redirect} from "react-router-dom";
import { withRouter } from 'react-router';
import Day from "./Time/Day";
import MenuLeft from "../components/Menu/Menu";
import { setPositionForEdit } from '../../actions/positions';
import { getPositions, getPositionForEditSelector } from '../../selectors/positions';
import { getUserObject } from '../../selectors/user';
import { getServicesList } from '../../selectors/services';
import { getPositionsList, getPositionForEdit, editPosition, addPosition } from '../../thunks/positions';
import { getServices } from '../../thunks/services';


const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const config = require('../../config.js');


class PositionEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      workIntervals: [[],[],[],[],[],[],[]],
      notWorkDays: [],
      flag: true
    };
  }

  toggleFlagAddEndEdit = (flag) => {
    if (flag) {
      this.setState({flag: flag})
    } else {
      this.setState({flag: flag})
    }
  }

  componentDidMount() {
    if (this.props.match.path === '/user/position/add') {
      this.toggleFlagAddEndEdit(false)
    } else {
      this.toggleFlagAddEndEdit(true)
    };

    if (!this.props.positions.length) {
      this.props.getPositionsList()
    };

    if (!this.props.services.length) {
      this.props.getServices()
    };
    this.props.getPositionForEdit(this.props.match.params.positionid);
  };

  componentDidUpdate(prevProps) {
    if (this.state.flag){
      if (this.props.position !== prevProps.position) {
        this.setDataInForm(this.props.position);
      };
    };
  };

  componentWillUnmount() {
    this.props.setPositionForEdit(null);
  };

  setDataInForm = (position) => {
    this.props.form.setFieldsValue({
      name: position.name,
      description: position.description,
      services: (position.services || []).map(service => service._id),
      serviceTime: position.schedule.serviceTime,
    });
    this.setState({
      workIntervals: position.schedule.workIntervals,
      notWorkDays: (position.schedule.notWorkDays || []).map(day => +day)
    });
  };

  onOkHandler = () => {
    this.props.form.validateFields(
      (err, values) => {
        const { workIntervals, notWorkDays } = this.state;
        var updatedWorkIntervals = {};

        workIntervals.forEach((interval, index) => {
          if (interval.length == 0) {
            updatedWorkIntervals[index] = null;
          } else {
            updatedWorkIntervals[index] = interval;
          }
        });

        let positionid = this.props.position && this.props.position._id;
        const schedule = {
          workIntervals: updatedWorkIntervals,
          notWorkDays: notWorkDays.length > 0 ? notWorkDays : null,
          serviceTime: values.serviceTime
        };

        if (!!this.props.position && this.state.flag) {
          this.props.editPosition(values, positionid, schedule);
          } else {
            this.props.addPosition(values, schedule);
        }
      }
    );
  };

  onAddIntervalHandler = (index) => {
    var { workIntervals } = this.state;

    workIntervals[index].push({
      Start: {
        Hours: 8,
        Minutes: 30
      },
      End: {
        Hours: 12,
        Minutes: 0
      }
    });

    this.setState({
      workIntervals: workIntervals
    });
  };


  // Удаление интервала

  onDeleteIntervalHandler = (weekday_index, interval_index) => {
    var { workIntervals } = this.state;

    workIntervals[weekday_index].splice(interval_index, 1);

    this.setState({
      workIntervals: workIntervals
    });
  };

  onChangeIntervalHandler = (weekday_index, interval_index, moment_object, StartOrEnd) => {
    var { workIntervals } = this.state;

    if (typeof moment_object === 'string') {
      workIntervals[weekday_index][interval_index][StartOrEnd].Hours = 0;
      workIntervals[weekday_index][interval_index][StartOrEnd].Minutes = 0;
    } else {

      workIntervals[weekday_index][interval_index][StartOrEnd].Hours = moment_object.hours();
      workIntervals[weekday_index][interval_index][StartOrEnd].Minutes = moment_object.minutes();
    }

    this.setState({
      workIntervals: workIntervals
    });
  };

  onChangeWeekdayWorkStatusHandler = (weekday_index, event) => {
    const disable = !event.target.checked;

    if (disable) {
      var { workIntervals } = this.state;

      workIntervals[weekday_index] = [];

      this.setState({
        workIntervals: workIntervals
      });
    }
  };

  onRenderNotWorkDayHandler = (props, currentDate, selectedDate )  => {
    const { notWorkDays } = this.state;

    if (notWorkDays&&notWorkDays.includes(currentDate.valueOf())) {
      props.className += ' rdtActive';
    } else {
      props.className = props.className.replace('rdtActive', '');
    }

    return <td {...props}>{ currentDate.date() }</td>;
  };

  onChangeNotWorkDayHandler = (moment_object) => {
    var { notWorkDays } = this.state;

    const timestamp = moment_object.valueOf();
    var index = notWorkDays.indexOf(timestamp);

    if (index !== -1) {
      notWorkDays.splice(index, 1);
    } else {
      notWorkDays.push(timestamp);
    }

    this.setState({
      notWorkDays: notWorkDays
    });
  };

  render(){
    if (this.props.status === "SUCCESS") {
      return <Redirect push to='/user/position'/>;
    }

    var services = this.props.services.map(service => {
      return (<Option key={service._id} value={service._id}>{service.name}</Option>);
    });

    const { getFieldDecorator } = this.props.form;

    const  yesterday = Datetime.moment().subtract(1, 'day');
    const valid = function( current ){
      return current.isAfter( yesterday );
    };

    const marks = {
      0: '',
      60: '1 час',
      120: '2 часа',
      180: '3 часа',
      240: '4 часа',
      300: '5 часов',
      360: '6 часов',
    };

    const content = (
      <div>
        <Row type="flex">
          <Col lg={24} md={24} xl={18}>

          <Form layout={'vertical'}>
            <FormItem label="Название" hasFeedback>
              {getFieldDecorator('name', {
                rules: [{
                  required: true,
                  message: 'Введите название',
                }],
              })(
                <Input size="large" />
              )}
            </FormItem>

            <FormItem label={"Описание"}>
              {getFieldDecorator('description', {
                rules: [{
                  required: true,
                  message: 'Введите описание',
                }],
              })(
                <TextArea autosize={{
                  minRows: 2,
                  maxRows: 6
                }} />
              )}
            </FormItem>

            <FormItem label={"Услуги"}>
              {getFieldDecorator('services', {

              })(
                <Select
                  size="large"
                  mode="multiple"
                  style={{ width: '100%' }}
                  >
                  {services}
                </Select>
              )}
            </FormItem>

            <FormItem label={"Время приема(В минутах)"}>
              <Row gutter={16}>
                <Col lg={3}>
                  <div className="slider__input">
                    {getFieldDecorator('serviceTime', {
                      rules: config.validate.serviceTime
                    })(
                      <Input
                        size="large"
                        type={"number"}
                        min={0}
                        max={360}
                        />
                    )}
                  </div>
                </Col>

                <Col lg={21}>
                  {getFieldDecorator('serviceTime', {
                    rules: config.validate.serviceTime
                  })(
                    <Slider
                    min={0}
                    step={10}
                    max={360}
                    marks={marks}
                   />
                  )}
                </Col>
              </Row>
            </FormItem>

            <FormItem>
              <Row type="flex">
                <Col lg={16} md={24} xl={16}>
                  <div className="timing__title">
                    <div className="title__day">Время работы</div>

                    <div className="title__check">Вкл/Выкл</div>

                    <div className="title__time">
                      Время
                      <Tooltip title="Вы можете указать несколько раз время например
                       с 8:00 до 12:00 и с 12:00 до 17:00">

                      <span className={"time__help"}>
                        <Icon type="question" />
                      </span>
                      </Tooltip>
                    </div>
                  </div>

                  <Day parent={this}/>
                </Col>

                <Col lg={8} md={24} xl={8}>
                  <div className={"timing__date"}>
                    <div className="timing__title">
                     Выходные дни
                    </div>

                    <Datetime
                      onChange={this.onChangeNotWorkDayHandler}
                      renderDay={this.onRenderNotWorkDayHandler}
                      timeFormat = { false }
                      locale={"ru"}
                      input={ false }
                      isValidDate={ valid }/>
                  </div>
                </Col>
              </Row>
            </FormItem>

            <FormItem>
              <div className="btn__back">
                <Link to="/user/position">
                <Button>
                  Назад
                </Button>
                </Link>
              </div>

              <Button onClick={this.onOkHandler} type="primary">
                Сохранить
              </Button>
            </FormItem>
          </Form>
          </Col>
        </Row>
      </div>
    );

    return(
      <div>
        <MenuLeft content={content}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: getUserObject(state),
    services: getServicesList(state),
    positions: getPositions(state),
    position: getPositionForEditSelector(state),
  };
};

const mapDispatchToProps = ({
    setPositionForEdit,
    getPositionForEdit,
    getServices,
    getPositionsList,
    editPosition,
    addPosition
  });

const ConnectedPositionEdit = withRouter(connect(mapStateToProps, mapDispatchToProps)(PositionEdit));

const WrappedDynamicRule = Form.create()(ConnectedPositionEdit);
export default WrappedDynamicRule;
