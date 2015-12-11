'use strict';

const React = require('react-native');
const {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  ListView,
  Platform,
  TouchableOpacity,
  ActivityIndicatorIOS,
  StatusBarIOS
  } = React;
const _ = require('lodash');
const moment = require('moment');
const DrawerLayout = require('react-native-drawer-layout');
const Sidebar = require('./Sidebar');
const content = require('./services/content');

const MainCanvas = React.createClass({

  getInitialState() {
    return {
      items: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1.id !== row2.id
      }),
      loading: true
    }
  },

  // helpers

  loadChannel(channelID) {
    this.setState({loading: true});
    content.loadChannel(channelID)
      .then(channel => {
        this.setState({
          items: this.state.items.cloneWithRows(channel.items),
          loading: false
        });
      })
      .catch(err => console.trace(err));
    this.refs.drawer.closeDrawer();
  },

  toggleDrawer() {
    if (this._drawerOpened) {
      this.refs['drawer'].closeDrawer();
    } else {
      this.refs['drawer'].openDrawer();
    }
  },

  // handlers

  handlePressChannel(channel) {
    this.channel = channel;
    this.loadChannel(channel.id);
  },

  handlePressArticle(article) {
    this.props.onPressArticle && this.props.onPressArticle(article, this.channel.title);
  },

  // lifecycle

  componentDidMount() {
    this.channel = {};
    content.loadOnlyChannelsList()
      .then(channels => {
        this.channel = channels[0];
        this.loadChannel(channels[0].id)
      })
      .catch(e => console.error(e));
    this.props.onMount && this.props.onMount(this);
  },

  // render

  renderItem(item) {
    let { images, title, createdDate, id } = item;
    createdDate = moment(createdDate).format('MMM D, hh:mma');
    let imageURL = ((((images || [])[0] || {}).ImageLinks || [])[0] || {}).Url;
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={this.handlePressArticle.bind(this, item)}
        key={id}>
        <View style={styles.item} >
          <View style={styles.itemThumbnailWrapper}>
            <Image
              source={{uri: imageURL}}
              style={styles.itemThumbnail}
              />
          </View>
          <View style={styles.itemText}>
            <Text style={styles.itemTitle}>{title}</Text>
            <Text style={styles.itemDate}>{createdDate}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  },

  renderSpinner() {
    return Platform.OS === 'ios' ?
      this.renderSpinnerIOS() :
      this.renderSpinnerAndroid();
  },

  renderSpinnerAndroid() {
    return (
      <Text>Loading...</Text>
    )
  },

  renderSpinnerIOS() {
    return (
      <ActivityIndicatorIOS
        style={styles.activityIndicator}
        size='large'
        color='gray'
        />
    )
  },

  render() {
    let { loading } = this.state;
    let { channel } = this;
    channel = channel || {};

    return (
      <DrawerLayout
        ref='drawer'
        drawerWidth={300}
        drawerPosition={DrawerLayout.positions.Left}
        onDrawerOpen={() => this._drawerOpened = true}
        onDrawerClose={() => this._drawerOpened = false}
        renderNavigationView={() =>
        <Sidebar
          onPressChannel={this.handlePressChannel}
        />}
        >
        <View style={[styles.spinner, loading ? styles.spinnerLoading : styles.spinnerLoaded]}>
          {loading && this.renderSpinner()}
        </View>

        <ListView
          dataSource={this.state.items}
          initialListSize={10}
          renderHeader={() => <View style={styles.header}>
            <Text style={styles.channelTitle}>{channel.title}</Text>
          </View>}
          renderRow={this.renderItem}
          />
      </DrawerLayout>
    );
  }
});

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5
  },
  itemText: {
    flex: 1
  },
  itemThumbnailWrapper: {
    width: 110,
    height: 75
  },
  itemThumbnail: {
    marginRight: 10,
    width: 100,
    height: 75
  },
  itemTitle: {
    fontSize: 14,
    marginBottom: 8,
    color: 'rgb(0,0,0)',
    textAlign: 'left'
  },
  itemDate: {
    textAlign: 'left',
    color: 'grey'
  },
  header: {
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  channelTitle: {
    fontSize: 16,
    margin: 10,
    color: 'rgb(255,255,255)',
    textAlign: 'left'
  },

  spinner: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  spinnerLoading: {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  },
  spinnerLoaded: {},
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

module.exports = MainCanvas;
