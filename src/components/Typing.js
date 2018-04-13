import React, { Component } from "react"
import PropTypes from "prop-types"
import isPrintableKey from "middleware/isPrintableKey"
import { netWpm } from "middleware/wpm"
import Span from "components/Span"

class Typing extends Component {
  static propTypes = {
    paragraph: PropTypes.string
  }

  constructor(props) {
    super(props)

    const paragraph = this.props.paragraph.replace(/^\s+|\s+$/g, '')

    this.chars = paragraph.split('').map(value => {
      return {
        value,
        status: null,
        highlight: false
      }
    })

    this.state = {
      wpm: 0,
      pos: 0,
      startTs: 0,
      elapsed: 0,
      errorCount: 0,
      running: false
    }

    this.timer = null
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown)
  }

  stop() {
    clearInterval(this.timer)
    this.timer = null
  }

  start() {
    this.timer = setInterval(() => {
      this.setState({
        elapsed: Date.now() - this.state.startTs
      })
    }, 100)
  }

  prevWord(pos, highlight) {
    const word = []

    while (this.chars[pos] && this.chars[pos].value !== ' ') {
      word.push(this.chars[pos--])
    }

    word.forEach(char => char.highlight = highlight)
  }

  nextWord(pos, highlight) {
    const word = []

    while (this.chars[pos] && this.chars[pos].value !== ' ') {
      word.push(this.chars[pos++])
    }

    word.forEach(char => char.highlight = highlight)
  }

  handleKeyDown(e) {
    let { pos, running, startTs, errorCount } = this.state
    const chars = this.chars

    if (pos >= chars.length) {
      return
    }

    if (!running) {
      this.start()
      running = true
      startTs = Date.now()
    }

    if (e.key === 'Backspace') {
      if (pos > 0) {
        if (chars[pos]) {
          chars[pos].typed = null
          chars[pos].status = null
        }

        pos--
      }

      if (chars[pos]) {
        chars[pos].status = null
        chars[pos].typed = null

        if (chars[pos].value === ' ') {
          this.nextWord(pos + 1, false)
        } else if (!chars[pos].highlight) {
          this.prevWord(pos, true)
        }
      }
    } else if (isPrintableKey(e.keyCode)) {
      if (chars[pos]) {
        chars[pos].typed = e.key

        if (chars[pos].value === e.key) {
          chars[pos].status = 'ok'
        } else {
          chars[pos].status = 'warn'
          errorCount++
        }

        pos++

        if (chars[pos]) {
          if (chars[pos].value === ' ') {
            this.prevWord(pos - 1, false)
          } else if (!chars[pos].highlight) {
            this.nextWord(pos, true)
          }
        }
      }
    }

    if (pos >= chars.length) {
      this.stop()
      running = false
    }

    this.setState({
      pos,
      startTs,
      running,
      errorCount
    })
  }

  render() {
    const { pos, elapsed, errorCount } = this.state
    // const errorCount = this.chars.filter(char => char.status === 'warn').length
    const wpm = netWpm(pos, errorCount, elapsed)

    return (
      <div>
        <p>POS: {pos}</p>
        <p>WPM: {wpm}</p>
        <p>Errors: {errorCount}</p>
        <p>Time: {(elapsed / 1000).toFixed(2)} sec</p>
        <p>
          {this.chars.map((char, key) => {
            const className = []

            if (pos === key) {
              className.push('cursor')
            }

            if (char.highlight) {
              className.push('highlight')
            }

            if (char.status) {
              className.push(char.status)
            }

            return <Span
              key={key}
              value={char.value}
              className={className.join(' ')}
            />
          })}
        </p>
        {/*<p>
          {this.chars.map((char, key) => {
            return <span key={key}>{char.typed === ' ' ? '_' : char.typed}</span>
          })}
        </p>*/}
      </div>
    )
  }
}

export default Typing
