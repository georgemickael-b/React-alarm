import React from 'react'
import {Container,Row,Col} from 'react-grid-system'
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';

import Clock from './Clock.jsx'
import Alarms from './Alarms.jsx'
import AlarmMaker from './AlarmMaker.jsx'
import AlarmActor from './AlarmActor.jsx'
import {MainPageStyles} from '../Styles/styles'
import Utils from '../utils/utils'

class MainPage extends React.Component{
  constructor(props){
    super(props)
    this.state={
      alarms:JSON.parse(localStorage.getItem('alarms')) || [] ,
      showAlarmMaker:false,
      snackBarOpen:false,
      snackBarMsg:""
    }
  }

  componentDidMount(){
    //update today/Tomorrow for all "once" alarm
    var self=this
    setInterval(()=>{
      var alarms=self.state.alarms.slice()
      for(let idx in alarms){
        if(!alarms[idx]["isRepeatMode"])
          alarms[idx]["todayOrTomorrow"]=Utils.getTodayOrTomorrow(alarms[idx]["ampm"],alarms[idx]["hour"],alarms[idx]["minute"])
      }
      self.setState({alarms:alarms})
    }, 1000)
  }

  closeSnackBar=()=>{
    this.setState({snackBarOpen:false})
  }

  addAlarm=(alarm)=>{

    //Show error when no days selected for repeat mode and return
    if(alarm.isRepeatMode && alarm.repeatDays.length==0){
      this.setState({snackBarMsg:"Please select alteast a day in Repeat mode",snackBarOpen:true})
      return
    }

    /*Check if alarm time already present .
    for 'once' type do nothing. for 'repeat' type ,append the not already present days to the record
    if alarm time not present then append the alarms
    */
    var alarms=this.state.alarms.slice()
    for(let idx in alarms){
      let a=alarms[idx]
      if(a.hour===alarm.hour && a.minute===alarm.minute && a.ampm===alarm.ampm){
        //alarm present
        if(alarm.isRepeatMode&& a.isRepeatMode){ //Repeat type
          this.setState({snackBarMsg:"Alarm Already Present.Making Changes If any...",snackBarOpen:true})
          var days=a.repeatDays.slice();
          days=days.concat(alarm.repeatDays)

          alarms[idx]["repeatDays"]=days;
          alarms[idx]["message"]=alarm.message
          alarms[idx]["isEnabled"]=true
          this.setState({alarms:alarms})
          return
        }
        else if(!alarm.isRepeatMode&& !a.isRepeatMode){ //Once type - Checking !a.isRepeatMode is sufficient but for sake of clarity\
          this.setState({snackBarMsg:"Alarm Already Present.Making Changes If any...",snackBarOpen:true})
          alarms[idx]["message"]=alarm.message
          alarms[idx]["isEnabled"]=true
          this.setState({alarms:alarms})
          return
        }
      }
    }

    alarm["id"]=""+Date.now()
    this.setState({alarms:this.state.alarms.concat([alarm])})
  }

  deleteAlarm=(id)=>{
    var alarms=this.state.alarms.slice()
    for(let idx in alarms){
      if(alarms[idx]["id"]==id){
        alarms.splice(idx,1)
        this.setState({alarms:alarms})
        break
      }
    }
  }
  toggleEnableAlarm=(id)=>{
    var alarms=this.state.alarms.slice()
    for(let idx in alarms){
      if(alarms[idx]["id"]==id){
        alarms[idx]["isEnabled"]=!alarms[idx]["isEnabled"]
        this.setState({alarms:alarms})
        break
      }
    }
  }

  toggleAddNew=()=>{
    this.setState({
      showAlarmMaker:!this.state.showAlarmMaker
    })
  }

  render(){
    //push Changes to localStorage
    localStorage.setItem('alarms', JSON.stringify(this.state.alarms));

    var styles=MainPageStyles
    return(
      <Container style={styles.container}>
        <Row style={styles.mainRow}>
          <Col md={4} style={styles.leftMainCol}>
            <Clock />
            <div>
              {
                !this.state.showAlarmMaker ? <FlatButton label='Add New' primary={true} onClick={this.toggleAddNew} />
              :<AlarmMaker addAlarm={this.addAlarm} close={this.toggleAddNew} />
              }
            </div>
          </Col>
          <Col md={6} >
            <Alarms alarms={this.state.alarms} deleteAlarm={this.deleteAlarm} toggleEnableAlarm={this.toggleEnableAlarm}/>
          </Col>
        </Row>


        <Snackbar
            open={this.state.snackBarOpen}
            message={this.state.snackBarMsg}
            autoHideDuration={4000}
            onRequestClose={this.closeSnackBar}
        />
      <AlarmActor alarms={this.state.alarms} toggleEnableAlarm={this.toggleEnableAlarm}/>
      </Container>

    )
  }

}

export default MainPage
