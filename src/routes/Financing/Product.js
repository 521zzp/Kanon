import React from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, DatePicker, Select, Table,  } from 'antd';
import DropOption from '../../components/common/DropOption';
import styles from './Product.less';

import ProductModal from '../../components/financing/product/ProductModal'



const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

function Product({
	total,
	loading,
	current,
	dispatch,
	pageSize,
	productTypes,
	modalValue,
	list,
	form: {
    getFieldDecorator,
    validateFieldsAndScroll,
		getFieldsError, getFieldError, isFieldTouched,validateFields
	},
	modalVisible,
}) {
	
	const change = (result) => {
		console.log(result)
	};
	
	
	//搜索
	const handleSubmit = (e) => { 
	    e.preventDefault();
	    validateFields((err, values) => {
	      if (!err) {
	        console.log('Received values of form: ', values);
	      }
	    });
	}
	
	const html =
	  '<b>Bold text</b>, <i>Italic text</i><br/ ><br />' +
	  '<a href="http://www.facebook.com">Example link</a>';
	  
	//列条目
	const columns = [
		{
		  title: '产品名称',
		  dataIndex: 'name',
		  key: 'name',
		},
		{
		  title: '发布时间',
		  dataIndex: 'createTime',
		  key: 'createTime',
		},
		{
		  title: '周期（天）',
		  dataIndex: 'term',
		  key: 'term',
		},
		{
		  title: '利率',
		  dataIndex: 'rate',
		  key: 'rate',
		},
		{
		  title: '资金上限（元）',
		  dataIndex: 'limit',
		  key: 'limit',
		},
		{
		  title: '已投金额（元）',
		  dataIndex: 'money',
		  key: 'money',
		},
		{
		  title: '起投金额（元）',
		  dataIndex: 'startMoney',
		  key: 'startMoney',
		},
		{
		  title: '产品类别',
		  dataIndex: 'type',
		  key: 'type',
		},
		{
		  title: '操作',
		  key: 'action',
		  render: (text, record) => <DropOption 
		  		onMenuClick={e => handleMenuClick(record, e)} 
		  		menuOptions={[
		  			{ key: 'edit', name: '编辑产品' }, 
		  			status == 0 ? { key: 'off', name: '产品下架' } : { key: 'on', name: '产品上架' }, 
		  			{ key: 'delete', name: '删除产品' },
		  		]} />
		},
	];
	const pagination = {
		current, 
		total,
		pageSize,
		onChange: (page, pageSize) => {
			dispatch({
	      type: 'product/getList',
	      payload: page,
	    });
		}
	}
	
	const close = () => {
		console.log('close modal')
		dispatch({
			type: 'product/update',
			payload: {
				modalVisible: false
			}
		})
	}
	
	const handleMenuClick = (record, e) => {
		console.log(record)
		switch (e.key){
			case 'edit':
				dispatch({
					type: 'product/editProductById',
					payload: record.id
				})
				break;
			case 'on':
				break;
			case 'off':
				break;
			case 'delete':
				break;
			default:
				break;
		}
	}
	
	
	const modalProductTypeChange = (value) => {
		dispatch({
			type: 'product/productTypeChange',
			payload: value
		})
	}
	
	const modalProductRateChange = (value) => {
		dispatch({
			type: 'product/productRateChange',
			payload: value
		})
	}
	
	const modalProductEditorChange = (value) => {
		console.log('editor value')
		console.log(value)

		dispatch({
			type: 'product/editorContentChange',
			payload: { loanEnterprise: value }
		})
	}
	
	const releaseProduct = () => {
		dispatch({
			type:'product/update',
			payload: {
				modalVisible: true,
				modalValue: {
					modalTitle: '发布产品',
					modalType: 'release'
				}
			}
		})
	}
	
  return (
    <div className={styles.normal}>
    	<div>
	    	<Form layout="inline" >
		        
		        <FormItem
		          label="选择时间"
		        >
		          {getFieldDecorator('time')(
		            <RangePicker />
		          )}
		        </FormItem>
		        <FormItem label="产品名称：">
		          {getFieldDecorator('account', {})(
		            <Input  placeholder="请输入产品名称" />
		          )}
		        </FormItem>
		        <FormItem 
		          label="付款状态">
		          {getFieldDecorator('status')(
		            <Select placeholder="请选择"  style={{width: '100px'}}> 
		              <Option value="">全部</Option>
		              <Option value="0">已上架</Option>
		              <Option value="1">已下架</Option>
		            </Select>
		          )}
		        </FormItem>
		        <FormItem>
		          <Button
		            type="primary"
		            icon="search"
		            htmlType="button"
		            onClick={ handleSubmit }
		            disabled={ hasErrors(getFieldsError()) }
		          >搜索
		          </Button>
		        </FormItem>
		        <FormItem>
		          <Button
		            type="primary"
		            icon="plus"
		            htmlType="button"
		            onClick={ releaseProduct }
		          >发布产品
		          </Button>
		        </FormItem>
		    </Form>
    	</div>
    
    	<div  style={{marginTop: '10px'}}>
    		<Table loading={ loading }  columns={ columns } dataSource={ list } pagination={ pagination } />
    	</div>
    
    {modalVisible && <ProductModal 
    	visiable={ modalVisible } 
    	close={ close } 
    	productTypes={ productTypes } 
    	productTypeChange={ modalProductTypeChange }
    	productRateChange={ modalProductRateChange }
    	editorChange = { modalProductEditorChange }
    	item={ modalValue }/>}
    
    </div>
  );
}

function mapStateToProps(state) {
	const { modalVisible, productTypes, modalValue, list, total, current, pageSize } = state.product
	return {
		  loading: state.loading.models.product,
	  	total,
	  	modalValue,
	  	current,
	  	productTypes,
	  	pageSize,
	  	list,
	  	modalVisible,
	};
}

export default connect(mapStateToProps)(Form.create()(Product));
