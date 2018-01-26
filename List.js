//import liraries
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Animated,
  Easing
} from 'react-native';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
// create a component
class List extends Component {
  constructor(props) {
    super(props);
    const scrollY = new Animated.Value(0);
    this.state = {
      isRefresh: false,
      scrollY,
      translateY: Animated.diffClamp(
        scrollY.interpolate({
          inputRange: [0.1, 1],
          outputRange: [0.1, 1],
          extrapolateLeft: 'clamp',
        }),
        0,
        1,
      ),
      timingTranslateY: new Animated.Value(0),
    }

  }
  componentDidMount() {
    const toValue = this.state.translateY.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -64],
      extrapolateLeft: 'clamp',
    })
    console.log(toValue)
    Animated.timing(this.state.timingTranslateY, {
      toValue: toValue,
      duration: 25,
      easing: Easing.linear,
      // useNativeDriver: true
    }).start();
    this.props.an = this.state.timingTranslateY
  }
  _onRefresh() {
    this.setState({ isRefresh: true })
    setTimeout(() => {
      this.setState({ isRefresh: false })
    }, 2000);
  }
  _renderItem(info) {
    return (
      <View
        style={{ height: 50, backgroundColor: '#ffffff' }}>
        <Text>{info.item}</Text>
      </View>
    )
  }
  _onScroll(info) {
    this.props.onSc(this.state.timingTranslateY)
  }
  render() {
    let data = []
    for (let index = 0; index < 100; index++) {
      data.push(index)
    }
    return (
      <View style={styles.container}>
        <AnimatedFlatList
          ref={flatList => this._flatList = flatList}
          scrollEventThrottle={1}
          refreshing={this.state.isRefresh}
          onRefresh={this._onRefresh.bind(this)}
          data={data}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { listener: this._onScroll.bind(this) }
            // { useNativeDriver: true }
          )}
          keyExtractor={(item, index) => item}
          renderItem={this._renderItem.bind(this)}
        />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'red',
  },
});

//make this component available to the app
export default List;
