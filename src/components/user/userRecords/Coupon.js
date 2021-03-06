import React from 'react';
import { connect } from 'dva';
import { Table,  } from 'antd';
import styles from './Coupon.css';

function Coupon({
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
		  title: '礼券类型',
		  dataIndex: 'type',
		  key: 'type',
		},
		{
		  title: '时间',
		  dataIndex: 'time',
		  key: 'time',
		},
		{
		  title: '额度',
		  dataIndex: 'value',
		  key: 'value',
		},
	];
	
	const pagination = {
		current, 
		total,
		pageSize,
		onChange: (page, pageSize) => {
			dispatch({
		      type: 'userRecordsCoupon/getList',
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

function mapStateToProps(
state) {
	const { total, current, list } = state.userRecordsCoupon
	const { pageSize } = state.userRecords
	
	return {
		loading: state.loading.models.userRecordsCoupon,
		total, 
		current, 
		list,
		pageSize,
	}
}

export default connect(mapStateToProps)(Coupon);

