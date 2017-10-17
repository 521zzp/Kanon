import React from 'react';
import { connect } from 'dva';
import { Table,  } from 'antd';
import styles from './Coupon.css';

function Point({
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
		  title: '积分事件',
		  dataIndex: 'type',
		  key: 'type',
		},
		{
		  title: '时间',
		  dataIndex: 'time',
		  key: 'time',
		},
		{
		  title: '积分变化',
		  dataIndex: 'change',
		  key: 'change',
		},
	];
	
	const pagination = {
		current, 
		total,
		pageSize,
		onChange: (page, pageSize) => {
			dispatch({
		      type: 'userRecordsPoint/getList',
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
	const { total, current, list } = state.userRecordsPoint
	const { pageSize } = state.userRecords
	
	return {
		loading: state.loading.models.userRecordsPoint,
		total, 
		current, 
		list,
		pageSize,
	}
}

export default connect(mapStateToProps)(Point);

