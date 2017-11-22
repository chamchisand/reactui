import React, { Component } from "react"
import { render} from "react-dom"
import Modal from "./components/Modal"
import Alert from "./components/Alert"
import "./index.less"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      alert: false
    }
  }

  render() {
    return (
      <div>
        <h1>=/</h1>
        <div>
          <button onClick={() => this.setState({modal: true})}>Modal</button>
          <button onClick={() => this.setState({alert: true})}>Alert</button>
        </div>
        {this.state.modal && (
          <Modal
            title={<div>This is Title<b>!</b></div>}
            close={true}
            handleClose={() => this.setState({modal: false})}
          >
            <h1>Large Text</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </Modal>
        )}
        {this.state.alert && (
          <Alert
            backdrop={true}
            title={<div>This is Title<b>!</b></div>}
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            handleClick={(isConfirmed) => {
              console.log('isConfirmed', isConfirmed)
              this.setState({alert: false})
            }}
          />
        )}
			</div>
    )
  }
}

render(<App/>, document.getElementById("root"))
