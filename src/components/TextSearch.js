import React, { Component } from "react"
import PropTypes from "prop-types"

class TextSearch extends Component {
  static propTypes = {
    node: PropTypes.any,
    caseSensitive: PropTypes.bool
  }

  static defaultProps = {
    node: document.body,
    caseSensitive: false
  }

  constructor(props) {
    super(props)

    this.value = null
    this.highlighted = []
    this.handleChange = this.handleChange.bind(this)
  }

  clear() {
    while(this.highlighted.length > 0) {
      let node = this.highlighted.pop()
      let tmpNode = node.tmpNodes[0]
      tmpNode.parentNode.insertBefore(node.original, tmpNode)
      node.tmpNodes.forEach(node => node.remove())
    }
  }

  search(node) {
    let childNodes = node.childNodes || []
    let found = []

    childNodes.forEach((node) => {
      let nodeName = node.nodeName.toUpperCase()

      if (['BUTTON', 'TEXTAREA'].indexOf(nodeName) === -1) {
        if (nodeName === '#TEXT') {
          if (node.data.toLowerCase().indexOf(this.value.toLowerCase()) >= 0) {
            found.push(node)
          }
        } else {
          found = found.concat(this.search(node))
        }
      }
    })

    return found
  }

  highlight(nodes) {
    let options = this.props.caseSensitive ? 'i' : ''
    let re = new RegExp(this.value, options)

    nodes.forEach(node => {
      let parts = node.data.split(re)
      let tmpNodes = []
      let pos = 0

      parts.forEach((part, index) => {
        if (index > 0) {
          let span = document.createElement('span')
          span.innerHTML = node.data.substr(pos, this.value.length)
          span.classList.add('highlight')
          node.parentNode.insertBefore(span, node)
          tmpNodes.push(span)
          pos += this.value.length
        }

        let textNode = document.createTextNode(part)
        node.parentNode.insertBefore(textNode, node)
        tmpNodes.push(textNode)
        pos += part.length
      })

      this.highlighted.push({
        original: node.cloneNode(),
        parentNode: node.parentNode,
        tmpNodes
      })

      node.remove()
    })
  }

  handleChange(e) {
    if (e.target.value !== this.value) {
      this.value = e.target.value
      this.clear()

      if (this.value) {
        let nodes = this.search(this.props.node)
        this.highlight(nodes)
      }
    }
  }

  render() {
    return (
      <input
        type="text"
        placeholder="Seach"
        onChange={this.handleChange}
      />
    )
  }
}

export default TextSearch
