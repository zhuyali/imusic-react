import React from 'react';
import ReactDOM from 'react-dom';

import './style.css';

var ControlPanel = React.createClass({
  getInitialState: function() {
    return {
      stopped: false,
      paused: true,
      playPressed: false,
      pausePressed: false,
      prePressed: false,
      nextPressed: false,
      stopPressed: false
    };
  },
  handleClick: function(event) {

    var audio = ReactDOM.findDOMNode(this.refs.audio);
    audio.play();

    let index = this.props.index;
    let musicLength = this.props.musicLength;
    let paused = this.props.paused;
    let that = this;

    switch(event.target.id) {
      case "play":
        this.setState({
          paused: false,
          playPressed: true,
          pausePressed: false
        });
        this.props.changeState(false, false);
        setTimeout(function() {
          that.setState({
            playPressed: false
          })
        }, 100);
        break;
      case "pause":
        if (this.state.paused) {
          this.setState({
            paused: false,
            pausePressed: false
          });
          this.props.changeState(false, false);
        } else {
          this.setState({
            paused: true,
            pausePressed: true
          });
          this.props.changeState(true, false);
        }
        break;
      case "pre":
        if(index == 0) {
          index = musicLength - 1;
        } else {
          index--;
        }
        this.setState({
          pausePressed: false,
          paused: false,
          prePressed: true
        });
        this.props.changeState(false, false);
        this.props.changeMusic(index);
        setTimeout(function() {
          that.setState({
            prePressed: false
          })
        }, 100);
        break;
      case "next":
        if(index == (musicLength - 1)) {
          index = 0;
        } else {
          index++;
        }
        this.setState({
          pausePressed: false,
          paused: false,
          nextPressed: true
        });
        this.props.changeState(false, false);
        this.props.changeMusic(index);
        setTimeout(function() {
          that.setState({
            nextPressed: false
          })
        }, 100);
        break;
      case "stop":
        this.setState({
          pausePressed: false,
          stopPressed: true
        });
        this.props.changeState(true, true);
        setTimeout(function() {
          that.setState({
            stopPressed: false
          })
        }, 100);
        break;
    }
  },
  render: function() {
    return (
      <ul className="imusic-controls" style={{}}>
        <li id="play" className={"imusic-control-play control" + (this.state.playPressed ? " imusic-control-pressed" : "")} onClick={this.handleClick}>
        Play<span>▶</span>
        </li>
        <li id="pause" className={"imusic-control-pause control" + (this.state.pausePressed ? " imusic-control-pressed" : "")} onClick={this.handleClick}>
        Pause<span>❚❚</span>
        </li>
        <li id="pre" className={"imusic-control-rewind control" + (this.state.prePressed ? " imusic-control-pressed" : "")} onClick={this.handleClick}>
        Pre<span>◁</span>
        </li>
        <li id="next" className={"imusic-control-fforward control" + (this.state.nextPressed ? " imusic-control-pressed" : "")} onClick={this.handleClick}>
        Next<span>▷</span>
        </li>
        <li id="stop" className={"imusic-control-stop control" + (this.state.stopPressed ? " imusic-control-pressed" : "")} onClick={this.handleClick}>
        Stop<span>◼</span>
        </li>
        <audio id="soundAudio" ref="audio" src='https://unpkg.com/imusic-react@1.0.0/assets/click.mp3'><span>HTML5 audio not supported</span></audio>
      </ul>
    );
  }
});

module.exports = ControlPanel;
