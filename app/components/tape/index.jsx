import React from 'react';
import './style'

var Tape = React.createClass({
  render: function() {
    return (
      <div className="imusic-tape-wrapper">
          <div className="imusic-tape">
            <div className="imusic-tape-back">
              <div className={"imusic-tape-wheel " + "imusic-tape-wheel-left " + (this.props.paused ? "" : "clockwise")}><div></div></div>
              <div className={"imusic-tape-wheel " + "imusic-tape-wheel-right " + (this.props.paused ? "" : "anticlockwise")}><div></div></div>
            </div>
            <div className="imusic-tape-front imusic-tape-side-a">
              <span>A</span>
            </div>
          </div>
      </div>
    );
  }
});

module.exports = Tape;
