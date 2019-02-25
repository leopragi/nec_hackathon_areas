import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon, Input, Button } from 'native-base';
import _ from 'lodash'

let borderRadius = 5

let defaultStyle = {
    display:'flex', 
    height: 56,
    backgroundColor:'#fff',
    flex:1,
    borderBottomRightRadius:borderRadius, 
    borderTopRightRadius:borderRadius
}

function input(locals) {
    var stylesheet = locals.stylesheet;
    var formGroupStyle = stylesheet.formGroup.normal;
    var controlLabelStyle = stylesheet.controlLabel.normal;
    let number = locals.value
    // let onChange = (valueToAdd) => () => {
    //     locals.onChange(Number(number)+valueToAdd)
    // }
    return (
        <View style={{display:'flex', flexDirection:'row'}}>
            <View style={{padding:15, display:'flex', flexDirection:'row', backgroundColor:'#fff', flex:6, height: 56, borderBottomLeftRadius:borderRadius, borderTopLeftRadius:borderRadius}}>
                {locals.placeholder&&<Icon type="FontAwesome5" name={locals.placeholder} style={{fontSize: 24, color:'#d14a44', marginRight:10}}/>}
                <Text style={{color:'#d14a44'}}>{locals.label}</Text>                
            </View>
            {/* <Button onPress={onChange(-1)} style={{backgroundColor:'#d14a44', flex:3, height: 56}}>
                <Icon type="Ionicons" name="remove" style={{fontSize: 24, color:'#fff'}}/>
            </Button> */}
            <Input value={String(number)} onChangeText={value => locals.onChange(value)} style={defaultStyle} />
            {/* <Button onPress={onChange(+1)} style={{backgroundColor:'#d14a44', flex:2, height: 56, borderBottomRightRadius:borderRadius, borderTopRightRadius:borderRadius}}>
                <Icon type="Ionicons" name="add" style={{fontSize: 24, color:'#fff'}}/>
            </Button> */}
        </View>
    );
}

export default input