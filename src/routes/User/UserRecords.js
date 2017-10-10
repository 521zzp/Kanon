import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Table, Modal, Card, Row, Col   } from 'antd';
import CountUp from 'react-countup'
import styles from './UserRecords.css';

const FormItem = Form.Item;



function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

function UserRecords({
	dispatch,
	baseInfo,
	form: {
    getFieldDecorator,
    getFieldsError, getFieldError, validateFields
  }
}) {
	
	
	const gridStyle = {
	  width: '25%',
	  textAlign: 'center',
	};
	
	const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        dispatch({
					type: 'userRecords/update',
					payload: values
				})
        dispatch({
					type: 'userRecords/getCommonInfo'
				})
      }
    });
  }
	
	const columns = [
		{
		  title: '用户等级',
		  dataIndex: 'level',
		  key: 'level',
		},
		{
		  title: '账号',
		  dataIndex: 'account',
		  key: 'account',
		},
		{
		  title: '真实姓名',
		  dataIndex: 'name',
		  key: 'name',
		},
		{
		  title: '身份证号',
		  dataIndex: 'idCard',
		  key: 'idCard',
		},
		{
		  title: '注册途径',
		  dataIndex: 'port',
		  key: 'port',
		},
		{
		  title: '注册时间',
		  dataIndex: 'registerTime',
		  key: 'registerTime',
		},
		{
		  title: '可用余额',
		  dataIndex: 'balance',
		  key: 'balance',
		},
		{
		  title: '分润余额',
		  dataIndex: 'fenrun',
		  key: 'fenrun',
		},
		{
		  title: '冻结余额',
		  dataIndex: 'freeze',
		  key: 'freeze',
		}
	]
	
	const list =  baseInfo ? [baseInfo] : []
	
	
  return (
    <div className={styles.normal}>
	    <Card bordered={false}>
	    	<Form layout="inline" >
	        <FormItem label="商户账号：">
	          {getFieldDecorator('account', {
	            rules: [{ pattern: /^1[34578]\d{9}$/, message: '商户账号格式不正确!' }],
	          })(
	            <Input  placeholder="商户账号" />
	          )}
	        </FormItem>
	        <FormItem label="身份证号：">
	          {getFieldDecorator('idCard', {
	          })(
	            <Input placeholder="身份证号" />
	          )}
	        </FormItem>
	        <FormItem>
	          <Button
	            type="primary"
	            icon="search"
	            htmlType="button"
	            onClick={handleSubmit}
	            disabled={hasErrors(getFieldsError())}
	          >搜索
	          </Button>
	        </FormItem>
	      </Form>
      </Card>
      <Card title="基本信息" bordered={false}  style={{'margin-top': '10px'}}>
      	<div  style={{marginBottom: '10px'}}>
	    		<Table  columns={ columns } dataSource={ list } pagination={ false }/>
	    	</div>
		    <Card.Grid style={gridStyle}>
		    	<div >累计到账收益（元）</div>
		    	<span className={ styles.value }>
		    		<CountUp
		            start={0}
		            end={ baseInfo ? baseInfo.totalReceive : 0 }
		            duration={2.75}
		            useEasing
		            useGrouping
		            separator=","
		        />
		    	</span>
		    </Card.Grid>
		    <Card.Grid style={gridStyle}>
		    	<div >累计投资收益（元）</div>
		    	<span className={ styles.value }>
		    		<CountUp
		            start={0}
		            end={ baseInfo ? baseInfo.totalInvest : 0 }
		            duration={2.75}
		            useEasing
		            useGrouping
		            separator=","
		        />
		    	</span>
		    </Card.Grid>
		    <Card.Grid style={gridStyle}>
		    	<div>累计奖金收入（元）</div>
		    	<span className={ styles.value }>
		    		<CountUp
		            start={0}
		            end={ baseInfo ? baseInfo.totalReward : 0 }
		            duration={2.75}
		            useEasing
		            useGrouping
		            separator=","
		        />
		    	</span>
		    </Card.Grid>
		    <Card.Grid style={gridStyle}>
		    	<div>累计红包收入（元）</div>
		    	<span className={ styles.value }>
		    		<CountUp
		            start={0}
		            end={ baseInfo ? baseInfo.totalRed : 0 }
		            duration={2.75}
		            useEasing
		            useGrouping
		            separator=","
		        />
		    	</span>
		    </Card.Grid>
		  </Card>
      
      
    	<Row gutter={20}>
    		<Col lg={ 12 } md={ 12 } sm={ 24 } style={{'margin-top': '10px'}}>
    			<Card title="持有礼券" bordered={false} className={styles.item} >
    				asf
					</Card>
    		</Col>
    		<Col lg={ 12 } md={ 12 } sm={ 24 } style={{'margin-top': '10px'}}>
    			<Card title="投资记录" bordered={false} className={styles.item} >
    				asf
					</Card>
    		</Col>
    	</Row>
    
    </div>
  );
}

function mapStateToProps(state) {
	const { baseInfo, couponTotal, couponCurrent, couponList } = state.userRecords;
  return {
  	baseInfo
  };
}

export default connect(mapStateToProps)(Form.create()(UserRecords));
