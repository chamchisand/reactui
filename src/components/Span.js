import React, { PureComponent } from "react"
import PropTypes from "prop-types"

class Span extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    className: PropTypes.string
  }

  render() {
    const { value, className } = this.props
    return <span className={className}>{value}</span>
  }
}

export default Span
