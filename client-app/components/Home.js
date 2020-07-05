import React, { Component } from 'react';
import axios from 'axios'
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default class Home extends Component{
  state = {
    userData: null
  }

  componentDidMount() {
    axios.get('https://reqres.in/api/users/2')
    .then(res => {
        this.props.navigation.setOptions({
          title: `Welcome ${res.data.data.first_name}!`
        })
        this.setState({
          userData: res.data
      })
    })
    .catch(console.log)    
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text>Screen 1</Text>
        <Button
          title="Store Assist"
          onPress={() => 
            this.props.navigation.navigate('Assist')}
        />
      </View>
    );
  };  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
