import React, { Component } from 'react';
import axios from 'axios';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ItemCarousel from './ItemCarousel';

export default class Cart extends Component{
  state = {
    items: [],
    inputField: ''
  }

  handleInput = (enteredText) => {
    this.setState({
        inputField: enteredText
    })
  };
  
  handleSearch = () => {
    try {
        axios.get(
          `http://192.168.1.101:5000/search/${this.state.inputField}`
        ).then((res)=>
            this.setState({
                items: res.data['items']
            }))
    } catch(error) {
        console.log(error)
    }
  }

  render() {
    console.log(this.state.items)
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextInput
                placeholder="Search an item"
                style={styles.text}
                value={this.state.inputField}
                onChangeText={this.handleInput}>
            </TextInput>
            <Button title="Find" onPress = {this.handleSearch}/>
        </View>
        <View style={styles.carousel}>
          <ItemCarousel carouselItems={this.state.items} isCart={0}/>
        </View>
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
        padding: 10
    },
    carousel: {
        flex: 5,
        padding: 20,
        alignItems: 'center',
        alignContent: "space-around", 
        justifyContent: "flex-start",
    },
    text: { 
        width: '70%', 
        borderBottomColor: 'black', 
        borderBottomWidth: 1,
        marginRight: 20
    }
});
