import React from 'react'
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import Utils from '../utils/utils'
import {Container,Row,Col} from 'react-grid-system'
import {AlarmMakerStyles as styles} from '../Styles/styles';

class AlarmMaker extends React.Component{

  static defaultProps={
  }
  constructor(props,defaultProps){
   super(props)
   var now=Utils.getDate12()
   this.state={
         hour:now.hour,
         minute:now.minute,
         ampm:now.ampm,
         message:"",
         repeatDays:[],
         todayOrTomorrow:Utils.getTodayOrTomorrow(now.ampm,now.hour,now.minute),
         isRepeatMode:false,
         isEnabled:true,
         intervalId:""
       }
  }
  componentDidMount(){
    //Just if user was inactive and current time changes, but selected time remains so update todayOrTomorrow
    var self=this
    var intervalId=setInterval(function(){
      self.setState({ todayOrTomorrow:Utils.getTodayOrTomorrow(self.state.ampm,self.state.hour,self.state.minute)})
    }, 300)
    this.setState({intervalId:intervalId})
  }
  componentWillUnmount(){
    clearInterval(this.state.intervalId)
  }

  setHour=(e,i,hour)=>{
    this.setState({hour:hour})
  }
  setMinute=(e,i,minute)=>{
    this.setState({minute:minute})
  }
  setAmPm=(e,i,ampm)=>{
    this.setState({ampm:ampm})
  }
  setMessage=(e)=>{
    this.setState({message:e.target.value})
  }
  toggleAddDay=(day)=>{

    var repeatDays = this.state.repeatDays.slice()
    if(this.isDaySelected(day)){
      var index = repeatDays.indexOf(day)
      repeatDays.splice(index,1)
      this.setState({repeatDays:repeatDays})
    }
    else
    this.setState({repeatDays:repeatDays.concat([day])})
  }
  getHours(){
    var hours=[];
    for(var i=1;i<=12;i++)
      hours.push({value:i,label:Utils.prependZero(i)})
    return hours
  }
  getMinutes(){
    var minutes=[];
    for(var i=0;i<=59;i++)
      minutes.push({value:i,label:Utils.prependZero(i)})
    return minutes
  }
  getAllDays(){
      return Utils.days
  }

  setRepeatMode=(stat)=>{
      this.setState({repeatDays:[],isRepeatMode:stat})
  }
  isDaySelected=(day)=>{

    if(this.state.repeatDays.indexOf(day)>=0)
      return true
    return false
  }

  submit=()=>{
    var hour=this.state.hour,
        minute=this.state.minute,
        ampm=this.state.ampm,
        message=this.state.message,
        repeatDays=this.state.repeatDays,
        todayOrTomorrow=this.state.todayOrTomorrow,
        isRepeatMode=this.state.isRepeatMode,
        isEnabled=this.state.isEnabled
        this.props.addAlarm({hour:hour,minute:minute,ampm:ampm,repeatDays:repeatDays,message:message,
          todayOrTomorrow:todayOrTomorrow,isRepeatMode:isRepeatMode,isEnabled:isEnabled})
        this.clean()
  }

  clean=()=>{
    this.props.close()
  }


  render(){
    var hour=this.state.hour,
        minute=this.state.minute,
        ampm=this.state.ampm,
        message=this.state.message

    return(
      <Container>
        <Row>
          <Col md={4}>
            <SelectField
              floatingLabelText="Hour"
              value={this.state.hour}
              onChange={this.setHour}
              style={styles.select}
              floatingLabelStyle={styles.floatingLabel}
              labelStyle={styles.label}
              >{
                  this.getHours().map((hour)=>{
                    return(
                      <MenuItem key={"hour"+hour.value} value={hour.value} primaryText={hour.label} />
                    )
                  })
              }
            </SelectField>
          </Col>
          <Col md={4}>
            <SelectField
              floatingLabelText="Minute"
              value={this.state.minute}
              onChange={this.setMinute}
              style={styles.select}
              floatingLabelStyle={styles.floatingLabel}
              labelStyle={styles.label}
              >{
                  this.getMinutes().map((minute)=>{
                    return(
                      <MenuItem key={"minute"+minute.value} value={minute.value} primaryText={minute.label} />
                    )
                  })
              }
            </SelectField>
          </Col>
          <Col md={4}>
            <SelectField
              floatingLabelText="AM/PM"
              value={this.state.ampm}
              onChange={this.setAmPm}
              style={styles.select}
              floatingLabelStyle={styles.floatingLabel}
              labelStyle={styles.label}
              >{
                  ["AM","PM"].map((ampm)=>{
                    return(
                      <MenuItem key={"ampm"+ampm} value={ampm} primaryText={ampm} />
                    )
                  })
              }
            </SelectField>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
              {
                !this.state.isRepeatMode ?
                 <div style={styles.center}>
                  <div style={styles.dayDisp}>{this.state.todayOrTomorrow}</div>
                  <FlatButton label="Repeat" secondary={true}  onClick={this.setRepeatMode.bind(this,true)} />
                </div>
                : <div style={styles.center}>
                  <div style={styles.allDaysDisp}>
                    {
                      this.getAllDays().map((day)=>{
                        return(
                          <RaisedButton label={day} secondary={this.isDaySelected(day)} value={day}
                            buttonStyle={styles.dayButton}
                             onClick={this.toggleAddDay.bind(this,day)}
                             key={"day"+day}
                              />
                        )
                      })
                    }
                  </div>
                  <FlatButton label="Once" secondary={true} onClick={this.setRepeatMode.bind(this,false)} />
                </div>
              }
          </Col>
        </Row>
        <Row>

          <Col md={12}>
            <TextField
              floatingLabelText="Message"
              fullWidth={true}
              floatingLabelStyle={styles.floatingLabel}
              inputStyle={styles.input}

              value={this.state.message}
              onChange={this.setMessage}
            />
          </Col>
        </Row>

        <Row>
            <Col md={6}>
              <br/>
              <RaisedButton label="Cancel"  fullWidth={true} onClick={this.clean.bind(this)}/>
            </Col>
            <Col md={6}>
              <br/>
              <RaisedButton label="Add" primary={true} fullWidth={true} onClick={this.submit.bind(this)}/>
            </Col>
        </Row>
    </Container>
    )
  }
}

export default AlarmMaker
