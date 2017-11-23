import React, { Component } from "react";

export default class PasswordMatchInput extends Component {
  constructor(props) {
    super(props);
    this.onTempChange = this.onTempChange.bind(this);
    this.onMatching = this.onMatching.bind(this);
    this.onConfirmFocus = this.onConfirmFocus.bind(this);
    this.state = { temp: "", match: false, confirmFocus: false };
  }

  onTempChange(e) {
    this.setState({ temp: e.currentTarget.value });
  }

  onMatching(e) {
    const value = e.currentTarget.value;
    if (value !== this.state.temp) {
      this.setState({ match: false });
      this.props.onConfirmedChange && this.props.onConfirmedChange(value);
    } else {
      this.setState({ match: true });
      this.props.onConfirmedChange && this.props.onConfirmedChange(value);
    }
  }

  onConfirmFocus(e) {
    this.setState({ confirmFocus: true });
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            onChange={this.onTempChange}
          />
        </div>
        <div className="form-group">
          <label>Re-Enter Password</label>
          <input
            className={
              "form-control" +
              ((this.state.confirmFocus &&
                (this.state.match ? "" : " is-invalid")) ||
                "")
            }
            type="password"
            onChange={this.onMatching}
            onFocus={this.onConfirmFocus}
          />
          {this.state.confirmFocus &&
            (this.state.match ? null : (
              <div className="invalid-feedback">The password doesnt match</div>
            ))}
        </div>
      </div>
    );
  }
}
