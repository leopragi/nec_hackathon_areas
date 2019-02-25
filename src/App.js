import React, {Component} from 'react';
import { StyleProvider } from 'native-base';
import { createStackNavigator, createAppContainer } from "react-navigation";

import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/platform';

import Home from './pages/Home';
import StepOne from './pages/StepOne';
import StepTwo from './pages/StepTwo';
import StepThree from './pages/StepThree';
import StepFour from './pages/StepFour';
import Camera from './pages/Camera';
import Finish from './pages/Finish';

var t = require('tcomb-form-native');
let stylesheet = t.form.Form.stylesheet

stylesheet.textbox.normal.color = '#fff';
stylesheet.textbox.normal.borderColor = '#fff';
stylesheet.controlLabel.normal.color = '#fff';

stylesheet.pickerContainer.normal.backgroundColor='#fff'
stylesheet.pickerContainer.normal.color='#d14a44'


const AppNavigator = createStackNavigator({
	Home,
	StepOne,
	StepTwo,
	StepThree,
	StepFour,
	Camera,
	Finish,
},{
	initialRouteName: "Home",
	headerMode:'none'
});

class App extends Component {
	render() {
		let Container = createAppContainer(AppNavigator)
		return (
			<StyleProvider style={getTheme(material)}>
				<Container />
				{/* <Camera/> */}
			</StyleProvider >
		)
	}
}

export default App;