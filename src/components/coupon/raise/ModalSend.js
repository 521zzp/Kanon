import React from 'react';
import PropTypes from 'prop-types'
import { Form, Input, Modal  } from 'antd'

import styles from './ModalAdd.css';

const { TextArea } = Input;
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

function ModalSend({
	visiable,
	close,
	form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    getFieldsError, getFieldError, isFieldTouched,validateFields
  }
}) {
	
	const handleCancel = () => {
    close()
  }
	
	const handleOk = () => {
		console.log('ok')
	}
	
	const handleSubmit = () => {
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
      <Modal title="发送加息券" afterClose={ modalClose }
          visible={ visiable }
          onOk={ handleSubmit }
          confirmLoading={false}
          onCancel={handleCancel}
        >
        <Form  >
	        <FormItem label="发送账号：" hasFeedback  {...formItemLayout}>
	          {getFieldDecorator('accounts', {
	          	 rules: [{ required: true, message: '没有人怎么发啊(꒪Д꒪)ノ' }],
	          })(
					     	<TextArea placeholder="请填写需要发送的账号，可发送多个，用逗号隔开" autosize={{ minRows: 4 }} />
	          )}
	        </FormItem>
	      </Form>
      </Modal>
    </div>
  );
}

export default Form.create()(ModalSend);
