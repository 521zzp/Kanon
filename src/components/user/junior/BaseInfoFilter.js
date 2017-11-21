import React from 'react';
import { Card, Form, Input, Button, Icon } from 'antd';
import styles from './BaseInfoFilter.css';
import { PHONE, IDCARD } from '../../../utils/regx'

const FormItem = Form.Item

function BaseInfoFilter({
	search,
	form: {
		getFieldDecorator,getFieldsError,validateFields, getFieldsValue
	}
}) {
	
	const hasErrors = (fieldsError) => {
		const values = getFieldsValue()
		let flag = 0
		for (let item in values) {
			if (values[item]) {
				 flag++
			}
		}
		if (flag === 0) {
			return true
		}
		return Object.keys(fieldsError).some(field => fieldsError[field]);
	}
	
	const handleSubmit = (e) => {
    e.preventDefault();
   	validateFields((err, values) => {
      if (!err) {
        search(values)
      }
    });
  }
	
  return (
      <Card bordered={ false }>
      	<Form layout="inline" >
      		<FormItem label="用户手机号"> 
	          {getFieldDecorator('account', {
	            rules: [
		            {	pattern: PHONE, message: '手机号码格式不正确！', }, 
	            ],
	          })(
	            <Input />
	          )}
	        </FormItem>
	        <FormItem label="身份证号"> 
	          {getFieldDecorator('idCard', {
	            rules: [
		            {	pattern: IDCARD, message: '身份证号式不正确！', }, 
	            ],
	          })(
	            <Input />
	          )}
	        </FormItem>
	        <FormItem>
	          <Button
	            type="primary"
	            htmlType="submit"
	            onClick={ handleSubmit }
	            disabled={hasErrors(getFieldsError())}
	          >
	            查询
	          </Button>
	        </FormItem>
	        <FormItem>   
	        	<a>查询最上级商户</a>
	        </FormItem>
	    		<FormItem>   
	        	<a>查看三级内详情</a>
	        </FormItem>
      	</Form>
      </Card>
  );
}

export default Form.create()(BaseInfoFilter);
