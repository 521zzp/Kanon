import React from 'react';
import styles from './Service.css';
import { Row, Col, Card } from 'antd';
import Board from './Board';
import Customers from './Customers';
import Write from './Write';

function Service({
	send,
	records,
	chats,
	chattingSwitch,
	getHistoryRecords,
	scrollBehavior,
}) {
	
  const chat = chats.filter(
  	item =>  item.chatting
  )
	
  return (
    <div className={styles.normal}>
    	<Row gutter={20}>
	      <Col span={19} >
	      	<Card bordered={false}>
	        	<Board  
	        		getHistoryRecords={ getHistoryRecords } 
	        		scrollBehavior={ scrollBehavior }
	        		records={ chat[0] ? chat[0].records : [] } more={ chat[0] ? chat[0].more : false }/>
	        </Card>
	  	    <Card bordered={false} className={ styles.write }>
	        	<Write send={ send }/>
	        </Card>
	      </Col>
	      <Col  span={5}>
	        <Card bordered={false}>
	        	<Customers chats = { chats } chattingSwitch={ chattingSwitch }/>
	        </Card>
	      </Col>
	    </Row>
    </div>
  );
}

export default Service;
