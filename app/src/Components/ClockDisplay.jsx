import React from 'react'
import {ClockDisplayStyles} from '../Styles/styles'

function ClockDisplay(props){
  var styles=ClockDisplayStyles
  return(
    <div style={styles.clock}>
      <span>{props.hour}</span>
      <span>:</span>
      <span>{props.minute}</span>
      <span style={styles.ampm}>{props.ampm}</span>
    </div>
  )
}
export default ClockDisplay
