import React, {Component} from 'react';
import {View, Content, Container, Text, Icon, Button} from 'native-base';
import { Row, Grid } from "react-native-easy-grid";

import SOS from '../components/RippleButton'
import ProgressBar from '../components/ProgressBar';

import {requestSMSPermission} from '../utils/permissionManager'
import {sendSOSMessage, listenToAck, setId} from '../utils/message'

function getStatusForProgress (status) {
	switch(status) {
		case 0:
		return 'Sending SOS'
		case 7:
		return 'Awaiting for reply'
		case 9:
		return 'Alert message received by CARS'
	}
}


let places = [
    {
        name: 'Mayura Street, Kodigehalli, Bengaluru - 560065, Karnataka, India',
        latlng: [13.0483259,77.5794024],
    },
    {
        name: 'Richmond Road, Bengaluru, Karnataka, India',
        latlng: [12.9668,77.6096],
    },
    {
        name: 'Kadugodi, Bengaluru - 56066, Karnataka, India',
        latlng: [12.9985767,77.7609716],
    },
    {
        name: 'BEL Circle, Bengaluru, Karnataka, India',
        latlng: [13.0456,77.55639999999994],
    },
    {
        name: 'Agaram, Bengaluru - 560007, Karnataka, India',
        latlng: [12.97189787687585,77.62316098508609],
    },
]


async function wait(time) {
	return new Promise((res, rej) => {
		setTimeout(() => res(), time)
	})
}

function getInitialState() {
	return {
		progress: 0,
		emergency: false,
		currentId: null
	}
}

export default class Home extends Component {

	state = getInitialState()

	componentDidMount() {
		requestSMSPermission()
	}

	sendSOS = async() => {
		this.setState({emergency:true})
		let currentId = await sendSOSMessage(places[0])
		this.setState({
			progress: this.state.progress + 5,
			currentId
		})
		await setId(currentId)
		this.setState({
			progress: this.state.progress + 2
		})
		await listenToAck(currentId)
		this.setState({
			progress: this.state.progress + 2
		})

		await wait(2000)

		this.setState({
			progress: this.state.progress + 1
		})

		this.setState({...getInitialState()})
	}

	componentDidUpdate() {
		if(this.state.progress == 10) {
			this.props.navigation.navigate('StepOne')
		}
	}

	render() {
		let {emergency, progress} = this.state
		return (
			<Container>
				<Content contentContainerStyle={{flex:1}}>
					<Grid>
						<Row size={5}>
							<View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
								<SOS text="sos" onClick={this.sendSOS}/>
							</View>
						</Row>
						<Row size={1} style={{padding:40}}>
							{emergency ? 
								<View style={{flex:1}}>
									<Text style={{color:'#fff', flex:1, textAlign:'center', margin:20}}>
										{getStatusForProgress(progress)}
									</Text>
									<ProgressBar reverseMode progress={progress/10} duration={300}/>
								</View> :
							<Text style={{textAlign:'center', color:'#fff'}}>Click SOS to send distress message along with location</Text>
							}
						</Row>
						{!emergency && <Row size={1}>
							<Button style={{height:56, width:56, borderRadius:28, right:0, bottom:0, position:'absolute', margin:24, backgroundColor:'#fff', display:'flex', justifyContent:'center', alignItems:'center'}}>
								<Icon type="Ionicons" name="call" style={{fontSize: 24, color:'#d14a44'}}/>
							</Button>
						</Row>}
					</Grid>        
				</Content>
			</Container>
		);
	}
}