import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Table, Select, Card } from 'antd';
import styles from './GoodsList.css';


const FormItem = Form.Item;
const Option = Select.Option;

function GoodsList({
	dispatch,
	total,
	current,
	pageSize,
	list,
	loading,
	form: {
		getFieldDecorator
	}
}) {
	
	const columns = [
		{
		  title: '商品图片',
		  dataIndex: 'img',
		  key: 'img',
		},
		{
		  title: '商品名称',
		  dataIndex: 'name',
		  key: 'name',
		},
		{
		  title: '所需积分',
		  dataIndex: 'point',
		  key: 'point',
		},
		{
		  title: '可兑换数',
		  dataIndex: 'cycle',
		  key: 'cycle',
		},
		{
		  title: '操作',
		  dataIndex: 'id',
		  key: 'id',
		  render: (text, record) => (
		    <span>
		      <a onClick={() => send(text) }>发放</a>
		      <span className="ant-divider" />
		      <a>查看加息券</a>
		    </span>
		  ),
		}
	];
	
	const pagination = {
		current, 
		total,
		pageSize,
		onChange: (page, pageSize) => {
			dispatch({
	      type: 'goodsList/getList',
	      payload: page,
	    });
		}
	}
	
	const handleSubmit = (e) => {
		e.preventDefault();
		validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		})
	}
	
	
	
	
	
	
	
	
	
  return (
    <div className={styles.normal}>
    	<Card bordered={ false }>
    		<Form layout="inline" >
	        <FormItem label="关键字搜索："
	        >
	          {getFieldDecorator('keyword', {})(
	            <Input  placeholder="商品名称/编号" />
	          )}
	        </FormItem>
	        <FormItem label="类型" >
	        	{getFieldDecorator('type', {
	        		initialValue: '0'
	        	})(
	        		<Select style={{width: '120px'}}>
				        <Option value="0">全部</Option>
				        <Option value="1">实物</Option>
				        <Option value="2">虚拟物品</Option>
				      </Select>
	          )}
			      
			    </FormItem>
	        <FormItem>
	          <Button
	            type="primary"
	            icon="search"
	            htmlType="button"
	            onClick={handleSubmit}
	          >搜索
	          </Button>
	        </FormItem>
	      </Form>
    	</Card>
    	<Card bordered={ false } style={{marginTop: '10px'}} className={ styles['content-card'] }>
    		<Table loading={ loading } columns={columns} dataSource={ list }  pagination={ pagination } />
    	</Card>
    	
    </div>
  );
}

function mapStateToProps(state) {
  const { total, current, list, pageSize } = state.goodsList
  return {
  	loading: state.loading.models.goodsList,
  	total, 
  	current, 
  	list, 
  	pageSize,
  	
  	
  };
}

export default connect(mapStateToProps)(Form.create()(GoodsList));
