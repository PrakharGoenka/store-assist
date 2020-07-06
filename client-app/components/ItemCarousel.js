import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';


export default class ItemCarousel extends React.Component { 
  state = {
    activeIndex:0,
  }  

  _renderItem({item,index}){
    return (
      <View style={styles.list}>
        <View style={styles.item}>
          <Text style={{fontSize: 30}}>{item.title}</Text>
          <Text>{item.text}</Text>
        </View>
        <View style={styles.footer}>
          <Text> Footer Text #{index}</Text>
          <View style={{flexDirection: "row"}}>
            <Entypo.Button 
              name="location-pin" 
              size={24} 
              color="black" 
              backgroundColor="plain" 
            />
            <Entypo.Button 
              name="shopping-cart" 
              size={24} 
              color="black" 
              backgroundColor="plain"
            />
            <MaterialCommunityIcons.Button 
              name="augmented-reality" 
              size={24} 
              color="black" 
              backgroundColor="plain"
            />
          </View>
        </View>            
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Carousel
          layout={"default"}
          ref={ref => this.carousel = ref}
          data={this.props.carouselItems}
          sliderWidth={300}
          itemWidth={290}
          renderItem={this._renderItem}
          onSnapToItem = { index => this.setState({activeIndex:index}) } />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: { 
    flex: 1, flexDirection:'row', 
    justifyContent: 'center', 
    backgroundColor:'white'
  },
  list: {
    flex: 1,
    borderColor: 'black',
    borderStyle: "solid",
    borderWidth: 1,
  },
  item: {
    flex: 3,
    backgroundColor:'lightgrey',
    height: 250,
    padding: 50,
  },
  footer: {
    flex: 2, 
    flexDirection: "row",
    alignItems: 'center', 
    justifyContent: "space-between"
  }
});
