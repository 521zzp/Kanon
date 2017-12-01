import React from 'react';
import { connect } from 'dva';
import { Card, Form, Input, Select, Button, Table, Modal, Tag, DatePicker } from 'antd'
import styles from './YunCaiTang.css';
import { PHONE } from '../../utils/regx'

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const confirm = Modal.confirm;


function YunCaiTang({
  loading,
  dispatch,
  total,
  bCount,
  dCount,
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
				const tempRange = values['time']
				const time = ( tempRange && tempRange.length === 2) ? [
          tempRange[0].format('YYYY-MM-DD'),
          tempRange[1].format('YYYY-MM-DD'),
        ] : [ '', '' ]
				dispatch({
		      type: 'yuncaitang/getTotal',
		      payload: { ...values, time },
		    });
				
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
		  title: '礼券类型',
		  dataIndex: 'type',
		  key: 'type',
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
		  title: '礼券状态',
		  dataIndex: 'status',
		  key: 'status',
		  render: (text, record) => {
		  	if (text === 0 ) {
		  		return <span style={{color: 'yellowgreen'}}>已使用</span>
		  	} else if (text === 1) {
		  		return <span>未使用</span>
		  	} else {
		  		return <span></span>
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
    			<FormItem label="礼券码">
    				{ getFieldDecorator('couponId',{
    					
    				})(
    					<Input placeholder="请输入礼券编码" />
    				) }
    			</FormItem>
    			<FormItem label="使用状态">
    				{getFieldDecorator('status',{
    					
    				})(
    					<Select style={{width: '120px'}}>
    						<Option value="1">未使用</Option>
    						<Option value="0">已使用</Option>
    					</Select>
    				)}
    			</FormItem>
    			<FormItem label="礼券类型">
    				{getFieldDecorator('type',{
    					
    				})(
    					<Select style={{width: '120px'}}>
    						<Option value="2">浴资券</Option>
    						<Option value="1">10元抵用券</Option>
    					</Select>
    				)}
    			</FormItem>
    			<FormItem
	          label="礼券使用时间"
	        >
	          {getFieldDecorator('time')(
	            <RangePicker />
	          )}
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
    		
    		</Form>
    		<div className={ styles['tag-group'] }>
    			<Tag color="pink">已使用浴资券:  <span style={{ fontSize: '18px', margin: '0 5px' }}>{ bCount ? bCount : 0 }</span>张</Tag>
    			<Tag color="green">已使用10元抵用券:  <span style={{ fontSize: '18px', margin: '0 5px' }}>{ dCount ? dCount : 0 }</span>张</Tag>
    		</div>
    	</Card>
    	<Card bordered={ false } style={{marginTop: '10px', minHeight: 'calc(100vh - 215px)'}}>
    		<Table loading={ loading } columns={ columns } dataSource={ list }  pagination={ pagination } />
    	</Card>
    </div>
  );
}

function mapStateToProps(state) {
	const { total, current, pageSize, list, bCount, dCount } = state.yuncaitang
  return {
  	loading: state.loading.models.yuncaitang,
  	total,
  	bCount,
  	dCount,
  	current,
  	pageSize,
  	list,
  };
}

export default connect(mapStateToProps)(Form.create()(YunCaiTang));

