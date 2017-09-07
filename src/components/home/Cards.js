import React from 'react';
import styles from './Cards.css';
import { Card, Icon, Row, Col } from 'antd';
import CountUp from 'react-countup'

function Cards({ cards }) {
	
	const { income, outcome, register, cost } = cards
	
  return (
    <div className={styles.normal}>
    	<Row gutter={20}>
    		<Col lg={ 6 } md={ 12 } sm={ 12 }>
    			<Card className={styles.item} bordered={false}>
		      	<Icon type="pay-circle-o" className={ styles['icon-money-in'] } />
		      	<div className={ styles.info }>
		      		<span className={ styles.title }>今日入金</span>
		      		<span className={ styles.value }>
		      			<CountUp
			            start={0}
			            end={ income }
			            duration={2.75}
			            useEasing
			            useGrouping
			            separator=","
			          />
		      		元</span>
		      	</div>
				  </Card>
    		</Col>
    		<Col lg={ 6 } md={ 12 } sm={ 12 }>
    			<Card className={styles.item} bordered={false}>
				    <Icon type="export" className={ styles['icon-money-out'] } />
		      	<div className={ styles.info }>
		      		<span className={ styles.title }>今日出金</span>
		      		<span className={ styles.value }>
		      			<CountUp
			            start={0}
			            end={ outcome }
			            duration={2.75}
			            useEasing
			            useGrouping
			            separator=","
			          />元
			        </span>
		      	</div>
				  </Card>
    		
    		</Col>
    		<Col lg={ 6 } md={ 12 } sm={ 12 }>
    			<Card className={styles.item} bordered={false}>
				    <Icon type="team" className={ styles['icon-users'] } />
		      	<div className={ styles.info }>
		      		<span className={ styles.title }>新增用户</span>
		      		<span className={ styles.value }>
		      			<CountUp
			            start={0}
			            end={ register }
			            duration={2.75}
			            useEasing
			            useGrouping
			            separator=","
			          />人
			        </span>
		      	</div>
				  </Card>
    		
    		</Col>
    		<Col lg={ 6 } md={ 12 } sm={ 12 }>
    			<Card className={styles.item} bordered={false}>
				    <Icon type="trophy" className={ styles['icon-cost'] } />
		      	<div className={ styles.info }>
		      		<span className={ styles.title }>运营成本</span>
		      		<span className={ styles.value }>
		      			<CountUp
			            start={0}
			            end={ cost }
			            duration={2.75}
			            useEasing
			            useGrouping
			            separator=","
			          />元
		      		</span>
		      	</div>
				  </Card>
    		</Col>
    	</Row>
		  
		  
    </div>
  );
}

Cards.propTypes = {
  cards: React.PropTypes.object.isRequired,
};

export default Cards;
