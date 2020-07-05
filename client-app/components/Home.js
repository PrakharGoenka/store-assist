import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default class Home extends Component{

  componentDidMount() {
    this.props.navigation.setOptions({title: 'Welcome to Walmart!'})
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
