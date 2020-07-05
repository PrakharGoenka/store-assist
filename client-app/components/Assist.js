import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default class Assist extends Component{
  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text>Screen 2</Text>
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
