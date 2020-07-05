import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
const { width } = Dimensions.get("window");

export default class Assist extends Component {
  _isMounted = false;
  state = {
    tileDimensions : [],
    tiles : []
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState ({
      tileDimensions : calcTileDimensions(width, 2),
      tiles : 'Lorem Ipsum Dolor Sit Amet to the very end'.split(' ')
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {this.state.tiles.map(i => Item({...this.state.tileDimensions, text: i}))}     
        </View>
      </ScrollView>
    );
  }
}

const Item = ({size, margin, text}) => (
    <View key={text} 
      style={[styles.item, {width: size, height: size, marginHorizontal: margin}]} 
      onStartShouldSetResponder={() => alert('You click by View')}>
      <Text style={styles.itemText}>{text}</Text>
    </View>
)

const calcTileDimensions = (deviceWidth, tpr) => {
  const margin = deviceWidth / (tpr * 10);
  const size = (deviceWidth - margin * (tpr * 2)) / tpr;
  return { size, margin };
};

const styles = StyleSheet.create({
  container: {
     justifyContent: "flex-start", flexDirection: "row", flexWrap: "wrap", marginTop: 30
  },
  item: {
    backgroundColor: 'black',  
     alignSelf: "flex-start",
     alignItems: 'center',
     justifyContent: 'center',
     marginBottom: 20
  },
  itemText: {
    color: 'white',
    fontSize: 20
  }
});