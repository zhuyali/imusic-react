import React from 'react';

import './style';

var MusicList = React.createClass({
  getInitialState: function() {
    return {
      loading: false,
      musicList: [{name: 'Loading'}]
    };
  },
  playSpecificMusic: function(event) {
    for(var i in this.state.musicList) {
      if(this.state.musicList[parseInt(i)].path ===
        event.target.getAttribute('data-path')) {
          let index = parseInt(i);
          this.props.changeMusic(index);
          break;
        }
    }
  },
  componentDidMount: function() {
    var request = new Request(this.props.source);
    fetch(this.props.source)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          this.setState({
            loading: false,
            musicList: result.data
          });
          this.props.getMusics(this.state.musicList);
        }
      });
  },
  render: function() {
    var that = this;
    return (
      <div id="music-list" style={{overflow: "auto"}}>
        <ol>
        {
          this.state.musicList.map(function(value) {
            return <li className="item" data-path={value.path} onClick={that.playSpecificMusic}>{value.name}</li>;
          })
        }
        </ol>
        </div>
    );
  }
});

module.exports = MusicList;

