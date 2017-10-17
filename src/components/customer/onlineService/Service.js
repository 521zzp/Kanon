import React from 'react';
import styles from './Service.css';
import { Row, Col, Card } from 'antd';
import Board from './Board';
import Customers from './Customers';
import Write from './Write';

function Service({
	send,
	records,
}) {
	

	
  return (
    <div className={styles.normal}>
    	<Row gutter={20}>
	      <Col span={20} >
	      	<Card bordered={false}>
	        	<Board records={ records }/>
	        </Card>
	  	    <Card bordered={false} className={ styles.write }>
	        	<Write send={ send }/>
	        </Card>
	      </Col>
	      <Col  span={4}>
	        <Card bordered={false}>
	        	<Customers/>
	        </Card>
	      </Col>
	    </Row>
    
  		
  		
    </div>
  );
}

export default Service;
