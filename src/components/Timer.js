import React, { Component } from "react"
import PropTypes from "prop-types"

class Timer extends Component {
  static propTypes = {
    running: PropTypes.bool,
    interval: PropTypes.number,
    handleUpdate: PropTypes.func
  }

  static defaultProps ={
    on: false,
    interval: 1000,
    running: false
  }

  constructor(props) {
    super(props)

    this.timer = null
    this.state = { running: false, started: 0, elapsed: 0 }
    this.toggle = this.toggle.bind(this)

    // document.addEventListener('keyup', (e) => {
    //   if (e.key === 'Enter') {
    //     this.toggle()
    //   }
    // })
  }

  componentDidUpdate() {
    this.toggle(this.state.running)

    // if (this.props.handleUpdate) {
    //   this.props.handleUpdate(this.state)
    // }
  }

  toggle(running) {
    if (!running) {
      clearInterval(this.timer)
      this.timer = null
      this.setState({ running, started: 0 })
    } else {
      this.timer = setInterval(() => {
        this.setState({
          elapsed: parseInt((Date.now() - this.state.started) / 1000)
        })
      }, this.props.interval)

      this.setState({ running, started: Date.now(), elapsed: 0 })
    }
  }

  render() {
    let { running, elapsed } = this.state

    return (
      <div>
        <button type="button" onClick={() => this.toggle(this.state.running)}>
          {running ? "Stop" : "Start"}
        </button>
        <span>{elapsed} sec</span>
      </div>
    )
  }
}

export default Timer
