import React from 'react';
import PropTypes from 'prop-types'
import { Form, Input, Modal, Select, Button, Popover, InputNumber  } from 'antd'
import QueueAnim from 'rc-queue-anim';

import styles from './ModalAdd.css';

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

function ModalAdd({
	visiable,
	close,
	form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    getFieldsError, getFieldError, isFieldTouched,validateFields
  }
}) {
	
	const handleCancel = () => {
    console.log('Clicked cancel button');
    close()
  }
	
	const handleOk = () => {
		console.log('ok')
	}
	
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
	
	const modalClose = () => console.log('close')
	
	const raiseList = [
		{ name: '新手7天', id: 1 },
		{ name: '新手15天', id: 2 },
		{ name: '年终特惠', id: 3 },
		{ name: '感恩回馈', id: 4 },
		{ name: '开春迎新', id: 5 },
	]
	
  return (
    <div className={styles.normal}>
      <Modal title="新增加息券" afterClose={ modalClose }
          visible={ visiable }
          onOk={ handleSubmit }
          confirmLoading={false}
          onCancel={handleCancel}
        >
      
        <Form  >
        <QueueAnim>
	        <div  key="s1">
	        	<FormItem label="加息券名称：" hasFeedback {...formItemLayout}>
		          {getFieldDecorator('name', {
		          	 rules: [{ required: true, message: '来个高大上的名字吧！(oﾟ▽ﾟ)o  ' }],
		          })(
						     	<Input  placeholder="加息券名称" />
		          )}
		        </FormItem>
	        </div>
	        <div key="s2">
	        	<FormItem label="加息券点数：" hasFeedback {...formItemLayout}>
		          {getFieldDecorator('point', {
		            rules: [{ required: true, message: '好歹给点点数嘛(ノДＴ)'  }],
		          })(
						     	<InputNumber min={ 0 } placeholder="加息券点数" style={{ width: '100%'}}/>
		          )}
		        </FormItem>
	        </div>
	        <div key="s3">
	        	<FormItem label="加息产品" hasFeedback {...formItemLayout}>
		          {getFieldDecorator('products', {
		          	rules: [{ required: true, message: '加息产品至少选一个呗！╮(￣▽￣)╭' }],
		          })(
		            <Select placeholder="请选择加息产品" mode="multiple" > 
		              { raiseList.map( item => <Select.Option value={`${item.id}`} key={`${item.id}`}>{item.name}</Select.Option>)}
		            </Select>
		          )}
		        </FormItem>
	        </div>
	        <div key="s4">
	        	<FormItem label="加息券期限：" hasFeedback {...formItemLayout}>
		          {getFieldDecorator('useTerm', {
		            rules: [{ required: true, message: '没有期限算什么啊！!!!∑(ﾟДﾟノ)ノ' }],
		          })(
						     	<InputNumber min={ 0 }  placeholder="例如：5 注：过期日期为发放后5天过期" style={{ width: '100%'}}/>
		          )}
		        </FormItem>
	        </div>
	        <div key="s5">
	        	<FormItem label="计息周期：" hasFeedback {...formItemLayout}>
		          {getFieldDecorator('calcuTerm', {
		            rules: [{ required: true, message: '计息生效多少天呢？(⊙_⊙)?' }],
		          })(
						     	<InputNumber min={ 0 }   placeholder="例如：5 注：过期日期为使用后5天过期" style={{ width: '100%'}} />
		          )}
		        </FormItem>
	        </div>
	        <div key="s6">
		        <FormItem label="使用规则：" hasFeedback {...formItemLayout}>
		          {getFieldDecorator('rule', {
		            rules: [{ required: true, message: '怎能随随便便使用呢？(￣^￣)' }],
		          })(
						     	<InputNumber min={ 0 } placeholder="例如：1000 注：投资金额必须达到1000元方可使用" style={{ width: '100%'}}/>
		          )}
		        </FormItem>
	        </div>
	        <div key="s7">
		        <FormItem label="备注：" hasFeedback {...formItemLayout}>
		          {getFieldDecorator('mark', {
		            rules: [],
		          })(
		            <Input placeholder="备注" />
		          )}
		        </FormItem>
	        </div>
	        </QueueAnim>
	      </Form>
      </Modal>
    </div>
  );
}

export default Form.create()(ModalAdd);
