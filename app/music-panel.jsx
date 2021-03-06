import React from 'react';
import ReactDOM from 'react-dom';

import Tape from './components/tape/index';
import MusicList from './components/music-list/index';
import ControlPanel from './components/control-panel/index';

var MusicPanel = React.createClass({
  getInitialState: function() {
    return {
      paused: false,
      musicList: [],
      index: 0,
      musicLength: 0,
      stopped: true
    };
  },
  onStateChanged: function(paused, stopped) {
    var audio = ReactDOM.findDOMNode(this.refs.audio);
    if (paused && !stopped){
      audio.pause();
      this.setState({
        paused: true,
        stopped: false
      });
    } else if (!paused && !this.state.stopped && !stopped){
      audio.play();
      this.setState({
        paused: false,
        stopped: false
      });
    } else if (!this.state.stopped && stopped) {
      audio.pause();
      this.setState({
        paused: true,
        stopped: true
      });
    } else if (!paused && this.state.stopped && !stopped) {
      audio.load();
      audio.play();
      this.setState({
        paused: false,
        stopped: false
      });
    }
  },
  onMusicChanged: function(index) {
    var audio = ReactDOM.findDOMNode(this.refs.audio);
    this.setState({
      index: index
    });
    audio.setAttribute('src',this.state.musicList[index].path);
    document.title = this.state.musicList[index].name + ' - imusic';
    audio.play();
  },
  componentDidMount: function() {
    var that = this;
    var audio = ReactDOM.findDOMNode(this.refs.audio);
    audio.addEventListener('ended', function() {
      that.setState({
        index: that.state.index == (that.state.musicLength - 1) ? 0 : (that.state.index + 1)
      });
      audio.setAttribute('src',that.state.musicList[that.state.index].path);
      document.title = that.state.musicList[that.state.index].name + ' - imusic';
      audio.play();
    });
  },
  onMusicsGet: function(musics) {
    var audio = ReactDOM.findDOMNode(this.refs.audio);
    audio.setAttribute('src',musics[0].path);
    document.title = musics[0].name + ' - imusic';
    this.setState({
      musicList: musics,
      musicLength: musics.length
    });
  },
  render: function() {
    return (
      <div>
        <audio ref="audio" id="audio" style={{display: "none"}}><span>HTML5 audio not supported</span></audio>
        <Tape paused={this.state.paused} stopped={this.state.stopped} />
        <ControlPanel musicLength={this.state.musicLength} index={this.state.index} paused={this.state.paused} changeState={this.onStateChanged} changeMusic={this.onMusicChanged} stopped={this.state.stopped}/>
        <MusicList source="/api/get_musics" getMusics={this.onMusicsGet} changeMusic={this.onMusicChanged} changeState={this.onStateChanged}/>
      </div>
    );
  }
});

module.exports = MusicPanel;


