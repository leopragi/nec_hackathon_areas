import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

let defaultStyle = {
    display:'flex', 
    padding: 10,
    borderRadius:5,
    height: 72,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
}

function toggleButton(locals) {
    var stylesheet = locals.stylesheet;
    var formGroupStyle = stylesheet.formGroup.normal;
    var controlLabelStyle = stylesheet.controlLabel.normal;
    var checkboxStyle = stylesheet.checkbox.normal;
    
    var label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null;
    let isChecked = locals.value

    let touchableStyle = isChecked ? {backgroundColor:'#d14a44'} : {backgroundColor:'#fff'}
    let textStyle = isChecked ? {color:'#fff'} : {color:'#d14a44'}

    return (
        <TouchableOpacity 
            style={[touchableStyle, defaultStyle]} 
            onPress={() => locals.onChange(!isChecked)}
        >
            <Text style={textStyle}>{locals.label}</Text>
            {isChecked && <Icon style={{color:'#fff'}} type="Ionicons" name="checkmark" />}
        </TouchableOpacity>
    );
}

export default toggleButton