import React from 'react';
import PropTypes from 'prop-types'
import { Form, Input, Modal, Select, Button, Switch, InputNumber  } from 'antd'
import QueueAnim from 'rc-queue-anim';
import config from '../../../config/config.json'


import styles from './UserDetailsModal.css';

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

function UserDetailsModal({
	item,
	visiable,
	close,
	updateLoading, 
	ok,
	form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    getFieldsError, getFieldError, isFieldTouched,validateFields
  }
}) {
	
	const handleCancel = () => {
    close()
  }
	
	const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of modal form: ', values);
        ok(values)
      }
    });
  }
	
	
	
  return (
    <div className={styles.normal}>
      <Modal title="用户设置" 
          visible={ visiable }
          onOk={ handleSubmit }
          confirmLoading={updateLoading}
          onCancel={handleCancel}
          okText='保存'
        >
        <Form  >
        <QueueAnim>
	        <div  key="s1">
	        	<FormItem label="VIP等级：" hasFeedback {...formItemLayout}>
		          {getFieldDecorator('level', {
		          	initialValue: item.level
		          })(
						     	<Select placeholder="请选择" > 
			              { config.userLevel.map((item) =>  <Option key={item.value} value={item.value.toString()}>{item.key}</Option>) }
			            </Select>
		          )}
		        </FormItem>
	        </div>
	        <div key="s2">
	        	<FormItem label="上级手机：" hasFeedback {...formItemLayout}>
		          {getFieldDecorator('superiorsAccount', {
		          	initialValue: item.superiorsAccount
		          })(
						     	<Input  placeholder="上级手机号码" />
		          )}
		        </FormItem>
	        </div>
	        <div key="s3">
	        	<FormItem label="上级姓名" hasFeedback {...formItemLayout}>
		          {getFieldDecorator('superiorsName', {
		          	initialValue: item.superiorsName
		          })(
		           <Input disabled={true}  placeholder="上级姓名" />
		          )}
		        </FormItem>
	        </div>
	        <div key="s4">
	        	<FormItem label="银行卡号：" hasFeedback {...formItemLayout}>
		          {getFieldDecorator('bankCard', {
		          	initialValue: item.bankCard
		          })(
		          	<Input  placeholder="银行卡号" />
		          )}
		        </FormItem>
	        </div>
	        <div key="s5">
	        	<FormItem label="持有积分：" hasFeedback {...formItemLayout}>
		          {getFieldDecorator('point', {
		          	initialValue: item.point,
		            rules: [{ required: true, message: '请填写持有积分' }],
		          })(
						     	<InputNumber min={ 0 }   placeholder="持有积分" style={{ width: '100%'}} />
		          )}
		        </FormItem>
	        </div>
	        <div key="s6">
		        <FormItem label="冻结设置：" hasFeedback {...formItemLayout}>
		          {getFieldDecorator('activate', {
		          	valuePropName: 'checked',
		          	initialValue: item.activate,
		          })(
		          	<Switch checkedChildren="激活" unCheckedChildren="冻结"/>
		          )}
		        </FormItem>
	        </div>
	        { item.activate === false && <div key="s7">
				          <span className={ styles['freeze-time'] }>已冻结: <b style={{ color: 'red' }}>{item.freezeDay}</b> 天</span>
			        </div>
	        }
	        </QueueAnim>
	      </Form>
      </Modal>
    </div>
  );
}

export default Form.create()(UserDetailsModal);
