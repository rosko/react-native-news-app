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
  Navigator,
  ToolbarAndroid,
  } = React;
const { appTitle } = require('./config');
const MainCanvas = require('./MainCanvas');
const ReadingPane = require('./ReadingPane');

const Scene = React.createClass({

  renderMainCanvas() {
    return (
      <View style={{flex:1}}>
        <ToolbarAndroid
          style={styles.toolbar}
          navIcon={require('./assets/icon-menu-android.png')}
          onIconClicked={() => {
            this.refs['mainCanvas'].toggleDrawer();
          }}
          title={appTitle}
          />
        <MainCanvas
          ref='mainCanvas'
          onPressArticle={this.props.onPressArticle}
          />
      </View>
    );
  },

  renderReadingPane() {
    let { route } = this.props;

    return (
      <View style={{flex:1}}>
        <ToolbarAndroid
          style={styles.toolbar}
          navIcon={require('./assets/icon-back-android.png')}
          onIconClicked={this.props.onBack}
          title={appTitle}
          />
        <ReadingPane article={route.article} />
      </View>
    );
  },

  render(){
    let { type } = this.props;
    if (type === 'readingPane') {
      return this.renderReadingPane()
    } else {
      return this.renderMainCanvas()
    }
  }
});

var NewsApp = React.createClass({

  render: function() {
    return (
      <Navigator
        initialRoute={{type: 'mainCanvas', index: 0}}
        renderScene={(route, navigator) =>
          <Scene
            type={route.type}
            route={route}
            onPressArticle={(article) => {
              var nextIndex = route.index + 1;
              navigator.push({
                type: 'readingPane',
                article,
                index: nextIndex
              });
            }}
            onBack={() => {
              if (route.index > 0) {
                navigator.pop();
              }
            }}
          />
        }
        />

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
