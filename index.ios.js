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
const ReadingPane = require('./ReadingPane');

var NewsApp = React.createClass({

  handlePressMenuIcon() {
    this.mainCanvas && this.mainCanvas.toggleDrawer();
  },

  handlePressArticle(article, channelTitle) {
    let { title, metadata } = article;
    this.refs.navigator.push({
      title: channelTitle,
      component: ReadingPane,
      passProps: {
        article
      }
    });
  },

  render() {
    return (
      <NavigatorIOS
        ref='navigator'
        style={{flex:1}}
        initialRoute={{
          component: MainCanvas,
          title: appTitle,
          passProps: {
            onMount: (mainCanvas) => {
               this.mainCanvas = mainCanvas;
            },
            onPressArticle: this.handlePressArticle
          },
          leftButtonIcon: require('./assets/icon-menu-ios.png'),
          onLeftButtonPress: this.handlePressMenuIcon
        }}
        />
    );
  }
});

AppRegistry.registerComponent('NewsApp', () => NewsApp);
