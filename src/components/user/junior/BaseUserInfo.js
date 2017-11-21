import React from 'react';
import { Card, Table } from 'antd';
import styles from './BaseUserInfo.css';

function BaseUserInfo() {
	
	const columns = [
		{
		  title: '用户等级',
		  dataIndex: 'level',
		  key: 'level',
		},
		{
		  title: '账号',
		  dataIndex: 'account',
		  key: 'account',
		},
		{
		  title: '真实姓名',
		  dataIndex: 'name',
		  key: 'name',
		},
		{
		  title: '身份证号',
		  dataIndex: 'idCard',
		  key: 'idCard',
		},
		{
		  title: '注册途径',
		  dataIndex: 'port',
		  key: 'port',
		},
		{
		  title: '注册时间',
		  dataIndex: 'registerTime',
		  key: 'registerTime',
		},
		{
		  title: '可用余额',
		  dataIndex: 'balance',
		  key: 'balance',
		},
		{
		  title: '分润余额',
		  dataIndex: 'fenrun',
		  key: 'fenrun',
		},
		{
		  title: '冻结余额',
		  dataIndex: 'freeze',
		  key: 'freeze',
		},
		{
		  title: '当前持标下级数',
		  dataIndex: 'junior',
		  key: 'junior',
		},
		{
		  title: '当前持有总额',
		  dataIndex: 'juniorMoney',
		  key: 'juniorMoney',
		},
	]
	
	const mockDatas = [
		{
			level: '高级VIP',
			account: '15773270836',
			name: '一方通行',
			idCard: 'asfgasg',
			port: 'H5',
			registerTime: '2017-05-12',
			balance: 4154515,
			fenrun: 545,
			freeze: 4854,
			junior: 125,
			juniorMoney: 565646545,
			id: 'safagfasg'
		}
	]
	
	
	
  return (
    <Card bordered={ false } style={{marginTop: '10px'}} title='用户信息' >
    	<Table columns={ columns } dataSource={ mockDatas } rowKey={record => record.id} pagination= { false } />
    </Card>
  );
}

export default BaseUserInfo;
