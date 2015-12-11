/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ToolbarAndroid,
  } = React;
const { appTitle } = require('./config');
const MainCanvas = require('./MainCanvas');

var NewsApp = React.createClass({
  handlePressMenuIcon() {
    this.refs['mainCanvas'].toggleDrawer();
  },

  render: function() {
    return (
      <View style={{flex:1}}>
        <ToolbarAndroid
          style={styles.toolbar}
          navIcon={require('./assets/icon-menu-android.png')}
          onIconClicked={this.handlePressMenuIcon}
          title={appTitle}
          />
        <MainCanvas ref='mainCanvas' />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  toolbar: {
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray'
  }
});

AppRegistry.registerComponent('NewsApp', () => NewsApp);
