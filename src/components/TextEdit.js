import React, { Component } from "react"
import PropTypes from "prop-types"

class TextEdit extends Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    inputClassName: PropTypes.string,
    textClassName: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = { editable: false }
  }

  setEditMode(editable) {
    this.setState({ editable })
  }

  handleChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e.target.value)
    }
  }

  handleBlur(e) {
    if (this.props.onBlur) {
      this.props.onBlur(e.target.value)
    }
    this.setEditMode(false)
  }

  render() {
    let { name, value, inputClassName, textClassName ="editable" } = this.props

    if (this.state.editable) {
      return <input
        type="text"
        className={inputClassName}
        name={name}
        defaultValue={value}
        onChange={e => this.handleChange(e)}
        onBlur={e => this.handleBlur(e)}
      />
    }

    return <span
      className={textClassName}
      onClick={() => this.setEditMode(true)}
    >
      {value}
    </span>
  }
}

export default TextEdit
