import React from 'react';
import { connect } from 'dva';
import { Card, Form, InputNumber, Input, Upload, Select, Icon, Button } from 'antd';
import Editor from '../../components/common/Editor';
import styles from './GoodsDetails.css';

const FormItem = Form.Item;
const Option = Select.Option;


	const formItemLayoutTwo = {
		labelCol: {
		    span: 6,
		  },
		  wrapperCol: {
		    span: 18,
		  },
	}

	const editorConfig = {
		editorStyle: {
	    minHeight: 150,
	  }
	}


function GoodsDetails({
	dispatch,
	item = {},
	goodsIllustrate,
	rechargeIllustrate,
	form: {
	    getFieldDecorator,
	    validateFields
	}
}) {
	
	console.log("iiiiiiitttttttttteeeeeeeeeeemmmmmmmm")
	console.log(item)
	
	
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
	
	const goodsIllustrateChange = (value) => {
		console.log()
		dispatch({
			type: 'goodsDetails/editorContentChange',
			payload: { goodsIllustrate: value }
		})
	}
	const rechargeIllustrateChange = (value) => {
		dispatch({
			type: 'goodsDetails/editorContentChange',
			payload: { rechargeIllustrate: value }
		})
	}
	
	const goodsInfoUpdate = () => {
		
	}
	
	
  return (
    <div className={styles.normal}>
    	<div className={ styles['form-wrap'] }>
    		<Upload
	        className={ styles['avatar-uploader'] }
	        name="avatar"
	        showUploadList={ false }
	        action="//jsonplaceholder.typicode.com/posts/"
	        beforeUpload={ beforeUpload }
	        onChange={ handleChange }
	      >
	        {
	          false ?
	            <img src='' alt="" className={ styles.avatar } /> :
	            <Icon type="plus" className={ styles['avatar-uploader-trigger'] } />
	        }
	      </Upload>
	      <Form style={{ marginTop: '20px'}}>
	      	<FormItem label="商品名称：" hasFeedback {...formItemLayoutTwo}>
	          {getFieldDecorator('name', {
	          	initialValue: item.name ,
	          	rules: [{ required: true, message: '商品名称不能为空！' }],
	          })(
	          	<Input  placeholder="请输入商品名称" />
	          )}
	        </FormItem>
	        
	        <FormItem label="所需积分：" hasFeedback {...formItemLayoutTwo}>
	          {getFieldDecorator('point', {
	          	initialValue: item.point ,
	          	rules: [{ required: true, message: '商品名称不能为空！' }],
	          })(
	          	<InputNumber min={ 0 } step={ 10 }  placeholder="请填写兑换所需积分" style={{ width: '100%'}}/>
	          )}
	        </FormItem>
	        
	        <FormItem label="可兑换数：" hasFeedback {...formItemLayoutTwo}>
	          {getFieldDecorator('stock', {
	          	initialValue: item.stock ,
	          	rules: [{ required: true, message: '可兑换数不能为空！' }],
	          })(
	          	<InputNumber min={ 0 } step={ 10 }  placeholder="请填写该商品可兑换数" style={{ width: '100%'}}/>
	          )}
	        </FormItem>
	        
	        <FormItem label="是否实物：" hasFeedback {...formItemLayoutTwo}>
	          {getFieldDecorator('real', {
	          	initialValue: item.real ,
	          	rules: [{ required: true, message: '请选择商品类型！' }],
	          })(
	          	<Select placeholder="请选择产品类型" >
	          		<Option value="0">虚拟物品</Option>
	          		<Option value="1">实物</Option>
			    </Select>
	          )}
	        </FormItem>
	        
	        
	        
	      	<div className={ styles['editor-title'] }>商品说明:</div>
	      	<Editor change= { goodsIllustrateChange } initState={ item.goodsIllustrate } config={ editorConfig } />
	      	<div className={ styles['editor-title'] }>兑换说明:</div>
	      	<Editor change= { rechargeIllustrateChange } initState={ item.rechargeIllustrate } config={ editorConfig } />
	      	
	      	
	      	<FormItem>
	      		<Button>取消</Button>
	      		<Button type="primary">保存</Button>
	      	</FormItem>
	      </Form>
	      
    	</div>
    	
    </div>
  );
}

function mapStateToProps(state) {
	const { params, rechargeIllustrate } = state.goodsDetails
	
  return {
  	item: params
  };
}

export default connect(mapStateToProps)(Form.create()(GoodsDetails));
