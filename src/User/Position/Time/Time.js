import React, { Component } from 'react';
import {  Icon } from 'antd';
import * as Datetime from 'react-datetime';
import 'moment/locale/ru';

class Time extends Component {
  render() {
    const { interval, parent, weekday_index, interval_index } = this.props;

    const onDeleteIntervalHandler =
      () => parent.onDeleteIntervalHandler(weekday_index, interval_index);

    const onChangeStartIntervalHandler = (moment_object) => {
      return parent.onChangeIntervalHandler(weekday_index, interval_index, moment_object, 'Start');
    };

    const onChangeEndIntervalHandler = (moment_object) => {
      return parent.onChangeIntervalHandler(weekday_index, interval_index, moment_object, 'End');
    };

    const { Start, End } = interval;
    const startValue = Start.Hours + ':' + (Start.Minutes < 10 ? '0' : '') + Start.Minutes;
    const endValue = End.Hours + ':' + (End.Minutes < 10 ? '0' : '') + End.Minutes;

    return(
      <div className="time__over">
        <div className={"time__from"}>
          <span>C</span>
          <span className={"from__time"}>
            <Datetime
              inputProps={{
                value: startValue
              }}
              value={startValue}
              dateFormat = { false }
              onChange={onChangeStartIntervalHandler}
              locale={"ru"}/>
          </span>
        </div>

        <div className={"time__before"}>
          <span>До</span>
          <span className={"before__time"}>
            <Datetime
              inputProps={{
                value: endValue
              }}
              value={endValue}
              timeFormat = { true }
              dateFormat = { false }
              onChange={onChangeEndIntervalHandler}
              locale={"ru"}/>
          </span>
        </div>

        <div onClick={onDeleteIntervalHandler} className="time__btn--delete">
          <button>
            <Icon type="delete" />
          </button>
        </div>
      </div>
    );
  }
}

export default Time;
