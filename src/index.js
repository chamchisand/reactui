import React, { Component } from "react"
import { render } from "react-dom"
import Typing from "components/Typing"
import "less/index.less"

const paragraph = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
// let paragraph1 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do`

class App extends Component {
  render() {
    return (
      <div>
        <h1>=/ Typing</h1>
        <Typing paragraph={paragraph}/>
      </div>
    )
  }
}

render(<App/>, document.getElementById("root"))
