import React, { Component } from "react"
import PropTypes from "prop-types"

class TextEdit extends Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
    textClassName: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func
  }

  static defaultProps = {
    value: ""
  }

  constructor(props) {
    super(props)

    this.state = {
      editable: false,
      value: this.props.value
    }
  }

  componentDidUpdate() {
    if (this.state.editable) {
      // weird! but it will move cursor to end
      this.textInput.value = ""
      this.textInput.value = this.state.value
      this.textInput.focus()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value })
    }
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

    this.setState({ value: e.target.value })
    this.setEditMode(false)
  }

  render() {
    const { name, className, textClassName ="editable" } = this.props

    if (this.state.editable) {
      return <input
        ref={(input) => this.textInput = input}
        type="text"
        className={className}
        name={name}
        defaultValue={this.state.value}
        onChange={e => this.handleChange(e)}
        onBlur={e => this.handleBlur(e)}
      />
    }

    return <span
      className={textClassName}
      onClick={() => this.setEditMode(true)}
    >
      {this.state.value}
    </span>
  }
}

export default TextEdit
