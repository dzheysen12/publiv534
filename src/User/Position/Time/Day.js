import React, { Component } from 'react';
import {  Checkbox, Icon } from 'antd';
import Time from './Time';

const weekday_names = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница',
  'Суббота'];

class Day extends Component {
  render () {
    const { parent } = this.props;
    const { workIntervals } = parent.state;

    return (
      <div>
        {workIntervals.map((dayIntervals, index) => {
          const onAddIntervalHandler = () => parent.onAddIntervalHandler(index);
          const onChangeWeekdayWorkStatusHandler = (event) =>
            parent.onChangeWeekdayWorkStatusHandler(index, event);

          return (
            <div key={index} className="timing__overlow">
              <div className={"timing"}>
                <div className={"timing__day"}>{weekday_names[index]}</div>

                <div className="timing__check">
                  <Checkbox checked={dayIntervals.length > 0} onChange={onChangeWeekdayWorkStatusHandler}/>
                </div>

                <div className={"timing__time"}>
                  {dayIntervals.map(
                    (interval, interval_index) => <Time key={interval_index} parent={parent}
                      weekday_index={index}
                      interval={interval} interval_index={interval_index}/>)}

                  <div className="timing__create">
                    <button onClick={onAddIntervalHandler} className={"timing__btn-plus"}>
                      <Icon  type="plus-square" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Day;
