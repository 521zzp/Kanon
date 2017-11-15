import React from 'react';
import { connect } from 'dva';
import { Table, Modal, Card } from 'antd';
import styles from './MerchantRegister.css';
import ParamsFilter from '../../components/check/promoteRegister/ParamsFilter'
import CheckImgModal from '../../components/check/promoteRegister/CheckImgModal'
import DropOption from '../../components/common/DropOption'
import config from '../../config/config.json'

const confirm = Modal.confirm;

function MerchantRegister({
	dispatch,
	total,
	list,
	current,
	pageSize,
	loading,
	params,
	modalVisiable,
	modalImgs,
}) {
	
	const columns = [
		{
		  title: '申请用户账号',
		  dataIndex: 'account',
		  key: 'account',
		},
		{
		  title: '申请时间',
		  dataIndex: 'time',
		  key: 'time',
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
		  title: '日营业额',
		  dataIndex: 'turnover',
		  key: 'turnover',
		},
		{
		  title: '负责人手机号',
		  dataIndex: 'fzrPhone',
		  key: 'fzrPhone',
		},
		{
		  title: '日人流量',
		  dataIndex: 'customers',
		  key: 'customers',
		},
		{
		  title: 'GPS位置',
		  dataIndex: 'gps',
		  key: 'gps',
		},
		{
		  title: '地理位置',
		  dataIndex: 'addr',
		  key: 'addr',
		},
		{
		  title: '状态',
		  dataIndex: 'status',
		  key: 'status',
		  render: (text, record) => {
		  	if (text === 2) {
		  		return <span style={{color: 'yellowgreen'}}>已通过</span>
		  	} else if (text === -1) {
		  		return <span style={{color: 'red'}}>未通过</span>
		  	} else {
		  		return <span>待审核</span>
		  	}
		  }
		},
		{
		  title: '操作',
		  key: 'action',
		  render: (text, record) => <div>
		 		<a  onClick={ 
		  		(e) => {
		  			dispatch({
				    	type: 'promoteRegister/checkImage',
				    	payload: { id: record.id, type: 1 }
			    	});
		  		}
		  	}>查看照片</a>
		  	<span className="ant-divider"/>
		  	<a  onClick={ 
		  		(e) => {
		  			dispatch({
				    	type: 'promoteRegister/checkImage',
				    	payload: { id: record.id, type: 2 }
			    	});
		  		}
		  	}>商户照片</a>
		  	{ record.status === 1 && <span className="ant-divider"/> }
		 		{ record.status === 1 && <DropOption 
		  		onMenuClick={e => handleMenuClick(record, e)} 
		  		menuOptions={[
		  			{ key: 'accept', name: '审核通过' }, 
		  			{ key: 'reject', name: '审核不通过' },
	  			]} /> }
		  </div>
		},
	]
	
	
	const handleMenuClick = (record, e) => {
		switch (e.key){
			case 'accept':
				confirm({
			    title: '通过确认！',
			    content: '确认通过该用户的审核？',
			    onOk() {
			      dispatch({
				    	type: 'promoteRegister/checkApply',
				    	payload: { id: record.id, check: true }
			    	});
			    },
			  });
				break;
			case 'reject':
				confirm({
			    title: '驳回确认！',
			    content: '确认驳回该用户的审核？',
			    onOk() {
			      dispatch({
				    	type: 'promoteRegister/checkApply',
				    	payload: { id: record.id, check: false }
			    	});
			    },
			  });
				break;
		}
	}
	
	const paramsChange = (params) => {
		dispatch({
	    	type: 'promoteRegister/paramsChange',
	    	payload: params,
    	});
	}
	
	const pagination = {
		current, 
		total,
		pageSize,
		onChange: (page, pageSize) => {
			dispatch({
		      type: 'promoteRegister/getList',
		      payload: page,
	    	});
		}
	}
	
	const close = () => {
		dispatch({
	      type: 'promoteRegister/update',
	      payload: { modalVisiable: false },
    	});
	}
	
	
  return (
    <div className={styles.normal}>
    	<Card bordered={ false }>
    		<ParamsFilter optionList={ config.promoteRegisterStatus } params={ params }
    			paramsChange = { paramsChange } />
    	</Card>
    	
    	<Card style={{marginTop: '10px', minHeight: 'calc(100vh - 180px)'}}>
    		<Table loading={ loading }  columns={ columns } dataSource={ list } pagination={ pagination } />
    	</Card>
    	
    	<CheckImgModal visiable={ modalVisiable } close={ close } list={ modalImgs }/>
    </div>
  );
}

function mapStateToProps(state) {
  const { total, list, current, pageSize, params, modalVisiable, modalImgs } = state.promoteRegister
  return {
  	loading: state.loading.models.promoteRegister,
  	total,
  	list,
  	current,
  	pageSize,
  	params,
  	modalVisiable,
  	modalImgs,
  };
}

export default connect(mapStateToProps)(MerchantRegister);
