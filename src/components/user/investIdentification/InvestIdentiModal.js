import React from 'react';
import styles from './InvestIdentiModal.css';
import { Modal, Table } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars';

function InvestIdentiModal({
	visiable,
	close,
	list
}) {
	
	const columns = [
		{
		  title: '投资标的',
		  dataIndex: 'product',
		  key: 'product',
		},
		{
		  title: '投资金额',
		  dataIndex: 'money',
		  key: 'money',
		},
		{
		  title: '投资时间',
		  dataIndex: 'time',
		  key: 'time',
		},
		{
		  title: '是否过期',
		  dataIndex: 'status',
		  key: 'status',
		  render: (text, record) => text ? <span style={{color: 'yellowgreen'}}>持有中</span> : <span style={{color: 'red'}}>已过期</span>
		}
	];
	
	
	const www = [
		{
			product: '4asfasfg',
			money: 15415,
			time: '2017-03-12',
			status: 1,
			key: 1,
		},
		{
			product: '4asfasfg',
			money: 15415,
			time: '2017-03-12',
			status: 1,
			key: 2,
		},
		{
			product: '4asfasfg',
			money: 15415,
			time: '2017-03-12',
			status: 0,
			key: 3,
		},
		{
			product: '4asfasfg',
			money: 15415,
			time: '2017-03-12',
			status: 0,
			key: 4,
		},
		{
			product: '4asfasfg',
			money: 15415,
			time: '2017-03-12',
			status: 1,
			key: 5,
		},
		{
			product: '4asfasfg',
			money: 15415,
			time: '2017-03-12',
			status: 1,
			key: 6,
		},
		{
			product: '4asfasfg',
			money: 15415,
			time: '2017-03-12',
			status: 1,
			key: 7,
		},
		{
			product: '4asfasfg',
			money: 15415,
			time: '2017-03-12',
			status: 1,
			key: 8,
		},
		{
			product: '4asfasfg',
			money: 15415,
			time: '2017-03-12',
			status: 1,
			key: 9,
		},
		{
			product: '4asfasfg',
			money: 15415,
			time: '2017-03-12',
			status: 1,
			key: 10,
		},
	]
	
	
  return (
    	<Modal title="投资情况" 
          visible={ visiable }
          onOk={ () => close() }
          onCancel={ () => close() }
          okText='保存'
        >
        <Scrollbars style={{ width: '100%', height: '400px', paddingRight: '30px' }} 
        >
	    		<Table   columns={ columns } dataSource={ list } pagination={ false } />
			 	</Scrollbars> 
       		
      </Modal>
  );
}

export default InvestIdentiModal;
