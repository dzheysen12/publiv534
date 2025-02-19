import  React, { Component }  from  'react';
import { withRouter } from 'react-router';
import { Form, Input, Button, Select } from 'antd';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {CirclePicker} from "react-color";
import 'moment/locale/ru';
import { connect } from 'react-redux';
import ChatTest from './Chat/ChatTest';
import { setBotForEdit } from '../../../actions/bots';
import { editBot, setBot, getBots } from '../../../thunks/bots';
import { getBotForEdit, getBotsList } from '../../../selectors/bots';
import { getUserObject } from '../../../selectors/user';
import { getEmployeesList } from '../../../selectors/employees';
import { getEmployees } from '../../../thunks/employees';


const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class Setting extends Component {

  state = {
    selectedEmployees: [],
    value: '',
    copied: false,
    background: 'rgb(50, 59, 165)',
    backgroundBtn: "rgb(50, 59, 165)",
    previewText: 'Виджет - bot manager'
  };

  componentDidMount() {
    this.props.setBotForEdit(this.props.match.params.id);
    this.props.setBot(this.props.match.params.id);
    if (!this.props.employees.length) {
      this.props.getEmployees()
    };
  };

  componentWillUnmount() {
    this.props.setBotForEdit(null)
  };

  componentDidUpdate(prevProps) {
    if (this.props.bot !== prevProps.bot) {
      this.setDataInForm(this.props.bot);
    }
  };

  handleChange = selectedEmployees => {
    this.setState({ selectedEmployees });
  };

  onColorCheckHandler = (color) => {
    this.setState({ background: color.hex }
    );
  };

  onColorButtonHandler = (color) => {
    this.setState({
      backgroundBtn: color.hex
    })
  };

  onChangeEditHeaderHandler = (event) => {
    this.setState({
      previewText: event.target.value
    })
  };

  setDataInForm = (bot) => {
    this.props.form.setFieldsValue({
      name: bot.name,
      description: bot.description,
      employees: (bot.employees || []).map(employee => employee._id),
    });
  };

  onEditBotHandler = () => {
    const botid = this.props.bot._id;

    this.props.form.validateFields(
        (err, values) => {
          if (!err) {
          let employees_is_empty;
          values.employees.length > 0 ? employees_is_empty = undefined : employees_is_empty = true
          this.props.editBot(values, botid, employees_is_empty)
          }
    })
  };

  onFrameCodeGeneratorHandler = () => {
    const { background, previewText, backgroundBtn } = this.state;
    const botid = this.props.bot && this.props.bot._id;
    const query = `?bots=${encodeURIComponent(JSON.stringify(botid))}`;

    //const src = `http://localhost:3000/bots.html${query}`;
    //const script_src = `http://localhost:3000/widget.js`;
    const src = `https://newbotpublic.herokuapp.com/bots.html${query}`;
    const script_src = `https://newbotpublic.herokuapp.com/widget.js`;
    const code = `<!--Bot manager widget-->
<script src="${script_src}" data-preview="${previewText}"  data-background="${background}" data-btn="${backgroundBtn}" widget="${src}" type="text/javascript"></script>
<!--Bot manager widget-->`;

    const onCopyHandler = () => {
      this.setState({
        copied: true
      })
    };

    let onChangeHandler = ({ target: {value}}) => this.setState({
      value,
      copied: false
    });

    return (
      <div className={"block__copy"}>


        <TextArea
          autosize={{ minRows: 2, maxRows: 6 }}
          value={code}
          onChange={onChangeHandler} />

        <div className="copy__btn--block">
          <CopyToClipboard
            text={code}
            onCopy={onCopyHandler}>

            <Button className={"copy__btn"}>
              {this.state.copied ? <span>Скопировано</span> : "Скопировать в буфер обмена"}
            </Button>
          </CopyToClipboard>
        </div>

        <CopyToClipboard
          text={code}
          onCopy={onCopyHandler}>
          <span></span>
        </CopyToClipboard>
      </div>
    )
  };

  render(){
    // let employees = this.props.employees && this.props.employees;
    // const { selectedEmployees } = this.state;
    const {background, previewText} = this.state;
    const botid = this.props.match.params.id && this.props.match.params.id;
    const { getFieldDecorator } = this.props.form;
    var employees = this.props.employees.map(employee => {
      return (<Option key={employee._id} value={employee._id}>{employee.name}</Option>);
    });


    const content = (
      <div>

        <div className="wrap__widget--chat">
          <div className="bot__container">
            <ChatTest
              {...this.props}
              botid = {botid}
              previewText={previewText}
              backgroundColor={background} />
          </div>

          <div className="widget__chat--option">
            <Form layout={'vertical'}>
              <FormItem  label="Название" hasFeedback>
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
                    required: false,
                    message: 'Введите описание',
                  }],
                })(
                  <TextArea autosize={{
                    minRows: 3,
                    maxRows: 6
                  }} />
                )}
              </FormItem>
              <FormItem label={"Сотрудники"}>
              {getFieldDecorator('employees', {

              })(
                <Select
                  size="large"
                  mode="multiple"
                  style={{ width: '100%' }}
                  >
                  {employees}
                </Select>
              )}
            </FormItem>
            </Form>
            <div className="widget__chat--color">
              <FormItem label={"Заголовок превью"}>
                <Input
                  onChange={this.onChangeEditHeaderHandler}
                  value={previewText}
                  placeholder={"Например: Заказ от бота Скидка 10%"}/>
              </FormItem>

              <FormItem  label="Выбрать цвет виджета" >
                <CirclePicker
                  circleSpacing={8}
                  circleSize={16}
                  color={ this.state.background }
                  colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5",
                    "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#607d8b"]}
                  width={"100%"}
                  onChangeComplete={this.onColorCheckHandler}/>
              </FormItem>

              <FormItem  label="Выбрать цвет кнопки" >
                <CirclePicker
                  circleSpacing={8}
                  circleSize={16}
                  color={ this.state.backgroundBtn }
                  colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5",
                    "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#607d8b"]}
                  width={"100%"}
                  onChangeComplete={this.onColorButtonHandler}/>
              </FormItem>
            </div>
            {this.onFrameCodeGeneratorHandler()}
          </div>
        </div>

          <Button onClick={this.onEditBotHandler} type="primary">Сохранить</Button>
      </div>
    );

    return(
      <div>
        {content}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: getUserObject(state),
  bots: getBotsList(state),
  bot: getBotForEdit(state),
  employees: getEmployeesList(state)
});

const mapDispatchToProps = ({
  setBotForEdit,
  editBot,
  setBot,
  getBots,
  getEmployees
});

const ConnectedPositionEdit = withRouter(connect(mapStateToProps, mapDispatchToProps)(Setting));
const WrappedDynamicRule = Form.create()(ConnectedPositionEdit);
export default WrappedDynamicRule;
