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
	
	const chattingSwitch = (id) => {
		dispatch({
			type: 'onlineService/chattingSwitch',
			payload: { id }
		});
	}
	
	
  return (
    <div className={styles.normal}>
    	{ status !== 1 && <Connection status={ status } connect={ connect } /> }
    	{ status === 1 && <Service records={ records } send={ send } chats={ chats } chattingSwitch= { chattingSwitch }/> }
    </div>
  );
}

function mapStateToProps(state) {
	const { status, records, chats } = state.onlineService
	
	return {
		status,
		records,
		chats,
	};
}

export default connect(mapStateToProps)(OnlineServicee);
