import React from 'react'
import {List, ListItem} from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import {AlarmsStyles as styles} from '../Styles/styles'
import Utils from '../utils/utils'
import {red500,grey300} from 'material-ui/styles/colors'
import Toggle from 'material-ui/Toggle'

class Alarms extends React.Component{
  constructor(props){
    super(props)
  }
  getSelectedDays=(nthAlarm)=>{
    if(!nthAlarm.isRepeatMode)
      return nthAlarm.todayOrTomorrow
    else if(nthAlarm.repeatDays.length==7)
      return "Everyday"
    else
      return nthAlarm.repeatDays
  }

  makeDaysDisplayComponent=(alarm)=>{
    var selectedDays=this.getSelectedDays(alarm)
    if(!(selectedDays instanceof Array) )
      return(
        <p style={styles.subHeader}>
          <span>{selectedDays}</span><br/>
          <span style={styles.subHeaderMsg}>{alarm.message} </span>
        </p>
      )
    return(
      <p style={styles.subHeader}>
          <span>{
            Utils.days.map((day)=>{
              if(selectedDays.indexOf(day)>=0)
                return( <span key={"disp_day"+day}>{day+" "}</span> )
              })
          }</span><br />
        <span style={styles.subHeaderMsg}>{alarm.message} </span>
      </p>
    )
  }

  deleteAlarm=(id)=>{
    this.props.deleteAlarm(id)
  }
  alarmToggled(id){
    this.props.toggleEnableAlarm(id)
  }

  render(){
    var alarms=this.props.alarms
    return(
      <div>
        <List>
        {
          alarms.map((alarm,idx)=>{
                return(
                  <ListItem primaryText={
                                      <div style={styles.header}>
                                        {Utils.prependZero(alarm.hour)+':'+
                                        Utils.prependZero(alarm.minute)+' '+
                                        alarm.ampm}
                                      </div>}
                    leftCheckbox={<Toggle
                            defaultToggled={alarm.isEnabled}
                              onToggle={this.alarmToggled.bind(this,alarm.id)}

                          />}
                    secondaryText={ this.makeDaysDisplayComponent(alarm)}
                    secondaryTextLines={2}
                    rightIconButton={<IconButton onClick={this.deleteAlarm.bind(this,alarm.id)}><DeleteIcon color={red500}/></IconButton>}
                    key={"alarm"+idx}

                    style={alarm.isEnabled?{backgroundColor:"#ffffff",marginBottom:"10px"}:
                          {backgroundColor:grey300,marginBottom:"10px"}
                          }

                   />
              )
            })
        }
        </List>
      </div>
    )
  }
}
export default Alarms
