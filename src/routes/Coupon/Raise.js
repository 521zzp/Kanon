import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Table } from 'antd';
import styles from './Raise.css';
import ModalAdd from '../../components/coupon/raise/ModalAdd'
import ModalSend from '../../components/coupon/raise/ModalSend'

const FormItem = Form.Item;


function Raise({
	dispatch, 
	total, 
	current, 
	loading, 
	pageSize,
	list,
	addModalVisiable,
	sendModalVisiable,
	form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    getFieldsError, getFieldError, isFieldTouched,validateFields
  }
}) {
	
	const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        dispatch({
		      type: 'raise/getTotal',
		      payload: values,
		    });
      }
    });
  }
	
	const add = (e) => {
		e.preventDefault();
		dispatch({
      type: 'raise/openAddModal',
    });
	}
	
	const close = () => {
		dispatch({
      type: 'raise/closeAddModal',
    });
	}
	
	const send = (id) => {
		dispatch({
      type: 'raise/openSendMoadl',
      payload: id
    });
	}
	
	const sendClose = () => {
		dispatch({
      type: 'raise/closeSendMoadl',
    });
	}
	
	const columns = [
		{
		  title: '加息券名称',
		  dataIndex: 'name',
		  key: 'name',
		},
		{
		  title: '加息券点数',
		  dataIndex: 'point',
		  key: 'point',
		},
		{
		  title: '创建时间',
		  dataIndex: 'createTime',
		  key: 'createTime',
		},
		{
		  title: '加息周期',
		  dataIndex: 'cycle',
		  key: 'cycle',
		},
		{
		  title: '操作',
		  dataIndex: 'id',
		  key: 'id',
		  render: (text, record) => (
		    <span>
		      <a onClick={() => send(text) }>发放</a>
		      <span className="ant-divider" />
		      <a>查看加息券</a>
		    </span>
		  ),
		}
	];
	
	const datas = [
		{
			name: '加息券测试',
			point: 0.06,
			createTime: '2017-8-10 17:33:45',
			cycle: 10,
			id: 1,
			key: 0, 
		},
		{
			name: '加息券测试',
			point: 0.06,
			createTime: '2017-8-10 17:33:45',
			cycle: 10,
			id: 2,
			key: 1, 
		},
		{
			name: '加息券测试',
			point: 0.06,
			createTime: '2017-8-10 17:33:45',
			cycle: 10,
			id: 3,
			key: 2, 
		},
		{
			name: '加息券测试',
			point: 0.06,
			createTime: '2017-8-10 17:33:45',
			cycle: 10,
			id: 4,
			key: 3, 
		},
	]
	
	const pagination = {
		current, 
		total,
		pageSize,
		onChange: (page, pageSize) => {
			dispatch({
	      type: 'raise/getList',
	      payload: page,
	    });
		}
	}
	
  return (
    <div className={styles.normal}>
    	<div>
    		<Form layout="inline" >
	        <FormItem label="加息券名称："
	        >
	          {getFieldDecorator('name', {})(
	            <Input  placeholder="加息券名称" />
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
	        <FormItem>
	          <Button
	            type="primary"
	            icon="plus"
	            htmlType="button"
	            onClick={ add }
	          >新增
	          </Button>
	        </FormItem>
	      </Form>
    	</div>
    
    	<div className={ styles['table-plant'] }>
    		<Table loading={ loading } columns={columns} dataSource={ list }  pagination={ pagination } />
    	</div>
    	<ModalAdd visiable={ addModalVisiable } close={ close }/>
    	<ModalSend visiable = { sendModalVisiable } close={ sendClose } />
    </div>
  );
}

function mapStateToProps(state) {
	const { total, current, pageSize, list, addModalVisiable, sendModalVisiable } = state.raise;
  return {
  	loading: state.loading.models.raise,
  	total,
  	current,
  	pageSize,
  	list,
  	addModalVisiable,
  	sendModalVisiable,
  };
}

export default connect(mapStateToProps)(Form.create()(Raise));
