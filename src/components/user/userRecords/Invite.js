import React from 'react';
import { connect } from 'dva';
import { Table,  } from 'antd';
import styles from './Coupon.css';

function Invite({
	dispatch,
	loading,
	total, 
	current, 
	list,
	pageSize,
}) {
	
  //列条目
	const columns = [
		{
		  title: '被邀请用户',
		  dataIndex: 'account',
		  key: 'account',
		},
		{
		  title: '时间',
		  dataIndex: 'time',
		  key: 'time',
		},
		{
		  title: '被邀请用户VIP等级',
		  dataIndex: 'level',
		  key: 'level',
		},
	];
	
	const pagination = {
		current, 
		total,
		pageSize,
		onChange: (page, pageSize) => {
			dispatch({
		      type: 'userRecordsInvite/getList',
		      payload: page,
		    });
		}
	}
	
  return (
    <div className={styles.normal}>
      <Table loading={ loading }  columns={ columns } dataSource={ list } pagination={ pagination } />
    </div>
  );
}

function mapStateToProps(state) {
	const { total, current, list } = state.userRecordsInvite
	const { pageSize } = state.userRecords
	
	return {
		loading: state.loading.models.userRecordsInvite,
		total, 
		current, 
		list,
		pageSize,
	}
}

export default connect(mapStateToProps)(Invite);

