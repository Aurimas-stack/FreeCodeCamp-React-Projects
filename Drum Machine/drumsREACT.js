const pads = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];
const normalPad = {
  width:100,
  height:80,
  backgroundColor: '#808080',
  position:'relative',
  float:'left',
  marginRight:10,
  marginTop:5,
  marginBottom:5,
  boxShadow: '0px 3px 0px 3px rgba(0,0,0,0.86)',
  borderRadius:10,
  textAlign:'center',
  paddingTop:20,
  fontSize:'2rem',
  fontWeight:'bold',
  color:'#fff'
}
const activePad = {
  backgroundColor: '#676767',
  color: '#000',
  boxShadow: '0px 2px 0px 1px rgba(0,0,0,0.86)'
}
class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: normalPad
    }
    this.handlePlayAudio = this.handlePlayAudio.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleStyles = this.handleStyles.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress = (e) => {
    if(e.keyCode == this.props.keyCode) {
      this.handlePlayAudio()
    }
  }
  handleStyles() {
    if(this.state.style.backgroundColor ==='#676767') {
      this.setState({
        style: normalPad
      })
    }else {
      this.setState({
        style: activePad
      })
    }
  }
  handlePlayAudio() {
    const audio = document.getElementById(this.props.keyTrigger);
    audio.play();
    this.handleStyles();
    setTimeout(() => this.handleStyles(), 150);
    this.props.text(this.props.id);
}
  render() {
    return (
      <div id={this.props.id} className='drum-pad' onClick={this.handlePlayAudio} onKeyPress={this.handleKeyPress} style={this.state.style}>
        <audio id={this.props.keyTrigger} className='clip' src={this.props.url}>
        </audio>
        {this.props.keyTrigger}
      </div>
    )
  }
}
class Machine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      sliderValue: 0.2
    }
    this.changeVolume = this.changeVolume.bind(this);
  }
  setText = (id) => {
    this.setState(() => ({
      text: id
    }))
  }
  changeVolume = (event) => {
    this.setState({
      sliderValue: event.target.value,
      text: 'Sound Volume:' + Math.round(event.target.value * 100)
    })
  }

  render() {
    const sounds = [].slice.call(document.getElementsByClassName('clip'));
      sounds.forEach(sound => {
        sound.volume = this.state.sliderValue;
      });
    return (
      <div className='container flex-container' id="drum-machine">
        <div className='fcc-logo flex-container'><p>DRUM MACHINE for FCC</p><i className="fab fa-free-code-camp fa-2x"></i></div>
        <div className='touch-controls flex-container'>
          <div className='pads'>
            {pads.map(pad => (
            <DrumPad key={pad.keyTrigger} text={this.setText} {...pad} />
          ))}
          </div>
          <div className='controls'>
            <p id='display'>{this.state.text}</p>
            <input className='volume'
              min='0'
              max='1'
              type='range'
              step='0.01'
              onChange={this.changeVolume}
              value={this.state.sliderValue}
              />
            <p className='me'>By Aurimas-stack</p>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Machine />, document.getElementById('app'))
