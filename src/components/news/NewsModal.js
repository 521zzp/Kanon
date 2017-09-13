import React from 'react';
import { Modal, Form, Input, Select, Upload, Icon, } from 'antd'
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
	newsTypesConfig,
	contentChange,
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
	
	const newsTypeChange = () => {
		console.log('news type change')
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
	  const isJPG = file.type === 'image/jpeg';
	  if (!isJPG) {
	    message.error('You can only upload JPG file!');
	  }
	  const isLt2M = file.size / 1024 / 1024 < 2;
	  if (!isLt2M) {
	    message.error('Image must smaller than 2MB!');
	  }
	  return isJPG && isLt2M;
	}
	
	const handleChange = (info) => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
    }
  }
	
	const imageUrl = ''
	
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
	          	rules: [{ required: true, message: '请选择产品类型！' }],
	          })(
					     	<Select placeholder="请选择产品类型"  onChange={ newsTypeChange }>
						       { newsTypesConfig.map( item => <Select.Option value={`${item.type}`} key={`${item.type}`}>{item.name}</Select.Option>)}
						    </Select>
	          )}
	        </FormItem>
        	<FormItem label="新闻标题：" hasFeedback { ...formItemLayout} >
	          {getFieldDecorator('title', {
	          	initialValue: item.title,
	            rules: [{ required: true, message: '产品标题不能为空！'  }],
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
				        action="//jsonplaceholder.typicode.com/posts/"
				        beforeUpload={beforeUpload}
				        onChange={handleChange}
				      >
				        {
				          imageUrl ?
				            <img src={imageUrl} alt="" className="avatar" /> :
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
