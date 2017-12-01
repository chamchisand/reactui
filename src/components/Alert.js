import React, { Component } from "react"
import PropTypes from "prop-types"
import Backdrop from "./Backdrop"

class Alert extends Component {
  static propTypes = {
    baseClassName: PropTypes.string,
    title: PropTypes.node,
    message: PropTypes.node,
    ok: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.bool
    ]),
    cancel: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.bool
    ]),
    handleClick: PropTypes.func,
  }

  handleClick(isConfirmed) {
    if (this.props.handleClick) {
      this.props.handleClick(isConfirmed)
    }
  }

  render() {
    let {
      baseClassName = "x-alert",
      title,
      message,
      ok = "OK!",
      cancel = "Cancel"
    } = this.props

    return (
      <div>
        <Backdrop {...this.props}/>
        <div
          className={`${baseClassName}`}
          tabIndex="-1"
          role="dialog"
        >
          <div
            className={`${baseClassName}-content`}
            role="document"
          >
            {title && <h5 className={`${baseClassName}-title`}>{title}</h5>}
            {message && <p className={`${baseClassName}-body`}>{message}</p>}
            <div className={`${baseClassName}-footer`}>
              {cancel !== false && <button type="button" onClick={() => this.handleClick(false)}>{ cancel }</button>}
              {ok !== false && <button type="button" onClick={() => this.handleClick(true)}>{ ok }</button>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Alert
