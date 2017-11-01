import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Button, Form, Table, Modal, } from 'antd';
import DropOption from '../../components/common/DropOption';
import AdminModal from '../../components/setting/admins/AdminModal'
import styles from './Admins.css';


const FormItem = Form.Item
const confirm = Modal.confirm;

function Admins({
	total,
	list,
	current,
  	pageSize,
	dispatch,
	loading,
	modal,
}) {
	
	
	
	const columns = [
		{
		  title: '账号',
		  dataIndex: 'account',
		  key: 'account',
		},
		{
		  title: '姓名',
		  dataIndex: 'name',
		  key: 'name',
		},
		{
		  title: '状态',
		  dataIndex: 'locked',
		  key: 'locked',
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
		  			record.status == 0 ? { key: 'on', name: '激活账号' } : { key: 'off', name: '锁定账号' }, 
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
				      type: 'admins/modalOpen',
				      payload: {
				      	type: 'edit',
				      	visiable: true,
				      	account: record.account
				      }
			    });
				break;
			case 'on':
				confirm({
				    title: '确认',
				    content: '确认激活该管理员账号？',
				    okText: '激活',
				    okType: 'dashed',
				    cancelText: '取消',
				    onOk() {
				    	dispatch({
						      type: 'admins/adminInfoUpdate',
						      payload: {
						      	type: 'unlock',
						      	account: record.account
						      }
					    });
				    },
				  });
				break;
			case 'off':
				confirm({
				    title: '警告',
				    content: '确认锁定该管理员账号？',
				    okText: '锁定',
				    okType: 'dashed',
				    cancelText: '取消',
				    onOk() {
				    	dispatch({
						      type: 'admins/adminInfoUpdate',
						      payload: {
						      	type: 'lock',
						      	account: record.account
						      }
					    });
				    },
				  });
				break;
			case 'delete':
				confirm({
				    title: '警告',
				    content: '确认删除该管理员账号？',
				    okText: '删除',
				    okType: 'dashed',
				    cancelText: '取消',
				    onOk() {
				    	dispatch({
						      type: 'admins/adminInfoUpdate',
						      payload: {
						      	type: 'delete',
						      	account: record.account
						      }
					    });
				    },
				  });
				break;
			default:
				break;
		}
	}
	
	const modalClose = () => {
		dispatch({
		      type: 'admins/modalClose'
	    });
	}
	
	const modalOpenAdd = () => {
		dispatch({
		      type: 'admins/modalOpen',
		      payload: {
		      	type: 'add',
		      	visiable: true,
		      }
	    });
	}
	
	const adminInfoUpdate = (obj) => {
		dispatch({
		      type: 'admins/adminInfoUpdate',
		      payload: obj
	    });
	}
	
	
	
  return (
    <div className={styles.normal}>
    	<div><Button type="primary" icon="plus" htmlType="button" onClick={ modalOpenAdd } >添加管理员</Button> </div>
    	<div  style={{marginTop: '10px'}}>
	    	<Table loading={ loading }  columns={ columns } dataSource={ list } pagination={ pagination } />
	    </div>
	    { modal.visiable && <AdminModal close={ modalClose } ok={ adminInfoUpdate }  item = { modal } visiable={ modal.visiable }/> }
    </div>
  );
}

function mapStateToProps(state) {
  const { total, list, current, pageSize, modal, } = state.admins
  return {
  	loading: state.loading.models.admins,
  	total,
  	list,
  	current,
  	pageSize,
  	modal,
  };
}

export default connect(mapStateToProps)(Form.create()(Admins));
