import React from 'react';
import { Modal, Form, Input, Select, Upload, Icon, message ,  } from 'antd'
import Editor from '../common/Editor';


import styles from './NewsModal.less';


const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const editorConfig = {
		editorStyle: {
	    minHeight: 150,
	  }
	}

function NewsModall({
	item = {},
	visiable,
	upload,
	newsTypesConfig,
	contentChange,
	newsTypeChange,
	close,
	form: {
    getFieldDecorator,
    validateFields
  }
	
}) {
	
	const handleCancel = () => {
    console.log('Clicked cancel button');
    close()
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
		
	const  getBase64 = (img, callback) => {
	  const reader = new FileReader();
	  reader.addEventListener('load', () => callback(reader.result));
	  reader.readAsDataURL(img);
	}
	
	const beforeUpload = (file) => {
		const isPicture = file.type === 'image/jpeg' || file.type === 'image/png'
	  if (!isPicture) {
	    message.error('只能上传jgp和png格式的图片');
	  }
	  const limit = file.size / 1024 < 20000000;
	  if (!limit) {
	    message.error('图片不能超过200kb');
	  }
	  return isPicture && limit;
	}
	
	const handleChange = (info) => {
    if (info.file.status === 'done') {
    	console.log(info.file.response,)
    	const path = info.file.response.result.path
    	upload(path)
    }
  }
	
	
  return (
    <div className={styles.normal}>
      <Modal title={ item.modalTitle } 
          visible={ visiable }
          onOk={ handleSubmit }
          confirmLoading={false}
          onCancel={handleCancel}
        >
        <Form>
        	<FormItem label="新闻类型：" hasFeedback {...formItemLayout}>
	          {getFieldDecorator('type', {
	          	initialValue: (item.type === undefined ? undefined : ('' + item.type)) ,
	          	rules: [{ required: true, message: '请选择新闻类型！' }],
	          })(
					     	<Select placeholder="请选择新闻类型"  onChange={ newsTypeChange }>
						       { newsTypesConfig.map( item => <Select.Option value={`${item.type}`} key={`${item.type}`}>{item.name}</Select.Option>)}
						    </Select>
	          )}
	        </FormItem>
        	<FormItem label="新闻标题：" hasFeedback { ...formItemLayout} >
	          {getFieldDecorator('title', {
	          	initialValue: item.title,
	            rules: [{ required: true, message: '新闻标题不能为空！'  }],
	          })(
					     	<Input  placeholder="不得超过200个字！" />
	          )}
	        </FormItem>
	        
	        
	        {
	        	item.type == 2 && <div className={ styles['upload-wrap'] }>
		        	<Upload
				        className="avatar-uploader"
				        name="avatar"
				        showUploadList={false}
				        action="/api/img/upload"
				        beforeUpload={beforeUpload}
				        onChange={handleChange}
				      >
				        {
				          item.path ?
				            <img src={item.path} alt="" className="avatar" /> :
				            <Icon type="plus" className="avatar-uploader-trigger" />
				        }
				      </Upload>
		        </div>
	        }
	        
	        
	        
	        <FormItem label="新闻链接：" hasFeedback { ...formItemLayout} >
	          {getFieldDecorator('link', {
	          	initialValue: item.link,
	          })(
					     	<Input  placeholder="若无外链可不填。" />
	          )}
	        </FormItem>
	        <Editor change= { contentChange } initState={item.content} config={ editorConfig } />
	      </Form>
      </Modal>
    </div>
  );
}

export default Form.create()(NewsModall);
