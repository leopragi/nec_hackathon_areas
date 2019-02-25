import React, { Component } from 'react';
import { Text, View } from 'native-base';
import { Animated, StyleSheet } from 'react-native';

export default class ProgressBar extends Component {
    componentWillMount() {
        this.animation = new Animated.Value(this.props.progress)
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.progress != this.props.progress) {
            Animated.timing(this.animation, {
                toValue: this.props.progress,
                duration: this.props.duration
            }).start()
        }
    }

    render() {
        const {height, borderColor, borderWidth, borderRadius, barColor, fillColor, reverseMode} = this.props

        const widhtInterpolated = this.animation.interpolate({
            inputRange:[0, 1],
            outputRange:['0%', '100%'],
            extrapolate:'clamp'
        })

        let barStyle = {
            position:'absolute',
            top:0,
            bottom:0,
            width:widhtInterpolated,
            backgroundColor: barColor,
        }

        if(reverseMode) {
            barStyle.right = 0
        } else {
            barStyle.left = 0
        }

        return (
            <View style={{flex:1, flexDirection:'row', height}}>
                <View style={{flex:1, borderColor, borderWidth, borderRadius, overflow:'hidden'}}>
                    <View style={[StyleSheet.absoluteFill, {backgroundColor:fillColor}]}/>
                    <Animated.View
                        style={barStyle}
                    />
                </View>
            </View>
        )
    }
}

ProgressBar.defaultProps = {
    height: 56,
    borderColor:'#f8c035',
    borderWidth: 4,
    borderRadius: 32,
    barColor:'#160f30',
    fillColor:'#f8c035',
    duration: 100,
    reverseMode: false
}