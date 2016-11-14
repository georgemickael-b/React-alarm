import React from 'react'
import Utils from '../utils/utils'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class AlarmActor extends React.Component{
  constructor(props){
    super(props)
    this.state={
      alarmBuzzerOpen:false,
      buzzerTime:"",
      buzzerMessage:""
    }
    this.checkAlarm=this.checkAlarm.bind(this)
    this.lastBuzzedDate=-1
  }
  componentDidMount(){
    setInterval(this.checkAlarm,500)
  }
  checkAlarm(){

    var alarms=this.props.alarms
    alarms.map((alarm)=>{
        var now=Utils.getDate12()
      if(alarm.isEnabled && now.hour==alarm.hour &&
      now.minute==alarm.minute && now.ampm==alarm.ampm){
        if(alarm.isRepeatMode){
          var d=new Date()
          var day=Utils.days[d.getDay()]
          if(alarm.repeatDays.indexOf(day)>=0){
            //buzzAlarm
            if(this.isBuzzable()){ //important to avoid loop displaying
                this.setState({alarmBuzzerOpen:true,
                                buzzerTime:Utils.prependZero(alarm.hour)+":"+Utils.prependZero(alarm.minute)+" "+alarm.ampm,
                                buzzerMessage:alarm.message
                              })
                this.lastBuzzedDate=new Date();
            }
          }
        }
        else{
          //buzz Alarm and disbale as it is "Once" type
          this.setState({alarmBuzzerOpen:true,
                          buzzerTime:Utils.prependZero(alarm.hour)+":"+Utils.prependZero(alarm.minute)+" "+alarm.ampm,
                          buzzerMessage:alarm.message
                        })
          this.props.toggleEnableAlarm(alarm.id)
        }
      }
    })
  }

  isBuzzable(){
    if(this.lastBuzzedsDate==-1)
      return true
    var d=new Date()
    var diffMinutes=Math.floor( (d-this.lastBuzzedDate) /60000)
    if(diffMinutes >= 1)
      return true
    else
      return false
  }

  closeBuzzer(alarm){
      this.setState({alarmBuzzerOpen:false})
  }

  render(){
    return(
      <div>
        <Dialog
          title={"Alarm "+this.state.buzzerTime}
          actions={[
                <FlatButton
                  label="Ok"
                  primary={true}
                  onTouchTap={this.closeBuzzer.bind(this)}
                />]}
          modal={true}
          open={this.state.alarmBuzzerOpen}

          titleStyle={{textAlign:"center",fontSize:42}}
          bodyStyle={{textAlign:"center",fontSize:36}}
        >
          {this.state.buzzerMessage}
        </Dialog>
      </div>
    )
  }
}

export default AlarmActor
