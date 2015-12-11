'use strict';

const React = require('react-native');
const {
  StyleSheet,
  ScrollView,
  View,
  WebView,
  Text,
  Platform,
  InteractionManager
  } = React;
const WebViewAndroid = require('react-native-webview-android');
const content = require('./services/content');
const { readingPaneStyles } = require('./config');

const ReadingPane = React.createClass({

  getInitialState() {
    return {
      article: this.props.article || {}
    }
  },

  componentDidMount() {
    let { article }  = this.props;
    InteractionManager.runAfterInteractions(() => {
      content.loadArticle(article.id)
        .then(article => {
          this.isMounted && this.setState({article})
        });
    });
  },

  render() {
    let { contentHTML, title } = this.state.article;
    contentHTML = readingPaneStyles + (contentHTML || '');

    return (
      <View style={{flex:1}}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {title}
            </Text>
          </View>
          <View style={{flex:1}}>
            <WebViewAndroid
              style={{flex:1}}
              html={contentHTML}
              javaScriptEnabled={false}
              geolocationEnabled={false}
              builtInZoomControls={false}
              />
          </View>
        </View>
      </View>
    );
  }

});

module.exports = ReadingPane;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  header: {
    marginTop: 0
  },
  title: {
    margin: 10,
    fontSize: 24
  }
});
