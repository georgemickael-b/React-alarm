import React from 'react'
import ClockDisplay from './ClockDisplay.jsx'
import Utils from '../utils/utils'

class Clock extends React.Component{

  constructor(props){
    super(props)
    var now=Utils.getDate12();
    this.state={
      hour:now.hour,
      minute:now.minute,
      ampm:now.ampm
    }
    this.updateTime=this.updateTime.bind(this)
  }
  componentDidMount(){
      setInterval(this.updateTime,500)
  }
  updateTime(){
    var now=Utils.getDate12()
    this.setState({
      hour:now.hour,
      minute:now.minute,
      ampm:now.ampm
    })
  }

  render(){
    var hour=Utils.prependZero(this.state.hour),
        minute=Utils.prependZero(this.state.minute),
        ampm=this.state.ampm
    return(
      <ClockDisplay hour={hour} minute={minute} ampm={ampm}/>
    )
  }
}

export default Clock
