import React, { Component } from 'react';
import axios from 'axios'
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ItemCarousel from './ItemCarousel';

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
    const carouselItems = [
      {
          title:"Item 1",
          text: "Text 1",
      },
      {
          title:"Item 2",
          text: "Text 2",
      },
      {
          title:"Item 3",
          text: "Text 3",
      },
      {
          title:"Item 4",
          text: "Text 4",
      },
      {
          title:"Item 5",
          text: "Text 5",
      },
    ]

    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.carousel}>
          <Text> Trending today</Text>
          <ItemCarousel carouselItems={carouselItems}/>
        </View>
        <View style={styles.carousel}>
          <Text> You may like</Text>
          <ItemCarousel carouselItems={carouselItems}/>
        </View>
        <View style={styles.button}>
          <Button
            title="Store Assist"
            onPress={() => 
              this.props.navigation.navigate('Assist')}
          />
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
  },
  carousel: {
    flex: 5,
    padding: 20,
    alignItems: 'center',
    alignContent: "space-around",
    justifyContent: "flex-start",
  },
  button: {
    flex: 1,
    justifyContent: "flex-end"
  }
});
