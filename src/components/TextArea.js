import React, { Component } from "react"
import PropTypes from "prop-types"

class TextArea extends Component {
  static propTypes = {
    maxLength: PropTypes.number
  }

  constructor(props) {
    super(props)
    this.state = { length: 0 }
  }

  render() {
    const { maxLength = null } = this.props
    const isMaxed = this.state.length >= maxLength
    const style = isMaxed ? { backgroundColor: "#eee"} : null

    return (
      <div>
        <textarea
          style={style}
          maxLength={maxLength}
          onChange={(e) => {
            if (maxLength === null) {
              return null
            }

            if (e.target.value.length > maxLength) {
              e.target.value = e.target.value.slice(0, maxLength)
            }

            this.setState({ length: e.target.value.length })
          }}
        ></textarea>
        <div>len: {this.state.length}</div>
        <div>max: {maxLength}</div>
      </div>
    )
  }
}

export default TextArea
