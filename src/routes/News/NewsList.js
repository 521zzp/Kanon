import React from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, DatePicker, Select, Table,  } from 'antd';
import DropOption from '../../components/common/DropOption';
import NewsModal from '../../components/news/NewsModal'

import styles from './NewsList.css';

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
	modalValue,
	newsTypesConfig,
	list,
	form: {
	    getFieldDecorator,
	    validateFieldsAndScroll,
			getFieldsError, getFieldError, isFieldTouched,validateFields
	},
	modalVisiable,
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
		  title: '新闻类型',
		  dataIndex: 'type',
		  key: 'type',
		},
		{
		  title: '新闻标题',
		  dataIndex: 'title',
		  key: 'title',
		},
		{
		  title: '点击量',
		  dataIndex: 'clickTimes',
		  key: 'clickTimes',
		},
		{
		  title: '创建时间',
		  dataIndex: 'createTime',
		  key: 'createTime',
		},
		{
		  title: '操作',
		  key: 'action',
		  render: (text, record) => (
			    <span>
			      <a><Icon type="edit" />编辑</a>
			      <span className="ant-divider" />
			      <a><Icon type="delete" />删除</a>
			    </span>
			  ),
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
	
	const datas = [
		{
			key: "1",
			type: 1,
			title: '公告测试',
			clickTimes: 100,
			createTime: '2017-07-23'
		}
	]
	
	const close = () => {
		console.log('close modal')
		dispatch({
			type: 'product/update',
			payload: {
				modalVisiable: false
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
	
	const addNews = () =>{
		dispatch({
			type: 'newsList/addNews',
		})
	}
	
	const closeModal = () => {
		dispatch({
			type: 'newsList/closeModal',
		})
	}
	
	
	
	
  return (
    <div className={styles.normal}>
    	<div>
	    	<Form layout="inline" >
		        
		        <FormItem
		          label="发布时间"
		        >
		          {getFieldDecorator('time')(
		            <RangePicker />
		          )}
		        </FormItem>
		        <FormItem label="新闻标题：">
		          {getFieldDecorator('account', {})(
		            <Input  placeholder="请输入新闻标题" />
		          )}
		        </FormItem>
		        <FormItem 
		          label="新闻类型">
		          {getFieldDecorator('type')(
		            <Select placeholder="新闻类型"  style={{width: '100px'}}> 
		            <Option value=''  key=''>全部</Option>
		            	{
		            		newsTypesConfig.map( item => <Option value={`${item.type}`}  key={`${item.type}`}>{item.name}</Option> ) 
		            	}
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
		            onClick={ addNews }
		          >发布新闻
		          </Button>
		        </FormItem>
		    </Form>
    	</div>
    
    	<div  style={{marginTop: '10px'}}>
    		<Table loading={ loading }  columns={ columns } dataSource={ list } pagination={ pagination } />
    	</div>
    
    <NewsModal newsTypesConfig={ newsTypesConfig } item={ modalValue } visiable={ modalVisiable } close={ closeModal }/>
    </div>
  );
}

function mapStateToProps(state) {
	const { modalVisiable, list, total, current, pageSize, newsTypesConfig, modalValue } = state.newsList
	
	
	return {
		loading: state.loading.models.product,
	  	total,
	  	current,
	  	modalValue,
	  	newsTypesConfig,
	  	pageSize,
	  	list,
	  	modalVisiable,
	};
}

export default connect(mapStateToProps)(Form.create()(Product));
