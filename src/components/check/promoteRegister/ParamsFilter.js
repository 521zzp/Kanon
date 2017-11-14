import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import styles from './ParamsFilter.css';

const FormItem = Form.Item;
const Option = Select.Option;



function ParamsFilter({
	optionList,
	params = {},
	paramsChange,
	form: {
    getFieldDecorator,validateFields
	},
}) {
	
	
	//搜索
	const handleSubmit = (e) => { 
	    e.preventDefault();
	    validateFields((err, values) => {
	      if (!err) {
	        console.log('Received values of form: ', values);
	        paramsChange(values)
	      }
	    });
	}
	
  return (
    <div className={styles.normal}>
    	<Form layout="inline" >
	        <FormItem label="用户账号">
	          {getFieldDecorator('account',{
	          	initialValue: params.account
	          })(
	            <Input />
	          )}
	        </FormItem>
	        <FormItem label="上级账号">
	          {getFieldDecorator('superior',{
	          	initialValue: params.superior
	          })(
	            <Input />
	          )}
	        </FormItem>
	        <FormItem label="审核状态">
	          {getFieldDecorator('status',{
	          	initialValue: params.status
	          })(
	            <Select placeholder="审核状态"  style={{width: '100px'}}> 
	            	{ optionList.map(item => 
	            		<Option value={ item.value.toString() } key={item.value}>{item.key}</Option>
	            	) }
	            </Select>
	          )}
	        </FormItem>
	        <FormItem>
	          <Button
	            type="primary"
	            icon="search"
	            htmlType="button"
	            onClick={ handleSubmit }
	          >搜索
	          </Button>
	        </FormItem>
	    </Form>
    
    </div>
  );
}

export default Form.create()(ParamsFilter);
