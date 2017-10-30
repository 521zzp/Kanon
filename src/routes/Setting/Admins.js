import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Button, Form, Table, } from 'antd';
import DropOption from '../../components/common/DropOption';
import styles from './Admins.css';


const FormItem = Form.Item

function Admins({
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
		},
		{
			title: '权限设置',
		  key: 'power',
		  render: (text, record) => (
		  	<Link to="/power">查看&设置</Link>
		  ),
		},
		{
		  title: '操作',
		  key: 'action',
		  render: (text, record) => <DropOption 
		  		onMenuClick={e => handleMenuClick(record, e)} 
		  		menuOptions={[
		  			{ key: 'edit', name: '编辑账号' }, 
		  			status == 0 ? { key: 'off', name: '激活账号' } : { key: 'on', name: '锁定账号' }, 
		  			{ key: 'delete', name: '删除账号' },
		  		]} />
		},
	]
		
	const datas = [
		{
			account: 'sysadmin',
			status: '正常'
		}
	]
	
	const pagination = {
			current: 1, 
			total: 50,
			pageSize: 10,
			onChange: (page, pageSize) => {
				this.setState({ current: page  })
				this.props.dispatch({
		      type: 'userList/getList',
		      payload: page,
		    });
			}
		}
	
	
	
	
	
  return (
    <div className={styles.normal}>
    	<div><Button type="primary" icon="plus" htmlType="button" >添加管理员</Button> </div>
    	<div  style={{marginTop: '10px'}}>
	    		<Table  columns={ columns } dataSource={ datas } pagination={ pagination } />
	    	</div>
    </div>
  );
}

function mapStateToProps() {
  return {
  	
  };
}

export default connect(mapStateToProps)(Form.create()(Admins));
