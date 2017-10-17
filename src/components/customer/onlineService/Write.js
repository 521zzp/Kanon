import React, { Component } from 'react';
import styles from './Write.css';
import { Input, Button } from 'antd';
const { TextArea } = Input;

class Write extends Component {
  
  constructor (props) {
   		super(props)
	    this.state = { 
	    	text: '',
	    }
	}
  
  textChange = (e) => {
  	this.setState({
  		text: e.target.value
  	})
  }
  
  send = () => {
  	console.log('text:')
  	console.log(this.state.text.trim())
  	if (this.state.text.trim() !== '') {
  		this.props.send(this.state.text)
	  	this.setState({
	  		text: ''
	  	})
  	}
  }
  
  enterSend = (e) => {
  	e.preventDefault()
  	this.send()
  }
  
  
  render () {
  	
  	return (
	    <div className={styles.normal}>
	    	<TextArea value={ this.state.text } className={ styles.text } 
	    			autosize={{ minRows: 5, maxRows: 5 }}
	    			onPressEnter={ this.enterSend }
	    			onChange={ this.textChange } />
	    	<Button size="large" onClick={ this.send } className={ styles.send } type="primary">发送</Button>
	    </div>
	  );
  }
}

export default Write;
