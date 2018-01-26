/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
// import List from './List';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class App extends Component {
  constructor(props) {
    super(props);
    const scrollY = new Animated.Value(0);
    const scrollY2 = new Animated.Value(0);
    this.state = {
      isRefresh: false,
      scrollY,
      scrollY2, // 加这个是为了让每个List持有自己的偏移量
      translateY: Animated.diffClamp(
        Animated.add(
          scrollY.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp',
          }),
          scrollY2,
        ),
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
  }
  componentDidUpdate() {

  }
  componentWillUnmount() {

  }
  _deleteAnimatedAttachNativeEvent() {

  }
  _updateAnimatedAttachNativeEvent() {
    // this.state.timingTranslateY.addListener((info) => {
    //   console.log(info)
    //   if (info.value > this.lastOffsetY) {
    //     // 想上滑
    //   } else if (info.value < this.lastOffsetY) {
    //     // 向下滑
    //   }
    //   this.lastOffsetY = info.value;
    // })
  }
  _onRefresh() {
    this.setState({ isRefresh: true })
    setTimeout(() => {
      this.setState({ isRefresh: false })
    }, 2000);
  }

  _renderTab(par) {
    let data = []
    for (let index = 0; index < 100; index++) {
      data.push(index)
    }
    let scrollY = this.state.scrollY
    if (par == 2) {
      scrollY = this.state.scrollY2
    }
    return (
      // <List onSc={this._onSc.bind(this)} />
      <AnimatedFlatList
        ref={flatList => this._flatList = flatList}
        scrollEventThrottle={1}
        refreshing={this.state.isRefresh}
        onRefresh={this._onRefresh.bind(this)}
        data={data}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          //{ useNativeDriver: true }
        )}
        keyExtractor={(item, index) => item}
        renderItem={this._renderItem.bind(this)}
      />
    )
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
    const translateY = this.state.timingTranslateY
    console.log('z')
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            height: 64, backgroundColor: '#304758', justifyContent: 'center', alignItems: 'center',
            transform: [{ translateY }],
          }}>
          <Text style={{ color: '#fff' }}>导航栏</Text>
        </Animated.View>
        <Animated.View
          style={{
            flex: 1,
            transform: [{ translateY }],
          }}>
          <ScrollableTabView
            style={{}}
            initialPage={0}
            renderTabBar={() => <DefaultTabBar />}
          >
            <View tabLabel='Tab1' style={{ flex: 1 }}>
              {this._renderTab(1)}
            </View>
            <View tabLabel='Tab2' style={{ flex: 1 }}>
              {this._renderTab(2)}
            </View>
            <View tabLabel='Tab3' style={{ flex: 1 }}>
              {this._renderTab(3)}
            </View>
          </ScrollableTabView>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
