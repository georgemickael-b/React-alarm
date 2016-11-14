import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './MainPage.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component{
  render(){
	return(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <MainPage />
    </MuiThemeProvider>
	)
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
)
