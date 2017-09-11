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
  loading,
  pageSize,
  list,
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
		      type: 'gathered/getTotal',
		      payload: values,
		    });
      }
    });
  }
	//列条目
	  //const userNameError = isFieldTouched('userName') && getFieldError('userName');
		const columns = [
			{
			  title: '商户账号',
			  dataIndex: 'account',
			  key: 'account',
			},
			{
			  title: '真实姓名',
			  dataIndex: 'name',
			  key: 'name',
			},
			{
			  title: '订单编号',
			  dataIndex: 'order',
			  key: 'order',
			},
			{
			  title: '富友对账编号',
			  dataIndex: 'fyOrder',
			  key: 'fyOrder',
			},
			{
			  title: '订单金额',
			  dataIndex: 'money',
			  key: 'money',
			  render: text => <span className={ styles.money }>{text}</span>,
			},
			{
			  title: '通道费率',
			  dataIndex: 'portRate',
			  key: 'portRate',
			},
			{
			  title: '接口费率',
			  dataIndex: 'interfaceRate',
			  key: 'interfaceRate',
			},
			{
			  title: '付款银行',
			  dataIndex: 'bank',
			  key: 'bank',
			},
			{
			  title: '创建时间',
			  dataIndex: 'createTime',
			  key: 'createTime',
			},
			{
			  title: '订单状态',
			  dataIndex: 'status',
			  key: 'status',
			},
			{
			  title: '操作',
			  key: 'action',
			  render: (text, record) => (
			    <span>
			      <a href="#">Delete</a>
			      <span className="ant-divider" />
			      <a href="#" className="ant-dropdown-link">
			        More actions <Icon type="down" />
			      </a>
			    </span>
			  ),
			}
		];
	
	const pagination = {
		current, 
		total,
		pageSize,
		onChange: (page, pageSize) => {
			dispatch({
	      type: 'gathered/getList',
	      payload: page,
	    });
		}
	}
	
  return (
    <div className={styles.normal} >
    	<div>
    		<Form layout="inline" >
	        <FormItem label="商户账号：">
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
	            icon="search"
	            htmlType="button"
	            onClick={handleSubmit}
	            disabled={hasErrors(getFieldsError())}
	          >搜索
	          </Button>
	        </FormItem>
	      </Form>
    	</div>
    	<div className="table-plabe" style={{marginTop: '10px'}}>
    		<Table loading={loading} columns={columns} dataSource={ list } pagination={pagination} />
    	</div>
    </div>
  );
}

function mapStateToProps(state) {
	const { total, current, pageSize, list } = state.gathered;
  return {
  	loading: state.loading.models.gathered,
  	total,
  	current,
  	pageSize,
  	list,
  	
  };
}

Gathered.propTypes = {
  form: PropTypes.object,
}

export default connect(mapStateToProps)(Form.create()(Gathered));
