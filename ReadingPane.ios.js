'use strict';

const React = require('react-native');
const {
  StyleSheet,
  ScrollView,
  View,
  WebView,
  Text,
  Platform
  } = React;
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
    content.loadArticle(article.id)
      .then(article => {
        this.isMounted && this.setState({article})
      })
  },

  render() {
    let { contentHTML, title } = this.state.article;
    contentHTML = readingPaneStyles + (contentHTML || '');

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {title}
          </Text>
        </View>
        <WebView
          style={{flex:1}}
          html={contentHTML}
          automaticallyAdjustContentInsets={true}
          allowsInlineMediaPlayback={true}
          />
      </View>
    );
  }

});

module.exports = ReadingPane;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  header: {
    marginTop: 60
  },
  title: {
    margin: 10,
    fontSize: 24
  }
});
