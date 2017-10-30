import React from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Checkbox, } from 'antd';
import styles from './Power.css';


const CheckboxGroup = Checkbox.Group;

function Power() {
	
	const options = [
	  { label: 'Apple', value: 'Apple' },
	  { label: 'Pear', value: 'Pear' },
	  { label: 'Orange', value: 'Orange' },
	];
	
	
  return (
    <div className={styles.normal}>
	    <Row gutter={ 16 }>
	    	<Col lg={ 6 } md={ 12 } sm={ 12 }>
	    		<Card title="护手霜" bordered={false} extra={ <Checkbox indeterminate={false} checked={true} >全选</Checkbox> } >
	    			<Checkbox >用户列表</Checkbox>
	    			<Checkbox >用户记录</Checkbox>
	    			<Checkbox >会员列表</Checkbox>
	    		</Card>
	    	</Col>
	    	<Col lg={ 6 } md={ 12 } sm={ 12 }>
	    		<Card bordered={false}>
	    		
	    		</Card>
	    	</Col>
	    	<Col lg={ 6 } md={ 12 } sm={ 12 }>
	    		<Card bordered={false}>
	    		
	    		</Card>
	    	</Col>
	    	<Col lg={ 6 } md={ 12 } sm={ 12 }>
	    		<Card bordered={false}>
	    			
	    		</Card>
	    	</Col>
	    	
	    </Row>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Power);
