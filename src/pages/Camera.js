import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import Camera from 'react-native-camera';
import ProgressBar from '../components/ProgressBar';
import { uploadImage } from '../utils/message';

export default class BadInstagramCloneApp extends Component {

    state = {
        animatedValue: new Animated.Value(40),
        animatedValue2: new Animated.Value(1),
        uploading:false,
        recording: false
    }

    stopRecording = () => {
        this.camera.stopCapture();
        Animated.timing(this.state.animatedValue, {
            toValue: 40,
            duration: 2000
        }).start()
        this.setState({uploading:true, recording:false})
        this.props.navigation.navigate('Finish')
    }

    startRecording = async() => {
        Animated.timing(this.state.animatedValue, {
            toValue: 0,
            duration: 2000
        }).start()
        Animated.timing(this.state.animatedValue2, {
            toValue: 0.5,
            duration: 2000
        }).start()
        this.setState({ recording: true });
        let data = await this.camera.capture({
            mode: Camera.constants.CaptureMode.video
        })
        console.log(data.path)
    }

  render() {
      let {uploading, recording} = this.state
        let handler = recording ? this.stopRecording: this.startRecording

        const interpolateColor = this.state.animatedValue.interpolate({
            inputRange: [0, 20],
            outputRange: ['#d14a44','#fff']
        })

        const animatedStyle = {
            backgroundColor: interpolateColor,
            transform: [
                { scaleX: this.state.animatedValue2 },
                { scaleY: this.state.animatedValue2 },
            ]
        }
    return (
        <View style={styles.container}>
            <Camera
                ref={(cam) => {
                    this.camera = cam;
                }}
                style={styles.preview}
                aspect={Camera.constants.Aspect.fill}
                captureMode = {Camera.constants.CaptureMode.video}
            >
            <TouchableOpacity onPress={handler}>
                <Animated.View style={[{
                    backgroundColor: '#fff',
                    color: '#000',
                    flex: 0,
                    padding: 10,
                    margin: 40,
                    height: 80,
                    width: 80,
                    borderRadius:this.state.animatedValue
                },animatedStyle]}>
            </Animated.View>
            </TouchableOpacity>
            </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
});