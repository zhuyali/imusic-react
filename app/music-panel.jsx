var React = require('react');
var ReactDOM = require('react-dom');

var Tape = require('./components/tape/index');
var ControlPanel = require('./components/control-panel/index');
var MusicList = require('./components/music-list/index');

var MusicPanel = React.createClass({
  getInitialState: function() {
    return {
      paused: true,
      musicList: [],
      index: 0,
      musicLength: 0,
      stopped: false
    };
  },
  onStateChanged: function(paused, stopped) {
    var audio = ReactDOM.findDOMNode(this.refs.audio);
    if (paused && !this.state.stopped && !stopped){
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
      audio.play();
    });
  },
  onMusicsGet: function(musics) {
    var audio = ReactDOM.findDOMNode(this.refs.audio);
    audio.setAttribute('src',musics[0].path);
    this.setState({
      musicList: musics,
      musicLength: musics.length
    });
  },
  render: function() {
    return (
      <div>
        <Tape paused={this.state.paused} />
        <ControlPanel musicLength={this.state.musicLength} index={this.state.index} paused={this.state.paused} changeState={this.onStateChanged} changeMusic={this.onMusicChanged} stopped={this.state.stopped}/>
        <MusicList source="/api/get_musics" getMusics={this.onMusicsGet} changeMusic={this.onMusicChanged}/>
        <audio ref="audio" id="audio" style={{display: "none"}}><span>HTML5 audio not supported</span></audio>
      </div>
    );
  }
});

module.exports = MusicPanel;


