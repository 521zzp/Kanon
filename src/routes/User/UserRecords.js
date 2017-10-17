import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Table, Modal, Card, Row, Col   } from 'antd';
import { Coupon, Invest, CapitalStatements, Recharge, ShopExchange, Point, Invite } from '../../components/user/userRecords'

import { PHONE, IDCARD } from '../../utils/regx'
import CountUp from 'react-countup'
import styles from './UserRecords.css';

const FormItem = Form.Item;



function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

function UserRecords({
	account,
	idCard,
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
        dispatch({
					type: 'userRecords/update',
					payload: values
				})
        dispatch({
					type: 'userRecords/getCommonInfo'
				})
        /*持有礼券*/
        dispatch({
					type: 'userRecordsCoupon/getTotal'
				})
        /*投资记录*/
        dispatch({
					type: 'userRecordsInvest/getTotal'
				})
        /*资金流水*/
        dispatch({
					type: 'userRecordsCapitalStatements/getTotal'
				})
        /*充值提现记录*/
        dispatch({
					type: 'userRecordsRecharge/getTotal'
				})
        /*商城兑换记录*/
        dispatch({
					type: 'userRecordsShopExchange/getTotal'
				})
        /*积分流水*/
        dispatch({
					type: 'userRecordsPoint/getTotal'
				})
        /*邀请记录*/
        dispatch({
					type: 'userRecordsInvite/getTotal'
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
	    <Card bordered={false} >
	    	<Form layout="inline" >
	        <FormItem label="商户账号：">
	          {getFieldDecorator('account', {
	          	initialValue: account,
	            rules: [{ pattern: PHONE, message: '商户账号格式不正确!' }],
	          })(
	            <Input  placeholder="商户账号" />
	          )}
	        </FormItem>
	        <FormItem label="身份证号：">
	          {getFieldDecorator('idCard', {
	          	initialValue: idCard,
	          	rules: [{ pattern: IDCARD, message: '身份证号格式不正确!' }],
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
      <Card title="基本信息" bordered={false}  style={{marginTop: '10px'}}>
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
    		<Col lg={ 12 } md={ 12 } sm={ 24 } style={{marginTop: '10px'}}>
    			<Card title="持有礼券" bordered={false} className={styles.item} >
    				<Coupon/>
					</Card>
    		</Col>
    		<Col lg={ 12 } md={ 12 } sm={ 24 } style={{marginTop: '10px'}}>
    			<Card title="投资记录" bordered={false} className={styles.item} >
    				<Invest/>
					</Card>
    		</Col>
    		<Col lg={ 12 } md={ 12 } sm={ 24 } style={{marginTop: '10px'}}>
    			<Card title="资金流水" bordered={false} className={styles.item} >
    				<CapitalStatements/>
					</Card>
    		</Col>
    		<Col lg={ 12 } md={ 12 } sm={ 24 } style={{marginTop: '10px'}}>
    			<Card title="充值&提现记录" bordered={false} className={styles.item} >
    				<Recharge/>
					</Card>
    		</Col>
    		<Col lg={ 12 } md={ 12 } sm={ 24 } style={{marginTop: '10px'}}>
    			<Card title="商城兑换记录" bordered={false} className={styles.item} >
    				<ShopExchange/>
					</Card>
    		</Col>
    		<Col lg={ 12 } md={ 12 } sm={ 24 } style={{marginTop: '10px'}}>
    			<Card title="积分流水" bordered={false} className={styles.item} >
    				<Point/>
					</Card>
    		</Col>
    		<Col lg={ 12 } md={ 12 } sm={ 24 } style={{marginTop: '10px'}}>
    			<Card title="邀请记录" bordered={false} className={styles.item} >
    				<Invite/>
					</Card>
    		</Col>
    	</Row>
    
    </div>
  );
}

function mapStateToProps(state) {
	const { baseInfo, account, idCard  } = state.userRecords;
  return {
  	baseInfo,
  	account,
  	idCard,
  };
}

export default connect(mapStateToProps)(Form.create()(UserRecords));
