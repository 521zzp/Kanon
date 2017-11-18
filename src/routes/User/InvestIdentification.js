import React from 'react';
import { connect } from 'dva';
import { Form, Button, Table, Select, Card, DatePicker } from 'antd';
import styles from './InvestIdentification.css';
import InvestIdentiModal from '../../components/user/investIdentification/InvestIdentiModal'

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

function InvestIdentification({
	dispatch,
	total,
	current,
	pageSize,
	list,
	loading,
	modalVisiable,
  modalList,
	form: {
		getFieldDecorator,
		validateFields
	}
}) {
	
	
	const columns = [
		{
		  title: '用户账号',
		  dataIndex: 'account',
		  key: 'account',
		},
		{
		  title: '真实姓名',
		  dataIndex: 'name',
		  key: 'name',
		},
		{
		  title: '注册时间',
		  dataIndex: 'registerTime',
		  key: 'registerTime',
		},
		{
		  title: '操作',
		  dataIndex: 'id',
		  key: 'id',
		  render: (text, record) => (
		    	<a onClick={
		    		() => {
		    			dispatch({
					      type: 'investIdentifications/getModalList',
					      payload: { id: text },
					    });
		    		}
		    	} >查看投资</a>
		  ),
		}
	];
	
	const mockData = [
		{
			account: '15773270836',
			name: 'asfag',
			registerTime: '2017-03-21',
			id: 'safasfgewgdsljglamleo'
		}
			
	]
	
	const pagination = {
		current, 
		total,
		pageSize,
		showSizeChanger: true,
		onChange: (page, pageSize) => {
			dispatch({
	      type: 'investIdentifications/getList',
	      payload: page,
	    });
		},
		onShowSizeChange: (current, size) => {
			dispatch({
	      type: 'investIdentifications/getTotal',
	      payload: { pageSize: size },
	    });
		},
	}
	
	const handleSubmit = (e) => {
		e.preventDefault();
		validateFields((err, values) => {
			 console.log('Received values of form: ', values);
			if (!err) {
				const time = values['time'];
				dispatch({
		    	type: 'investIdentifications/getTotal',
		    	payload: {
		    		...values,
		    		time: [  time && time.length === 2 ? time[0].format('YYYY-MM-DD') : '', time && time.length === 2 ? time[1].format('YYYY-MM-DD') : '' ]
		    	}
	    	});
			}
		})
	}
	
	const modalClose = () => {
		
		dispatch({
	    	type: 'investIdentifications/update',
	    	payload: { modalVisiable: false }
		});
		
	}
		
	
	
  return (
    <div className={styles.normal}>
    	<Card bordered={ false }>
    		<Form layout="inline" >
		        <FormItem label="类型" >
		        	{getFieldDecorator('type', {
		        	})(
		        		<Select style={{width: '160px'}}>
					        <Option value="">全部</Option>
					        <Option value="1">注册未绑卡用户</Option>
					        <Option value="2">注册且绑卡用户</Option>
					        <Option value="3">注册绑卡且投资用户</Option>
					        <Option value="4">投资过当前无投资用户</Option>
					      </Select>
		          )}
				    </FormItem>
				    <FormItem label="选择时间">
		          {getFieldDecorator('time')(
		            <RangePicker />
		          )}
		        </FormItem>
		        <FormItem>
	          <Button
	            type="primary"
	            icon="search"
	            htmlType="button"
	            onClick={handleSubmit}
	          >搜索
	          </Button>
	        </FormItem>
	      </Form>
    	</Card>
    	
    	<Card bordered={ false } style={{marginTop: '10px'}} className={ styles['content-card'] }>
    		<Table loading={ loading } columns={ columns } dataSource={ list }  pagination={ pagination } />
    	</Card>
   		<InvestIdentiModal close={ modalClose } visiable={ modalVisiable } list={ modalList } />
    </div>
  );
}

function mapStateToProps(state) {
	const { total, current, list, pageSize, modalVisiable, modalList } = state.investIdentifications
  return {
  	loading: state.loading.models.investIdentifications,
  	total, 
  	current, 
  	list, 
  	pageSize,
  	modalVisiable,
  	modalList,
  };
}

export default connect(mapStateToProps)(Form.create()(InvestIdentification));
