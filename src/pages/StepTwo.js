import React, { Component } from 'react';
import { Container, Content, Button, Text, View, H1 } from 'native-base';
import t from 'tcomb-form-native'; 
import { getId, updateEntry } from '../utils/message';
import toggleButton from '../components/ToggleButton';

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
            <H1 style={{color:'#fff', marginTop: 30, marginBottom:10}}>Property damage</H1>
            <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1, marginRight:5}}>
                    {locals.inputs.public}
                </View>
                <View style={{flex: 1}}>
                    {locals.inputs.private}
                </View>
            </View>

            <H1 style={{color:'#fff', marginTop: 30, marginBottom:10}}>Type of collision</H1>
            <View style={{flexDirection: 'row', marginBottom:5}}>
                <View style={{flex: 1, marginRight:5}}>
                    {locals.inputs.pedestrian}
                </View>
                <View style={{flex: 1, marginRight:5}}>
                    {locals.inputs.fromBack}
                </View>
                <View style={{flex: 1}}>
                    {locals.inputs.fromSide}
                </View>
            </View>
            <View style={{flexDirection: 'row', marginBottom:5}}>
                <View style={{flex: 1, marginRight:5}}>
                    {locals.inputs.offRoad}
                </View>
                <View style={{flex: 1, marginRight:5}}>
                    {locals.inputs.withAnimal}
                </View>
                <View style={{flex: 1}}>
                    {locals.inputs.stationaryObject}
                </View>
            </View>
            <View style={{flexDirection: 'row', marginBottom:5}}>
                <View style={{flex: 1, marginRight:5}}>
                    {locals.inputs.parkedVehicle}
                </View>
                <View style={{flex: 1, marginRight:5}}>
                    {locals.inputs.overTurn}
                </View>
                <View style={{flex: 1}}>
                    {locals.inputs.headOnCollision}
                </View>
            </View>

            <H1 style={{color:'#fff', marginTop: 30, marginBottom:10}}>Disposition</H1>
            <View style={{flex: 1}}>
                {locals.inputs.mechanicalFailureAndTowTruck}
            </View>
      </View>
    );
}
  


const POST = t.struct({
    public: t.Boolean,
    private: t.Boolean,

    pedestrian: t.Boolean,
    fromBack: t.Boolean,
    fromSide: t.Boolean,
    offRoad: t.Boolean,
    withAnimal: t.Boolean,
    stationaryObject: t.Boolean,
    parkedVehicle: t.Boolean,
    overTurn: t.Boolean,
    headOnCollision: t.Boolean,

    mechanicalFailureAndTowTruck: t.Boolean,
});

var options = {
    fields :{
        public:{
            template: toggleButton,
        },
        private:{
            template: toggleButton,
        },

        pedestrian:{
            template: toggleButton,
        },
        fromBack:{
            template: toggleButton,
        },
        fromSide:{
            template: toggleButton,
        },
        offRoad:{
            template: toggleButton,
        },
        withAnimal:{
            template: toggleButton,
        },
        stationaryObject:{
            template: toggleButton,
        },
        parkedVehicle:{
            template: toggleButton,
        },
        overTurn:{
            template: toggleButton,
        },
        headOnCollision:{
            template: toggleButton,
        },

        mechanicalFailureAndTowTruck: {
            template: toggleButton,
            label:'Mechanical Failure & Tow truck'
        },
    },
    template: template
};

export default class StepTwo extends Component {
    state = {
        options: options,
        value: null
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
        this.props.navigation.navigate('StepThree')
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