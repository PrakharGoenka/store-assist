import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ItemCarousel from './ItemCarousel';
const image = {uri : 'https://previews.123rf.com/images/photobyphotoboy/photobyphotoboy1609/photobyphotoboy160900333/63312735-blur-apparel-in-the-mall.jpg'}
export default class Subsection extends Component{
  state = {
    subsection: null,
    items: []
  }

  async componentDidMount() {
    const { subsection } = this.props.route.params
    
    try {
      const res = await axios.get(
        `http://192.168.1.101:5000/section/sub/${subsection}`
      )
      const { items } = res.data
      this.setState ({
        subsection,
        items
      })
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.carousel}>
          <Text> Top Picks </Text>
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
    justifyContent: 'center'
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
