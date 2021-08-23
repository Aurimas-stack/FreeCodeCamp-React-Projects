let person = [{
  name: "I love mankind ... it's people I can't stand!!"
}, {
  name: "Never love anyone who treats you like you're ordinary."
}, {
  name: "When someone shows you who they are believe them the first time."
}, {
  name: "I do not want people to be very agreeable, as it saves me the trouble of liking them a great deal."
}, {
  name: "The most beautiful people we have known are those who have known defeat, known suffering, known struggle, known loss, and have found their way out of the depths. These persons have an appreciation, a sensitivity, and an understanding of life that fills them with compassion, gentleness, and a deep loving concern. Beautiful people do not just happen."
}, {
  name: "Don't waste your time with explanations: people only hear what they want to hear."
}, {
  name: 'The world is a dangerous place to live, not because of the people who are evil, but because of the people who dont do anything about it.'
}];
let person1 = [{
  qoute: 'Charles M. Schulz'},{
  qoute: 'Oscar Wilde'},{
  qoute: 'Maya Angelou'},{
  qoute: 'Jane Austen, Jane Austens Letters'},{
  qoute: 'Elisabeth Kübler-Ross'},{
  qoute: 'Paulo Coelho'}, {
  qoute: ' Albert Einstein'
  }
    
              ]
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#FFD712',
      activeIndex: 0,
      qouteIndex: 0,
    }
    this.changeColor = this.changeColor.bind(this);
    this.changeQoute = this.changeQoute.bind(this);
    this.changePerson = this.changePerson.bind(this);
  }
  changeColor() {
    let letters = '0123456789ABCDEF';
	  let colory = '#';
	  for (let i = 0; i < 6; i++ ) {
		  colory += letters[Math.floor(Math.random() * 16)];
	  }
	  this.setState({color: colory});
  }
  changeQoute = () => {
     let qouteIndex = this.state.qouteIndex;
    if (qouteIndex == this.props.person1.length -1){
      qouteIndex = 0;
      } else {
        qouteIndex++;
        }
    this.setState({
      qouteIndex
    });
  }
  changePerson = () => {
     let activeIndex = this.state.activeIndex;
    if (activeIndex == this.props.person.length -1){
      activeIndex = 0;
      } else {
        activeIndex++;
        }
    this.setState({
      activeIndex
    });
  }
 componentDidUpdate(prevProps, prevState){
  const { color } = this.state;

  if(prevProps.bgColor !== color){
      const bodyElt = document.querySelector("body");
      bodyElt.style.backgroundColor = color;
    }
}
  render() {
    return (
        <div className='qoute-box flex-container'>
          <p id='text'className='main-qoute'><i class="fa fa-quote-left" style={{color: this.state.color}}></i>{this.props.person[this.state.activeIndex].name}</p>
          <p id='author' className='qoute-author'><span>-</span>{this.props.person1[this.state.activeIndex].qoute} </p>
          <div className='i-b-row flex-container'>
            <div className='icons flex-container'>
              <a id='tweet-quote' target="_blank" href={`https://twitter.com/intent/tweet?text='${this.props.person[this.state.activeIndex].name}'-'${this.props.person1[this.state.activeIndex].qoute}'`}><i className="fab fa-twitter-square fa-3x" style={{color: this.state.color}}></i></a>
            </div>
          <button id='new-quote' className='new-qoute' onClick={() => {this.changeColor(); this.changePerson()}}  style={{background: this.state.color}}>New Quote</button>
          </div>
        </div>
    )
  }
}
ReactDOM.render(<App person = {person} person1 = {person1}/>, document.getElementById('quote-box'));
