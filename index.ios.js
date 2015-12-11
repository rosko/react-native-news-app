/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS
  } = React;
const { appTitle } = require('./config');
const MainCanvas = require('./MainCanvas');

var NewsApp = React.createClass({

  handlePressMenuIcon() {
    this.mainCanvas && this.mainCanvas.toggleDrawer();
  },

  render() {
    return (
      <NavigatorIOS
        style={{flex:1}}
        initialRoute={{
          component: MainCanvas,
          title: appTitle,
          passProps: { onMount: (mainCanvas) => {
             this.mainCanvas = mainCanvas;
          }},
          leftButtonIcon: require('./assets/icon-menu-ios.png'),
          onLeftButtonPress: this.handlePressMenuIcon
        }}
        />
    );
  }
});

AppRegistry.registerComponent('NewsApp', () => NewsApp);
