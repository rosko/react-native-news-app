'use strict';

const React = require('react-native');
const {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  ListView,
  Platform
  } = React;
const content = require('./services/content');

const Sidebar = React.createClass({

  getInitialState() {
    return {
      channels: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loading: true
    }
  },

  handlePressChannel(channelID) {
    this.props.onPressChannel && this.props.onPressChannel(channelID);
  },

  componentDidMount() {
    content.loadOnlyChannelsList().then(channels => {

      this.setState({
        channels: this.state.channels.cloneWithRows(channels),
        loading: false
      });

      return channels[0].id
    });
  },

  renderItem(channel) {
    let { title, id } = channel;
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={this.handlePressChannel.bind(this, id)}
        style={styles.channel}
        >
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    );
  },

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.channels}
        renderRow={this.renderItem}
        />
    )
  }
});

module.exports = Sidebar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 64 : 0,
    backgroundColor: '#fff'
  },
  channel: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1
  },
  title: {
    fontSize: 14,
    textAlign: 'left'
  }
});