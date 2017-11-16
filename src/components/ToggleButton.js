import React, { Component } from "react";

export default class ToggleButton extends Component {
  constructor(props) {
    super(props);

    this.onButtonClick = this.onButtonClick.bind(this);

    this.state = {
      on: true
    };
  }

  onButtonClick(e) {
    e.preventDefault();

    this.setState(prevState => {
      if (this.props.onChange) this.props.onChange(!prevState.on);
      return { on: !prevState.on };
    });
  }

  render() {
    let { textOn, textOff, labelOn, labelOff } = this.props;
    return (
      <div
        className={this.state.on ? "tg checked" : "tg off"}
        onClick={this.onButtonClick}
      >
        <div className="tg-btn">
          <div className="tg-on-text">{textOn ? textOn : "On"}</div>
          <div className="tg-off-text">{textOff ? textOff : "Off"}</div>
          <span className="tg-handler" />
        </div>

        <div className="tg-label">
          <div className="tg-on-text">{labelOn ? labelOn : "on label."}</div>
          <div className="tg-off-text">
            {labelOff ? labelOff : "off label."}
          </div>
        </div>

        <div className="clearfix" />
      </div>
    );
  }
}
