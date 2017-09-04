import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'dva';
import { Form, Icon, Input, Button, DatePicker, Select, Table } from 'antd';
import styles from './Gathered.css';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

function Gathered({
  dispatch,
  total,
  current,
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
      }
      console.log(values)
    });
  }
	//列条目
	const userNameError = isFieldTouched('userName') && getFieldError('userName');
		const columns = [{
	  title: 'Name',
	  dataIndex: 'name',
	  key: 'name',
	  render: text => <a href="#">{text}</a>,
	}, {
	  title: 'Age',
	  dataIndex: 'age',
	  key: 'age',
	}, {
	  title: 'Address',
	  dataIndex: 'address',
	  key: 'address',
	}, {
	  title: 'Action',
	  key: 'action',
	  render: (text, record) => (
	    <span>
	      <a href="#">Action 一 {record.name}</a>
	      <span className="ant-divider" />
	      <a href="#">Delete</a>
	      <span className="ant-divider" />
	      <a href="#" className="ant-dropdown-link">
	        More actions <Icon type="down" />
	      </a>
	    </span>
	  ),
	}];
	//列数据
	const data = [{
	  key: '1',
	  name: 'John Brown',
	  age: 32,
	  address: 'New York No. 1 Lake Park',
	}, {
	  key: '2',
	  name: 'Jim Green',
	  age: 42,
	  address: 'London No. 1 Lake Park',
	}, {
	  key: '3',
	  name: 'Joe Black',
	  age: 32,
	  address: 'Sidney No. 1 Lake Park',
	}];
	
	const pagination = {
		current: current, 
		total: total,
		onChange: (page, pageSize) => {
			console.log('page: ' + page)
			dispatch({
	      type: 'gathered/getTotal',
	      payload: page,
	    });
		}
	}
	
  return (
    <div className={styles.normal}>
    	<div>
    		<Form layout="inline" >
	        <FormItem label="商户账号："
	          validateStatus={userNameError ? 'error' : ''}
	          help={userNameError || ''}
	        >
	          {getFieldDecorator('account', {
	            rules: [{ pattern: /^1[34578]\d{9}$/, message: '商户账号格式不正确!' }],
	          })(
	            <Input  placeholder="商户账号" />
	          )}
	        </FormItem>
	        <FormItem label="订单编号：">
	          {getFieldDecorator('order', {
	            rules: [],
	          })(
	            <Input placeholder="订单编号" />
	          )}
	        </FormItem>
	        <FormItem
	          label="选择时间"
	        >
	          {getFieldDecorator('time')(
	            <RangePicker />
	          )}
	        </FormItem>
	        <FormItem 
	          label="付款状态">
	          {getFieldDecorator('status')(
	            <Select placeholder="请选择"  style={{width: '100px'}}> 
	              <Option value="1">已付款</Option>
	              <Option value="0">未付款</Option>
	            </Select>
	          )}
	        </FormItem>
	        <FormItem>
	          <Button
	            type="primary"
	            htmlType="button"
	            onClick={handleSubmit}
	            disabled={hasErrors(getFieldsError())}
	          >搜索
	          </Button>
	        </FormItem>
	      </Form>
    	</div>
    	<div className="table-plabe" style={{marginTop: '10px'}}>
    		<Table columns={columns} dataSource={data} pagination={pagination} />
    	</div>
    </div>
  );
}

function mapStateToProps(state) {
	//const { total, current } = state.gathered;
	const temp = state.gathered;
	console.log('state temp')
	console.log(temp)
	console.log('state tepm end')
  return {
  	total: 100,
  	current: 2
  };
}

Gathered.propTypes = {
  form: PropTypes.object,
}

export default connect(mapStateToProps)(Form.create()(Gathered));
