import React, { Component } from 'react';
import styles from './Board.css';
import { Avatar } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';

class Board extends Component{
	
	constructor(props) {
    super(props);
	}
	
/*	componentDidMount() {
		console.log('滑到最底部')
		
	}*/
	
	
	componentDidUpdate () {
		console.log('组件更新')
		
		const { scrollbars } = this.refs;
		scrollbars.scrollToBottom()
	}
	
  render () {
  	const content = this.props.records.map((item,index) => {
  		if (item.sender === 0) {
  			return <div className={styles.clerk} key={index}>
									<Avatar className={ styles.face } icon="customer-service" />
									<div className={ styles['content-wrap'] }>
										<span className={ styles.content }>{item.content}</span>
										<span className={ styles.time }>{item.time}</span>
									</div>
								</div>
  		} else {
  			return <div className={styles.customer} key={index}>
				    			<Avatar className={ styles.face } src={item.userFace} />
				    			<div className={ styles['content-wrap'] }>
				    				<span className={ styles.content }>{item.content}</span>
										<span className={ styles.time }>{item.time}</span>
				    			</div>
				    		</div>
  		}
  	})
  	
  	
  	return (
	    <div className={styles.normal}>
				<Scrollbars style={{ width: '100%', height: 'calc(100vh - 294px)', paddingRight: '30px' }}
					autoHide
					ref="scrollbars"
					start="bottom"
				>
		        {content}
	    		
				 </Scrollbars>   
	    </div>
	  );
  }
}
export default Board;
