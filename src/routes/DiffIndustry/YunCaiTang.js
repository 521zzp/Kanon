import React from 'react';
import { connect } from 'dva';
import { Card, Form, Input, Select, Button, Table, Modal, Tag } from 'antd'
import styles from './YunCaiTang.css';
import { PHONE } from '../../utils/regx'

const FormItem = Form.Item
const Option = Select.Option;
const confirm = Modal.confirm;


function YunCaiTang({
  loading,
  dispatch,
  total,
  money,
  current,
  pageSize,
  list,
	form: {
		getFieldDecorator,
		validateFields,
	}
	
}) {
	
	const handleSubmit = (e) => {
		e.preventDefault()
		validateFields((err, values) => {
			if (!err) {
				console.log(values)
			}
		})
	}
	
	const pagination = {
		current, 
		total,
		pageSize,
		onChange: (page, pageSize) => {
			dispatch({
	      type: 'yuncaitang/getList',
	      payload: page,
	    });
		}
	}
	
	//设置已使用
	const setUsed = (id) => {
		console.log('使用', id)
		confirm({
		    title: '操作确认！',
		    content: '确定验证通过吗？此操作不可逆',
		    onOk() {
		      	dispatch({
			    	type: 'yuncaitang/setUsed',
			    	payload: { id }
		    	});
		    },
		});
	}
	
	const columns = [
		{
		  title: '用户账号',
		  dataIndex: 'account',
		  key: 'account',
		},
		{
		  title: '姓名',
		  dataIndex: 'name',
		  key: 'name',
		},
		{
		  title: '礼券编码',
		  dataIndex: 'couponId',
		  key: 'couponId',
		},
		{
		  title: '礼券金额（元）',
		  dataIndex: 'money',
		  key: 'money',
		},
		{
		  title: '礼券获取时间',
		  dataIndex: 'getTime',
		  key: 'getTime',
		},
		{
		  title: '礼券使用时间',
		  dataIndex: 'useTime',
		  key: 'useTime',
		},
		{
		  title: '礼券到期时间',
		  dataIndex: 'endTime',
		  key: 'endTime',
		},
		{
		  title: '礼券状态',
		  dataIndex: 'status',
		  key: 'status',
		  render: (text, record) => {
		  	if (text === 0 ) {
		  		return <span style={{color: 'yellowgreen'}}>已使用</span>
		  	} else if (text === -1) {
		  		return <span style={{color: 'red'}}>已过期</span>
		  	} else {
		  		return <span>未使用</span>
		  	}
		  }
		},
		{
		  title: '操作',
		  dataIndex: 'id',
		  key: 'id',
		  render: (text, record) => (
		  	<div>{ record.status === 1 && <a onClick = { () => setUsed(text) }>设置使用</a> }</div>
		  ),
		}
	];
	

	
	
	
  return (
    <div className={styles.normal}>
    	<Card bordered={ false }>
    		<Form layout="inline">
    			<FormItem label="账号">
    				{ getFieldDecorator('account',{
    					rules: [
    						{ pattern: PHONE, message: '手机号码格式不正确' }
    					]
    				})(
    					<Input placeholder="请输入账号" />
    				) }
    			</FormItem>
    			<FormItem label="使用状态">
    				{getFieldDecorator('status',{
    					
    				})(
    					<Select style={{width: '120px'}}>
    						<Option value="1">未使用</Option>
    						<Option value="2">已使用</Option>
    						<Option value="-1">已过期</Option>
    					</Select>
    				)}
    			</FormItem>
    			<FormItem label="礼券码">
    				{ getFieldDecorator('couponId',{
    					
    				})(
    					<Input placeholder="请输入礼券编码" />
    				) }
    			</FormItem>
    			<FormItem>
    				<Button
    					icon="search"
    					type="primary"
    					onClick={ handleSubmit }
    				>
    					搜索
    				</Button>
    			</FormItem>
    		<Tag color="pink" style={{ float: 'right' }}>已抵扣总金额:  { money ? money : 0 }元</Tag>
    		</Form>
    		
    	</Card>
    	<Card bordered={ false } style={{marginTop: '10px', minHeight: 'calc(100vh - 180px)'}}>
    		<Table loading={ loading } columns={ columns } dataSource={ list }  pagination={ pagination } />
    	</Card>
    </div>
  );
}

function mapStateToProps(state) {
	const { total, current, pageSize, list, money } = state.yuncaitang
	console.log('money',money)
  return {
  	loading: state.loading.models.yuncaitang,
  	total,
  	money,
  	current,
  	pageSize,
  	list,
  };
}

export default connect(mapStateToProps)(Form.create()(YunCaiTang));

