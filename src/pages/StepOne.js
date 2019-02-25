import React, { Component } from 'react';
import { Container, Content, Button, Text, View, H1 } from 'native-base';
import t from 'tcomb-form-native'; 
import { getId, updateEntry } from '../utils/message';
import toggleButton from '../components/ToggleButton';
import input from '../components/Input';

const Form = t.form.Form;

const AFAR = t.struct({
    fatalCount: t.Number,
    giCount: t.Number,
    miCount: t.Number,
    needFireEngine: t.Boolean,
    needAmbulance: t.Boolean,
    hitAndRun: t.Boolean,
});


function template(locals) {
    return (
      <View>
            <H1 style={{color:'#fff', marginTop: 30, marginBottom:10}}>Fatalities</H1>
            <View style={{flex: 1, marginBottom:10}}>
                {locals.inputs.fatalCount}
            </View>
            <View style={{flex: 1, marginBottom:10}}>
                {locals.inputs.giCount}
            </View>
            <View style={{flex: 1, marginBottom:10}}>
                {locals.inputs.miCount}
            </View>
            <H1 style={{color:'#fff', marginTop: 30, marginBottom:10}}>Send</H1>
            <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1, marginRight:5}}>
                    {locals.inputs.needAmbulance}
                </View>
                <View style={{flex: 1, marginLeft:5}}>
                    {locals.inputs.needFireEngine}
                </View>
            </View>
            <H1 style={{color:'#fff', marginTop: 30, marginBottom:10}}>{"Hit & Run"}</H1>
            <View style={{flex: 1, marginBottom:10}}>
                {locals.inputs.hitAndRun}
            </View>
      </View>
    );
}

var options = {
    fields: {
        fatalCount: {
            label: 'Fatal',
            template: input,
            placeholder:'user-minus'
        },
        giCount: {
            label: 'Grievous Injured',
            template: input,
            placeholder:'bed'
        },
        miCount: {
            label: 'Minor Injury',
            template: input,
            placeholder:'user-check'
        },
        needFireEngine: {
            label: 'Fire Engine',
            template: toggleButton,
        },
        needAmbulance: {
            label: 'Ambulance',
            template: toggleButton,
        },
        hitAndRun: {
            label: 'Hit & Run',
            template: toggleButton,
        },
    },
    template: template
};

export default class StepOne extends Component {
    state = {
        options: options,
        value: {
            fatalCount: 0,
            giCount: 0,
            miCount: 0,
            needFireEngine: false,
            needAmbulance: false,
            needTowTruck: false,
        }
    }

    onChange = (value) => {
        // if(value.giCount == 0 && value.fatalCount == 0) {
        //     let _value = {...value, needAmbulance: false}
        //     this.setState({options: options, value: _value});
        // }
        if(value.giCount > 0 || value.fatalCount > 0) {
            let _value = {...value, needAmbulance: true}
            this.setState({options: options, value: _value});
        } else {
            this.setState({value: value});
        }
    }

    onPress = async() => {
        let id = await getId()
        updateEntry(id, this.state.value)
        this.props.navigation.navigate('StepTwo')
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={{padding:10}}>
                    <Form 
                        value={this.state.value} 
                        options={this.state.options} 
                        type={AFAR} 
                        onChange={this.onChange}
                        onPress={this.onPress}
                    />
                    <Button style={{marginTop:30}} full rounded onPress={this.onPress}>
                        <Text>Next</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}