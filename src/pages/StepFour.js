import React, { Component } from 'react';
import { Container, Content, Button, Text, View, H1 } from 'native-base';
import t from 'tcomb-form-native'; 
import { getId, updateEntry, deleteId } from '../utils/message';
import toggleButton from '../components/ToggleButton';
import input from '../components/Input';

const Form = t.form.Form;

function template(locals) {
    return (
      <View>
            <H1 style={{color:'#fff', marginTop: 30, marginBottom:10}}>Involved vehicles</H1>
            <View style={{flex: 1, marginBottom:5}}>
                {locals.inputs.twoWheeler}
            </View>
            <View style={{flex: 1, marginBottom:5}}>
                {locals.inputs.autoRickshaw}
            </View>
            <View style={{flex: 1, marginBottom:5}}>
                {locals.inputs.midFourWheeler}
            </View>
            <View style={{flex: 1, marginBottom:5}}>
                {locals.inputs.bus}
            </View>
            <View style={{flex: 1, marginBottom:5}}>
                {locals.inputs.heavyFourWheeler}
            </View>
            <View style={{flex: 1, marginBottom:5}}>
                {locals.inputs.tractor}
            </View>
            <View style={{flex: 1, marginBottom:5}}>
                {locals.inputs.bicycle}
            </View>
      </View>
    );
}
  


const POST = t.struct({
    twoWheeler: t.Number,
    autoRickshaw: t.Number,
    midFourWheeler: t.Number,
    bus: t.Number,
    heavyFourWheeler: t.Number,
    tractor: t.Number,
    bicycle: t.Number,
});

var options = {
    fields :{
        twoWheeler: {
            template: input,
        },
        autoRickshaw: {
            template: input,
        },
        midFourWheeler: {
            template: input,
            label:'Cars / Jeep / Van / Taxi'
        },
        bus: {
            template: input,
        },
        heavyFourWheeler: {
            template: input,
            label:'Truck / Lorry'
        },
        tractor: {
            template: input,
            label:'Tractor / Tempo'
        },
        bicycle: {
            template: input,
        },
    },
    template: template,
};

export default class StepFour extends Component {
    state = {
        options: options,
        value: {
            twoWheeler: 0,
            autoRickshaw: 0,
            midFourWheeler: 0,
            bus: 0,
            heavyFourWheeler: 0,
            tractor: 0,
            bicycle: 0,
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
        await deleteId()
        this.props.navigation.navigate('Camera')
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
                        <Text>Finish</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}