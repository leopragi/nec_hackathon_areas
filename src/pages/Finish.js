import React, { Component } from 'react';
import { Text, Container, Content, H1 } from 'native-base'

async function wait(time) {
	return new Promise((res, rej) => {
		setTimeout(() => res(), time)
	})
}

export default class Finish extends Component {
    async componentDidMount(){
        await wait(2000)
        this.props.navigation.navigate('Home')
    }
    render() {
        return (
            <Container>
                <Content contentContainerStyle={{display:'flex', justifyContent:'center', alignItems:'center', flexGrow:1}}>
                    <Text style={{color:'#fff'}}>Data successfully submitted to CARS</Text>
                    <H1 style={{color:'#fff'}}>Thanks</H1>
                </Content>
            </Container>
        )
    }
}