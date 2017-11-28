import React, { Component } from "react"
import { createPortal } from "react-dom"
import PropTypes from "prop-types"

class Backdrop extends Component {
  static propTypes = {
    baseClassName: PropTypes.string,
    backdrop: PropTypes.bool,
  }

  render() {
    let { baseClassName = "x-backdrop", backdrop = true } = this.props

    if (!backdrop) {
      return null
    }

    return createPortal(
      <div className={baseClassName}></div>,
      document.body
    )
  }
}

export default Backdrop
