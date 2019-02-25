import React, { Component } from 'react';
import { Container, Content, Button, Text, View, H1 } from 'native-base';
import t from 'tcomb-form-native'; 
import { getId, updateEntry } from '../utils/message';
import toggleButton from '../components/ToggleButton';
import input from '../components/Input';

const Form = t.form.Form;

const Areas = t.enums({
    'residentialArea': 'Residential Area',
    'institutionalArea': 'Institutional Area',
    'commercialArea': 'Commercial Area',
    'openArea':'Open Area'
});

function template(locals) {
    return (
      <View>
            <H1 style={{color:'#fff', marginTop: 30, marginBottom:10}}>No. of Involved vehicles</H1>
            <View style={{flex: 1, marginBottom:5}}>
                {locals.inputs.motorVehicles}
            </View>
            <View style={{flex: 1, marginBottom:5}}>
                {locals.inputs.nonMotorVehicles}
            </View>
            <View style={{flex: 1, marginBottom:5}}>
                {locals.inputs.pedestrians}
            </View>

            <H1 style={{color:'#fff', marginTop: 30, marginBottom:10}}>Accident spot</H1>
            <View style={{flex: 1, marginBottom:5}}>
                {locals.inputs.accidentSpot}
            </View>
      </View>
    );
}
  


const POST = t.struct({
    accidentSpot: Areas,

    motorVehicles: t.Number,
    nonMotorVehicles: t.Number,
    pedestrians: t.Number,
});

var options = {
    fields :{

        motorVehicles:{
            template: input,
        },
        nonMotorVehicles:{
            template: input,
        },
        pedestrians:{
            template: input,
        },


        accidentSpot:{
            auto:'none'
        },
    },
    template: template,
};

export default class StepThree extends Component {
    state = {
        options: options,
        value: {
            motorVehicles: 0,
            nonMotorVehicles: 0,
            pedestrians: 0,
        }
    }

    onChange = (value) => {
        // if(value.giCount > 0 || value.fatalCount > 0) {
        //     let _value = {...value, needAmbulance: true}
        //     this.setState({options: options, value: _value});
        // } else {
            this.setState({value: value});
        // }
    }

    onPress = async() => {
        let id = await getId()
        updateEntry(id, this.state.value)
        this.props.navigation.navigate('StepFour')
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={{padding:10}}>
                    <Form 
                        value={this.state.value} 
                        options={this.state.options} 
                        type={POST} 
                        onChange={this.onChange}
                        onPress={this.onPress}
                    />
                    <Button  style={{marginTop:30}} full rounded onPress={this.onPress}>
                        <Text>Next</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}