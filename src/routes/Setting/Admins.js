import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Button, Form, Table, } from 'antd';
import DropOption from '../../components/common/DropOption';
import styles from './Admins.css';


const FormItem = Form.Item

function Admins({
	total,
	list,
	current,
  	pageSize,
	dispatch,
	loading,
}) {
	
	const columns = [
		{
		  title: '账号',
		  dataIndex: 'account',
		  key: 'account',
		},
		{
		  title: '状态',
		  dataIndex: 'status',
		  key: 'status',
		  render: (text, record) => text ? <span style={{color: 'yellowgreen'}}>已激活</span> : <span style={{color: 'red'}}>已锁定</span>
		},
		{
		  title: '权限设置',
		  key: 'power',
		  render: (text, record) => (
		  	<Link to="/power" onMouseEnter = {() => dispatch({ type: 'admins/update', payload: { account: record.account }})}>查看&设置</Link>
		  ),
		},
		{
		  title: '操作',
		  key: 'action',
		  render: (text, record) => <DropOption 
		  		onMenuClick={e => handleMenuClick(record, e)} 
		  		menuOptions={[
		  			{ key: 'edit', name: '编辑账号' }, 
		  			record.status == 0 ? { key: 'off', name: '激活账号' } : { key: 'on', name: '锁定账号' }, 
		  			{ key: 'delete', name: '删除账号' },
		  		]} />
		},
	]
		
	const pagination = {
			current, 
			total,
			pageSize,
			onChange: (page, pageSize) => {
				dispatch({
			      type: 'admins/getList',
			      payload: page,
		    });
			}
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
	
	
	
  return (
    <div className={styles.normal}>
    	<div><Button type="primary" icon="plus" htmlType="button" >添加管理员</Button> </div>
    	<div  style={{marginTop: '10px'}}>
	    		<Table loading={ loading }  columns={ columns } dataSource={ list } pagination={ pagination } />
	    	</div>
    </div>
  );
}

function mapStateToProps(state) {
  const { total, list, current, pageSize } = state.admins
  return {
  	loading: state.loading.models.admins,
  	total,
  	list,
  	current,
  	pageSize,
  };
}

export default connect(mapStateToProps)(Form.create()(Admins));
