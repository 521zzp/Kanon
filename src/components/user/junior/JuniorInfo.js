import React from 'react';
import { Card, Col, Row, } from 'antd';
import styles from './JuniorInfo.css';
import CountUp from 'react-countup';

const gridStyle = {
  width: '100%',
};

function JuniorInfo({
	junior
}) {
  return (
    <div className={styles.normal}>
    	<Row>
    		<Col xl={8} lg={12} md={24} sm={24} xs={24}>
    			<Card.Grid style={gridStyle}>
		    		<span className={ styles.title }>所属层级:</span>
		    		<span className={ styles.value }>1代商户</span>
		    	</Card.Grid>
    		</Col>
    		<Col xl={8} lg={12} md={24} sm={24} xs={24}>
    			<Card.Grid style={gridStyle}>
			    	<span className={ styles.title }>用户级别:</span>
		    		<span className={ styles.value } style={{ color: 'orangered' }}>{ junior.level }</span>
			    </Card.Grid>
    		</Col>
    		<Col xl={8} lg={12} md={24} sm={24} xs={24}>
    			<Card.Grid style={gridStyle}>
			    	<span className={ styles.title }>账号:</span>
		    		<span className={ styles.value }>{ junior.account }</span>
			    </Card.Grid>
    		</Col>
    		<Col xl={8} lg={12} md={24} sm={24} xs={24}>
    			<Card.Grid style={gridStyle}>
			    	<span className={ styles.title }>真实姓名:</span>
		    		<span className={ styles.value }>{ junior.name }</span>
			    </Card.Grid>
    		</Col>
    		<Col xl={8} lg={12} md={24} sm={24} xs={24}>
    			<Card.Grid style={gridStyle}>
			    	<span className={ styles.title }>身份证号:</span>
		    		<span className={ styles.value }>{ junior.idCard }</span>
			    </Card.Grid>
    		</Col>
    		<Col xl={8} lg={12} md={24} sm={24} xs={24}>
    			<Card.Grid style={gridStyle}>
			    	<span className={ styles.title }>注册路径:</span>
		    		<span className={ styles.value }>{ junior.port }</span>
			    </Card.Grid>
    		</Col>
    		<Col xl={8} lg={12} md={24} sm={24} xs={24}>
    			<Card.Grid style={gridStyle}>
			    	<span className={ styles.title }>创建时间:</span>
		    		<span className={ styles.value }>{ junior.registerTime }</span>
			    </Card.Grid>
    		</Col>
    		<Col xl={8} lg={12} md={24} sm={24} xs={24}>
    			<Card.Grid style={gridStyle}>
			    	<span className={ styles.title }>理财金额:</span>
		    		<span className={ styles.value } style={{ color: 'orangered' }}>
		    			<CountUp
			            start={0}
			            end={ junior.financing ? junior.financing : 0 }
			            duration={2}
			            useEasing
			            useGrouping
			            separator=","
			        />
		        </span>
			    </Card.Grid>
    		</Col>
    		<Col xl={8} lg={12} md={24} sm={24} xs={24}>
    			<Card.Grid style={gridStyle}>
			    	<span className={ styles.title }>对上级奖金:</span>
		    		<span className={ styles.value } style={{ color: 'orangered' }}>
		    			<CountUp
			            start={0}
			            end={ junior.offerReward ? junior.offerReward : 0 }
			            duration={2}
			            useEasing
			            useGrouping
			            separator=","
			        />
		    		</span>
			    </Card.Grid>
    		</Col>
    		<Col xl={8} lg={12} md={24} sm={24} xs={24}>
    			<Card.Grid style={gridStyle}>
			    	<span className={ styles.title }>获取奖金:</span>
		    		<span className={ styles.value } style={{ color: 'orangered' }}>
		    			<CountUp
			            start={0}
			            end={ junior.getReward ? junior.getReward : 0 }
			            duration={2}
			            useEasing
			            useGrouping
			            separator=","
			        />
		    		</span>
			    </Card.Grid>
    		</Col>
    	</Row>
    
    
    	
	    
	    
	    
	    
	    
	    
	    
	    
	    
    
    </div>
  );
}

export default JuniorInfo;
