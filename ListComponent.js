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
class ListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { isRefresh: false }
  }
  _onRefresh() {

  }
  _onScroll(info) {
    // 回调
    if (this.props.onScroll) {
      this.props.onScroll(info)
    }
  }
  _renderItem(info) {
    return (
      <View
        style={{ height: 50, backgroundColor: '#ffffff' }}>
        <Text>{info.item}</Text>
      </View>
    )
  }
  render() {
    let data = []
    for (let index = 0; index < 100; index++) {
      data.push(index)
    }
    return (
      <View style={styles.container}>
        <FlatList
          style={{ paddingTop: 0, }}
          ref={flatList => this._flatList = flatList}
          scrollEventThrottle={1}
          refreshing={this.state.isRefresh}
          onRefresh={this._onRefresh.bind(this)}
          data={data}
          onScroll={this._onScroll.bind(this)}
          // onMomentumScrollBegin={this._onMomentumScrollBegin}
          // onMomentumScrollEnd={this._onMomentumScrollEnd}
          // onScrollEndDrag={this._onScrollEndDrag}
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
    // backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default ListComponent;
