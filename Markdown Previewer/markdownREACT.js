const markDownPreview = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: markDownPreview,
      showEditors: true
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    })
  }
  
  render() {
    const {showEditors} = this.state
    return (
      <div className='container flex-container'>
        <div className='editor-area flex-container'>
          <div className='editor-name flex-container'>
            <div className='editor-name-text flex-container'>
              <i className="fab fa-free-code-camp fa-2x"></i>
              <p>Main Editor</p>
            </div>
              <i className="fas fa-expand-arrows-alt" onClick={() => this.setState({showEditors: !showEditors})}></i>
           </div>
          <textarea id='editor' type='text' cols='70'rows='4' value={this.state.input} onChange={this.handleChange} />
        </div>
        {showEditors &&
        <div className='preview-area flex-container'>
          <div className='previews-name flex-container'>
            <div className='previews-name-text flex-container'>
              <i className="fab fa-free-code-camp fa-2x"></i>
              <p>Main Previewer</p>
            </div>
            <i className="fas fa-expand-arrows-alt" onClick={() => this.setState({showEditors: !showEditors})}></i>
          </div>
          <div id='preview' dangerouslySetInnerHTML={{__html: marked(this.state.input, {breaks: true})}}></div>
        </div>}
      </div>
    ) 
}
}
ReactDOM.render(<Editor />, document.getElementById('app'))
