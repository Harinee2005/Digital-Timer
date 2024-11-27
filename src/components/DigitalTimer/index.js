import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {timeInput: 25, remTime: 25 * 60, isRunning: false}

  onPlayPause = () => {
    this.setState(
      prevState => ({isRunning: !prevState.isRunning}),
      () => {
        const {isRunning} = this.state
        if (isRunning) {
          this.timerId = setInterval(this.tick, 1000)
        } else {
          clearInterval(this.timerId)
        }
      },
    )
  }

  onReset = () => {
    this.setState({timeInput: 25, remTime: 25 * 60, isRunning: false})
    clearInterval(this.timerId)
  }

  onIncrement = () => {
    const {isRunning} = this.state
    if (!isRunning) {
      this.setState(prevState => ({
        timeInput: prevState.timeInput + 1,
        remTime: (prevState.timeInput + 1) * 60,
      }))
    }
  }

  onDecrement = () => {
    const {isRunning, timeInput} = this.state
    if (!isRunning && timeInput > 1) {
      this.setState(prevState => ({
        timeInput: prevState.timeInput - 1,
        remTime: (prevState.timeInput - 1) * 60,
      }))
    }
  }

  formatTime = () => {
    const {remTime} = this.state
    const minutes = Math.floor(remTime / 60)
    const seconds = remTime % 60
    const formattedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const formattedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${formattedMinutes}:${formattedSeconds}`
  }

  tick = () => {
    this.setState(prevState => ({
      remTime: prevState.remTime - 1,
    }))
  }

  render() {
    const {timeInput, isRunning} = this.state
    const formattedTime = this.formatTime()
    return (
      <div className="background-color">
        <h1 className="title">Digital Timer</h1>
        <div className="whole-bg">
          <div className="background-timer">
            <div className="white-timer-bg">
              <h1 className="time-name">{formattedTime}</h1>
              <p className="time-details">{isRunning ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="timings">
            <div className="timer-container">
              <button
                onClick={this.onPlayPause}
                type="button"
                className="timer-control-button start-reset"
              >
                <img
                  src={
                    !isRunning
                      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png '
                  }
                  alt={!isRunning ? 'play icon' : 'pause icon'}
                  className="icon"
                />
                <span className="button time-details">
                  {!isRunning ? 'Start' : 'Pause'}
                </span>
              </button>

              <button
                onClick={this.onReset}
                type="button"
                className="timer-control-button start-reset"
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="icon"
                />
                <span>
                  {' '}
                  <p className="time-details">Reset</p>
                </span>
              </button>
            </div>
            <p className="description">Set Timer Limit</p>
            <div className="start-reset">
              <button
                onClick={this.onDecrement}
                type="button"
                className="timer-control-button"
              >
                -
              </button>
              <p className="time-limit">{timeInput}</p>
              <button
                onClick={this.onIncrement}
                type="button"
                className="timer-control-button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
