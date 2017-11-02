import React from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Checkbox, } from 'antd';
import styles from './Power.css';


const CheckboxGroup = Checkbox.Group;

function Power({
	power,
	dispatch,
}) {
	
	
	const totalChecked = (children) => {
		console.log('======================')
		const checked = children.filter(
			item => item.own
		)
		return checked.length === children.length
	}
	
	const singleCheck = (e, groupId, singleId) => {
		console.log(e.target.checked)
		console.log('sssss')
		console.log(groupId)
		console.log(singleId)
		dispatch({
			type: 'admins/singleCheck',
			payload: { own: e.target.checked, groupId, singleId  }
		})
	}
	
	const groupCheck = (e, groupId) => {
		console.log('群组选择：' + e.target.checked)
		dispatch({
			type: 'admins/groupCheck',
			payload: { own: e.target.checked, groupId }
		})
	}
	
	const powers = power.map(
		(item, index) => <Col lg={ 6 } md={ 12 } sm={ 12 } key={''+index} style={{marginBottom: '10px'}}> 
				    		<Card title={item.name} bordered={false} style={{minHeight: '200px'}}
				    			extra={ <Checkbox onChange={ (e)=>groupCheck(e, item.id) }
				    			checked={ totalChecked(item.children) } >全选</Checkbox> } >
				    			{
				    				item.children.map(
					    				(innerItem, innerIndex) => 
					    				<Checkbox checked={innerItem.own} 
					    					onChange={ (e)=>singleCheck(e, item.id, innerItem.id) }
					    					key={''+index+innerIndex} >{innerItem.name}</Checkbox>
					    			)
				    			}
				    			
				    		</Card>
				    	</Col>
	)
	
	
	
	
  return (
    <div className={styles.normal}>
	    <Row gutter={ 16 }>
	    	{powers}
	    </Row>
    </div>
  );
}

function mapStateToProps(state) {
  const { power } = state.admins 
  return {
  	power
  };
}

export default connect(mapStateToProps)(Power);
