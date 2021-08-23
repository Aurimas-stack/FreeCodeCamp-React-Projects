class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer : null,
      breakLength: 5,
      sessionLength: 25,
      minutes:25,
      seconds: 1500,
      active: false,
      sessionName: "Session"
    }
    this.handleSessionIncrement = this.handleSessionIncrement.bind(this);
    this.handleSessionDecrement = this.handleSessionDecrement.bind(this);
    this.handleBreakIncrement = this.handleBreakIncrement.bind(this);
    this.handleBreakDecrement = this.handleBreakDecrement.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleBreak = this.handleBreak.bind(this);
  }
  handleStart = () => {
    this.setState({active: true})
    this.state.timer = setInterval(() => {
      this.setState(prevState => { 
        if(this.state.sessionName == 'break' && prevState.seconds === 0) {
            this.handleReset();
          }
        if(prevState.seconds === 0 && this.state.sessionName == 'Session') {
          this.refs.alarm.play();
          this.handleBreak();
          return {
            seconds: prevState.seconds - 1,
            sessionName: 'break'
          }
        } else {
        return {
          seconds: prevState.seconds - 1
        }
      }
       })
    }, 1000);
  }
  handleBreak = () => {
    let breakTime = this.state.breakLength * 60;
    this.setState({
      seconds: breakTime
    })
  }
  handlePause = () => {
    clearInterval(this.state.timer)
    this.setState({
      active: false,
    })
  }
  handleSessionIncrement(){
    let newSessionLength = this.state.sessionLength + 1;
    let newTime = newSessionLength * 60;
    if(newSessionLength < 61 && !this.state.active) {
      this.setState({
      seconds: newTime,
      sessionLength: newSessionLength
    })
    }
  }
   handleSessionDecrement() {
    let newSessionLength = this.state.sessionLength - 1;
    let newTime = newSessionLength * 60;
    if(newSessionLength > 0 && !this.state.active) {
      this.setState({
      seconds: newTime,
      sessionLength: newSessionLength
    })
    }
  }
  handleBreakIncrement() {
    let newBreakLength = this.state.breakLength + 1;
    let newTime = newBreakLength * 60
    if(this.state.breakLength < 60 && !this.state.active && this.state.sessionName == 'Session') {
      this.setState({
        breakLength: this.state.breakLength + 1
      })
    }
    if(newBreakLength < 61 && !this.state.active && this.state.sessionName == 'break') {
      this.setState({
        seconds: newTime,
        breakLength: newBreakLength
      })
    }
  }
  handleBreakDecrement() {
    let newBreakLength = this.state.breakLength - 1;
    let newTime = newBreakLength * 60
    if(this.state.breakLength > 1 && !this.state.active && this.state.sessionName == 'Session') {
      this.setState({
        breakLength: this.state.breakLength - 1
      })
    }
    if(newBreakLength > 0 && !this.state.active && this.state.sessionName == 'break') {
      this.setState({
        seconds: newTime,
        breakLength: newBreakLength
      })
    }
  }
  handleReset() {
    clearInterval(this.state.timer)
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      minutes:25,
      timer: null,
      seconds: 1500,
      active: false,
      sessionName: 'Session'
    })
    this.refs.alarm.pause();
    this.refs.alarm.currentTime = 0;
  }
   
 render() {
    let seconds = String(Math.floor(this.state.seconds % 60));
    let minutes = String(Math.floor(this.state.seconds / 60));
    
    if(seconds.length === 1) {
       seconds = '0' + seconds;
    }
   if(minutes.length === 1) {
     minutes = '0' + minutes;
   }
   const timerActive = this.state.active ? <i className="far fa-pause-circle fa-2x" id='start_stop' onClick={this.handlePause}></i> : <i className="fas fa-play fa-2x" id='start_stop' onClick={this.handleStart}></i>
    
    return (
      <div className='container flex-container'>
        <h1><i class="far fa-clock fa-2x"></i> 25 + 5</h1>
        <div className='length-controls flex-container'>
          <div className='length-control flex-container'>
            <h2 id='break-label'>Break Length</h2>
            <div className='break-label-controls flex-container'>
              <i className="fas fa-arrow-circle-up fa-2x" id='break-increment' onClick={this.handleBreakIncrement}></i>
              <div id='break-length'>{this.state.breakLength}</div>
              <i className="fas fa-arrow-circle-down fa-2x" id='break-decrement' onClick={this.handleBreakDecrement}></i>
            </div>
          </div>
          <div className='length-control flex-container'>
            <h2 id='session-label'>Session Length</h2>
            <div className='break-label-controls flex-container'>
              <i className="fas fa-arrow-circle-up fa-2x" id='session-increment' onClick={this.handleSessionIncrement}></i>
              <div id='session-length'>{this.state.sessionLength}</div>
              <i className="fas fa-arrow-circle-down fa-2x" id='session-decrement' onClick={this.handleSessionDecrement}></i>
            </div>
          </div>
        </div>
        <div className='clock flex-container'>
          <h3 id='timer-label'>{this.state.sessionName} length:</h3>
          <div className='clock-screen' id='time-left'>{minutes}:{seconds}</div>
          <h4>Made by Aurimas-stack</h4>
        </div>
        <div className='clock-controls flex-container'>
          {timerActive}
          <i className="fas fa-redo fa-2x" id='reset' onClick={this.handleReset}></i>
          <audio
            id="beep"
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            preload="auto"
            ref="alarm"
          />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Clock />, document.getElementById('app'));
