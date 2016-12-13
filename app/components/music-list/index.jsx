import React from 'react';

import './style';

var localhost = ['localhost', '127.0.0.1'];

var getQueryString = function(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r) {
    return unescape(r[2]);
  }
  return null;
};

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
    this.props.changeState(false, false);
  },
  componentDidMount: function() {
    if (!!~localhost.indexOf(document.domain)) {
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
    } else {
      var url = getQueryString('url');
      var defaultUrl = 'http://mr1.doubanio.com/678811c82aa655a13a64dcc4d1bea8ac/0/fm/song/p2638812_128k.mp3';
      var musicListTemp = [];
      musicListTemp.push({
        name: url ? url.substr(url.lastIndexOf('/') + 1) : '美好事物-房东的猫.mp3',
        path: url || defaultUrl
      });
      this.setState({
        loading: false,
        musicList: musicListTemp
      });
      this.props.getMusics(musicListTemp);
    }
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

