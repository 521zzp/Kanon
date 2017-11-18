import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Table, Select, Card , Avatar } from 'antd';
import { browserHistory } from 'dva/router';
import DropOption from '../../components/common/DropOption';
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
			render: (text, record) => 
				<Avatar shape="square" src={ text } size="large" />
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
		  dataIndex: 'stock',
		  key: 'stock',
		},
		{
		  title: '状态',
		  dataIndex: 'on',
		  key: 'on',
		  render: (text, record) => {
		  	if (text) {
		  		return <span style={{color: 'yellowgreen'}}>已上架</span>
		  	} else {
		  		return <span style={{color: 'red'}}>已下架</span>
		  	}
		  }
		},
		{
		  title: '操作',
		  dataIndex: 'top',
		  key: 'top',
		  render: (text, record) => (
		    <span>
		    	{ !text && <a onClick={() => addTop(record.id) }>置顶</a> }
		    	{ !text && <span className="ant-divider" /> }
		    	<DropOption 
			  		onMenuClick={e => handleMenuClick(record, e)} 
			  		menuOptions={[
			  			{ key: 'delete', name: '删除商品' },
			  			{ key: 'edit', name: '编辑商品' },
			  			record.on ? { key: 'off', name: '商品下架' } : { key: 'on', name: '商品上架' }
		  			]} />
		    </span>
		  ),
		}
	];
	
	const handleMenuClick = (record, e) => {
		console.log(record)
		switch (e.key){
			case 'edit':
				browserHistory.push(`/goods/edit/${record.id}`)
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
				dispatch({
			    	type: 'goodsList/paramsChange',
			    	payload: values
		    	});
			}
		})
	}
	
	
	
	const datas = [
		{
			img: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
			name: '夏目友人帐',
			point: 10,
			stock: 99,
			top: true, //是否在置顶状态
			id: '', //商品Id
			key: 0,
			on: true, //是否在上架状态
		},
		{
			img: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
			name: 'Clannad',
			point: 1077,
			stock: 45,
			top: false, //是否在置顶状态
			id: '', //商品Id
			key: 2,
			on: false, //是否在上架状态
		}
	]
	
	
	
	
	
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
    		<Table loading={ loading } columns={ columns } dataSource={ list }  pagination={ pagination } />
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
