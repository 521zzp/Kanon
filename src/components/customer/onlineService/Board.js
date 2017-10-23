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
		if (this.props.scrollBehavior === 'bottom') {
			scrollbars.scrollToBottom()
		} else if (this.props.scrollBehavior === 'top') {
			scrollbars.scrollToTop()
		}
	}
	
	timeFormat = (time) => {
		const length = new Date().getTime() - time
		if (length <  60 * 1000 ) {
			return Math.ceil(length / (  1000 )) + '秒前'
		} else if (length < 1000 * 60 * 60 * 24 ) {
			return new Date(time).Format('HH:mm')
		} else {
			return new Date(time).Format('yyyy-MM-dd HH:mm')
		}
	}
	
  render () {
  	const content = this.props.records.map((item,index) => {
  		if (item.sender === 0) {
  			return <div className={styles.clerk} key={index}>
						<Avatar className={ styles.face } icon="customer-service" />
						<div className={ styles['content-wrap'] }>
							<span className={ styles.content }>{item.content}</span>
							<span className={ styles.time }>{ this.timeFormat(item.time) }</span>
						</div>
					</div>
  		} else {
  			return <div className={styles.customer} key={index}>
		    			<Avatar className={ styles.face } src={item.userFace}
			    			>{item.userNickName[0]}</Avatar>
		    			<div className={ styles['content-wrap'] }>
		    				<span className={ styles.content }>{item.content}</span>
								<span className={ styles.time }>{ this.timeFormat(item.time) }</span>
		    			</div>
		    		</div>
  		}
  	})
  	
  	console.log('长度：')
  	console.log(content.length)
  	
  	return (
	    <div className={styles.normal}>
				<Scrollbars style={{ width: '100%', height: 'calc(100vh - 294px)', paddingRight: '30px' }}
					autoHide
					ref="scrollbars"
					start="bottom"
				>
				{
					this.props.more && <div className={ styles['more-wrap'] }>
						<span className={ styles.more } onClick={ this.props.getHistoryRecords }>加载更多</span>
					</div>
				}
		        {content}
	    		
				 </Scrollbars>   
	    </div>
	  );
  }
}
export default Board;
