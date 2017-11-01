import React from 'react';
import { Form, Input, Modal, Button  } from 'antd'
import styles from './AdminModal.css';


const FormItem = Form.Item
const confirm = Modal.confirm;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const hasErrors = (fieldsError) => {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

function AdminModal({
	item,
	ok,
	visiable,
	close,
	form: {
    getFieldDecorator,
    validateFields,
  }
}) {
	
	
	const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of modal form: ', values);
        const obj = {
        	type: item.type,
        	account: values.account,
        	password: values.password,
        	name: values.name
        }
        
        confirm({
				    title: '确认',
				    content: item.type === 'add' ? '确认新增该管理员？' : '确认更新该管理员信息？',
				    okText: '确认',
				    okType: 'dashed',
				    cancelText: '取消',
				    onOk() {
				    	ok(obj)
				    },
				  });
      }
    });
  }
	
	
	
	
  return (
    <div className={styles.normal}>
    	<Modal title={ item.type === 'add' ? '添加管理员' : '编辑管理员' }
          visible={ visiable }
          onOk={ handleSubmit }
          onCancel={() => close() }
          okText='保存'
        >
        <Form>
        	<FormItem label="账号：" hasFeedback {...formItemLayout}>
	          {getFieldDecorator('account', {
	          	initialValue: item.account,
	          	rules: [{ required: true, message: '账号不能为空' }],
	          })(
					     	<Input disabled={ !!item.account }  placeholder="请填写管理员账号" />
	          )}
	        </FormItem>
        	<FormItem label="密码" hasFeedback {...formItemLayout}>
	          {getFieldDecorator('password', {
	          	initialValue: item.password,
	          	rules: [{ required: true, message: '密码不能为空' }],
	          })(
	           <Input type="password"  placeholder="请填写管理员密码" />
	          )}
	        </FormItem>
	        <FormItem label="姓名" hasFeedback {...formItemLayout}>
	          {getFieldDecorator('name', {
	          	initialValue: item.name,
	          	rules: [{ required: true, message: '真实姓名不能为空' }],
	          })(
	           <Input  placeholder="请填写管理员真实姓名" />
	          )}
	        </FormItem>
	      </Form>
      </Modal>
    </div>
  );
}

export default Form.create()(AdminModal);
