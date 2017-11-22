import React, { Component } from "react"
import PropTypes from "prop-types"

class Backdrop extends Component {
  static propTypes = {
    baseClassName: PropTypes.string,
    backdrop: PropTypes.bool
  }

  render() {
    let { baseClassName = "x-backdrop", backdrop = true } = this.props

    if (!backdrop) {
      return null
    }

    return <div className={baseClassName}></div>
  }
}

export default Backdrop
