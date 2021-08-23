const operatorRegex = /[-+*/]/;
const isNumber = /^-?\d+$/;

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '0',
      output:''
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleSum = this.handleSum.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
  }
  handleOperator = (event) =>{
    let currentState = this.state.output;
    
    if(operatorRegex.test(currentState[currentState.length - 1]) == true || currentState[currentState.length - 1] == '.') {
      if(currentState[currentState.length - 1] !== '-' && event.target.value !== '-') {
        currentState = currentState.slice(0, currentState.length - 1)
      }
      if(currentState[currentState.length - 1] !== '-' && event.target.value == '-') {
        currentState = this.state.output 
      }
      if(currentState[currentState.length - 1] == '-' && currentState[currentState.length - 2] !== '-') {
        currentState = currentState.slice(0, currentState.length - 2)
      }
      if(currentState[currentState.length - 3] == '-' && currentState[currentState.length - 2] == '-' && currentState[currentState.length - 1] == '-' && event.target.value == '-') {
        currentState = currentState.slice(0, currentState.length - 3)
      }
    } 

    this.setState({
      output: currentState + event.target.value,
      input: event.target.value
      })
    }
  
  handleClick = (e) => {
    if(e.target.value === '0') {
        if(this.state.output.length == 0 && !this.state.output.includes('0')){
           this.setState({
              output: this.state.output + e.target.value,
              input: e.target.value
           })
         }
        if(this.state.output.length == 1 && operatorRegex.test(this.state.input)) {
          this.setState({
            output: e.target.value,
            input: e.target.value
          })
        }
       if(this.state.output.length >= 1) {
           if(isNumber.test(this.state.input) && this.state.input.charAt(0) !== '0') {
             this.setState({
               output: this.state.output + e.target.value,
               input: this.state.input + e.target.value
             })
           }
          if(isNumber.test(this.state.input.charAt(0)) && this.state.input.charAt(1) == '.') {
            this.setState({
              output: this.state.output + e.target.value,
              input: this.state.input + e.target.value
              })
            }
         if(isNumber.test(this.state.input.charAt(1)) && this.state.input.charAt(2) == '.'&& e.target.value == '0') {
            this.setState({
              output: this.state.output + e.target.value,
              input: this.state.input + e.target.value
            })
          }
         if(isNumber.test(this.state.input.charAt(1)) && operatorRegex.test(this.state.input.charAt(0)) && e.target.value == '0') {
            this.setState({
              output: this.state.output + e.target.value,
              input: this.state.input + e.target.value
            })
          }
          if(operatorRegex.test(this.state.output.slice(-1))) {
            this.setState({
              output: this.state.output + e.target.value,
              input: e.target.value
            })
          }
         
         }     
      }
    
    if(e.target.value !== '0' && !this.state.input.includes('.')) {
      this.setState({
        output: this.state.output + e.target.value,
        input: this.state.input + e.target.value
        })
      }
    if(this.state.input.includes('.') && e.target.value !== '0' ) {
      this.setState({
        output: this.state.output + e.target.value,
        input: this.state.input + e.target.value
      })
     }
    if(e.target.value !== '0' && this.state.input.charAt(0) == '0' && this.state.input.length - 1 !== '.') {
      this.setState({
        output: e.target.value,
        input: e.target.value
      })
    }
    if(this.state.input.charAt(0) && this.state.input.charAt(1) == '.'&& e.target.value !== '0') {
      this.setState({
        output: this.state.output + e.target.value,
        input: this.state.input + e.target.value
      })
    }
    if(isNumber.test(this.state.input.charAt(0)) && this.state.input.charAt(1) == '.'&& e.target.value !== '0') {
      this.setState({
        output: this.state.output + e.target.value,
        input: this.state.input + e.target.value
      })
    }
    
    }
    
  handleClear() {
    this.setState({
      output: '',
      input:'0'
    })
  }
  handleDecimal = (decimal) =>{
    if(this.state.output.length < 0 || operatorRegex.test(this.state.input)) {
      this.setState({
        output: this.state.output,
        input: this.state.input
      })
    }
    if(this.state.output.length >= 1) {
      if(!this.state.input.includes('.') && !operatorRegex.test(this.state.output.slice(-1))) {
        this.setState({
          output: this.state.output + decimal.target.value,
          input: this.state.input + decimal.target.value
        })
      }
    }
    
  }
  handleSum() {
    let currentStateValue = this.state.output;
    if(operatorRegex.test(currentStateValue[currentStateValue.length - 1])) {
      currentStateValue = currentStateValue.slice(0, currentStateValue.length - 1)
    }
    let calculation = eval(currentStateValue);
    
    this.setState({
      output: calculation.toString(),
      input: calculation.toString()
    })
  }
  
  
  render() {
    return (
      <div className='container flex-container'>
        <div className='calculator flex-container'>
          <h3>React Calculator</h3>
          <div className='display-screen'>{this.state.output}</div>
          <div className='calculation-screen' id='display'>{this.state.input}</div>        
          <div className='buttons'>
            <button id='clear'onClick={this.handleClear}>AC</button>
            <button id='divide' value='/' onClick={this.handleOperator}>/</button>
            <button id='multiply' value='*' onClick={this.handleOperator}>X</button>
            <button id='seven' value='7' onClick={this.handleClick}>7</button>
            <button id='eight' value='8' onClick={this.handleClick}>8</button>
            <button id='nine' value='9' onClick={this.handleClick}>9</button>
            <button id='subtract' value='-' onClick={this.handleOperator}>-</button>
            <button id='four' value='4' onClick={this.handleClick}>4</button>
            <button id='five' value='5' onClick={this.handleClick}>5</button>
            <button id='six' value='6' onClick={this.handleClick}>6</button>
            <button id='add' value='+' onClick={this.handleOperator}>+</button>
            <button id='one' value='1' onClick={this.handleClick}>1</button>
            <button id='two' value='2' onClick={this.handleClick}>2</button>
            <button id='three' value='3' onClick={this.handleClick}>3</button>
            <button id='zero' value='0' onClick={this.handleClick}>0</button>
            <button id='decimal' value='.' onClick={this.handleDecimal}>.</button>
            <button id="equals" value='=' onClick={this.handleSum}>=</button>
          </div>
        </div>
        <div className='design-by flex-container'>
          <p>Designed and Coded By </p>
          <p>Aurimas-stack Z.</p>
        </div>  
      </div>
    )
  }
}

ReactDOM.render(<Calculator />, document.getElementById('app'));
