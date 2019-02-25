import React, { Component } from 'react';
import { Dimensions, Animated, TouchableOpacity } from 'react-native'
import { Text, View } from 'native-base';


const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const unit = Dimensions.get('window').width / 1.8;

export default class RippleButton extends Component {

    componentWillMount() {
        this.animatedValue = new Animated.Value(0)
        this.compressValue = new Animated.Value(1)
        this.innerRipple = new Animated.Value(1.3)
        this.outerRipple = new Animated.Value(1.5)
    }

    startRippleAnimations = () => {
        this.innerRippleAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(this.innerRipple, {
                    toValue: 1.2,
                    duration: 2000
                }),
                Animated.timing(this.innerRipple, {
                    toValue: 1.4,
                    duration: 2000
                }),
                Animated.timing(this.innerRipple, {
                    toValue: 1.3,
                    duration: 2000,
                }),
            ])
        );
        this.innerRippleAnimation.start();

        this.outerRippleAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(this.outerRipple, {
                    toValue: 1.4,
                    duration: 2100
                }),
                Animated.timing(this.outerRipple, {
                    toValue: 1.6,
                    duration: 2100
                }),
                Animated.timing(this.outerRipple, {
                    toValue: 1.5,
                    duration: 2100
                }),
            ])
        );
        this.outerRippleAnimation.start();
    }

    doSendAnimation = () => {
        this.outerRippleAnimation.stop()
        this.innerRippleAnimation.stop()
        Animated.timing(this.animatedValue, {
            toValue: 150,
            duration: 1500
        }).start()
        Animated.timing(this.compressValue, {
            toValue: 0.8,
            duration: 1500
        }).start()
    }

    componentDidMount(){
        this.startRippleAnimations()
    }

    _onClick = () => {
        this.doSendAnimation()
        if(this.props.onClick) {
            this.props.onClick()
        }
    }

    render() {
        const interpolateColor = this.animatedValue.interpolate({
            inputRange: [0, 150],
            outputRange: ['#d14a44','#f8c035']
        })

        const animatedStyle = {
            backgroundColor: interpolateColor,
            transform: [
                { scaleX: this.compressValue },
                { scaleY: this.compressValue },
            ]
        }

        const outerRippleStyle = {
            backgroundColor: interpolateColor,
            transform: [
                { scaleX: this.outerRipple },
                { scaleY: this.outerRipple },
            ]
        }

        const innerRippleStyle = {
            backgroundColor: interpolateColor,
            transform: [
                { scaleX: this.innerRipple },
                { scaleY: this.innerRipple },
            ]
        }

        return (
            <View>
                <View style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <AnimatedTouchable style={{...outerRippleStyle, opacity: 0.3, height:unit, width:unit, borderRadius: unit/2, position:'absolute'}} />
                    <AnimatedTouchable style={{...innerRippleStyle, opacity: 0.6, height:unit, width:unit, borderRadius: unit/2, position:'absolute'}} />
                    <AnimatedTouchable onPress={this._onClick} style={{...animatedStyle, height:unit, width:unit, borderRadius: unit/2, position:'absolute'}} />
                    <Text onPress={this._onClick} style={{position:'absolute', color:'#160f30', fontSize:56}}>{this.props.text.toUpperCase() || 'CLICK'}</Text>
                </View>
            </View>
        )
    }
}