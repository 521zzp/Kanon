import React from 'react';
import { connect } from 'dva';
import Connection from '../../components/customer/onlineService/Connection'
import Service from '../../components/customer/onlineService/Service'
import styles from './OnlineService.css';


//客服服务页面
function OnlineServicee({
	dispatch,
	status,
	chats,
	records,
	scrollBehavior,
}) {
	
	const connect = () => {
		dispatch({
			type: 'onlineService/connect'
		});
	}
	
	const send = (text) => {
		dispatch({
			type: 'onlineService/send',
			payload: text
		});
	}
	
	const chattingSwitch = (userId) => {
		dispatch({
			type: 'onlineService/chattingSwitch',
			payload: { userId }
		});
	}
	
	const getHistoryRecords = () => {
		console.log('加载更多')
		dispatch({
			type: 'onlineService/getHistoryRecords',
		});
	}
	
	
  return (
    <div className={styles.normal}>
    	{ status !== 1 && <Connection status={ status } connect={ connect } /> }
    	{ status === 1 && 
    		<Service 
    			records={ records } 
    			send={ send } 
    			chats={ chats } 
    			chattingSwitch={ chattingSwitch }
    			getHistoryRecords={ getHistoryRecords }
    			scrollBehavior={ scrollBehavior }
    		/> }
    </div>
  );
}

function mapStateToProps(state) {
	const { status, records, chats, scrollBehavior } = state.onlineService
	
	return {
		status,
		records,
		chats,
		scrollBehavior,
	};
}

export default connect(mapStateToProps)(OnlineServicee);
