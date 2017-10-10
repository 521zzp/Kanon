import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'dva';
import { Form, Input, Button, Select, Table, Modal,  } from 'antd';
import styles from './UserList.less';
import config from '../../config/config.json'
import { PHONE, IDCARD } from '../../utils/regx'
import UserDetailsModal from '../../components/user/userList/UserDetailsModal'


const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;

class UserList extends Component {
	
	constructor (props) {
   		super(props)
	    this.state = { 
	    	current: 1,
	    }
	}
	
	//搜索
	handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ current: 1  })
        this.props.dispatch({
		      type: 'userList/getTotal',
		      payload: values,
		    });
      }
    });
  }
	
	columns = [
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
		  title: '操作',
		  key: 'action',
		  render: (text, record) => (
		    <Button type="primary" onClick={ () => {
			    	this.props.dispatch({
				      type: 'userList/getDetails',
				      payload: { account: text.account },
				    });
		    	}  }>
		    	更多
		    </Button>
		  ),
		}
	];
	
	close = () => {
		this.props.dispatch({
	      type: 'userList/update',
	      payload: { modalVisiable: false },
	    });
	}
	
	editUser = (values) => {
		const dispatch = this.props.dispatch
		confirm({
		    title: '警告！',
		    content: '确认更新该用户信息?',
		    okText: '确认',
		    cancelText: '取消',
		    onOk() {
		      dispatch({
			      type: 'userList/editSave',
			      payload: values,
			    });
		    },
		});
	}
	

	
	render () {
		const { getFieldDecorator, } = this.props.form;
		const pagination = {
			current: this.state.current, 
			total: this.props.total,
			pageSize: this.props.pageSize,
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
	      <div>
		    	<Form layout="inline" >
		    			<div>
		    				<FormItem label="用户手机号" className= { styles['form-item'] }> 
				          {getFieldDecorator('account', {
				            rules: [
					            {	pattern: PHONE, message: '手机号码格式不正确！', }, 
				            ],
				          })(
				            <Input />
				          )}
				        </FormItem>
				        
				        <FormItem label="姓名" className= { styles['form-item'] }>
				          {getFieldDecorator('name')(
				            <Input />
				          )}
				        </FormItem>
				        
				        <FormItem label="身份证号" className= { styles['form-item'] }>
				          {getFieldDecorator('idCard', {
				            rules: [
					            {	pattern: IDCARD, message: '身份证号码格式不正确！', }, 
				            ],
				          })(
				            <Input />
				          )}
				        </FormItem>
				        
		    			</div>
		    			
			        <div>
			        	<FormItem label="商户筛选" className= { styles['form-item'] }>
				          {getFieldDecorator('ispublic')(
				            <Select placeholder="请选择"  style={{width: '100px'}}> 
				              <Option value="">请选择</Option>
				              <Option value="0">公共商户</Option>
				              <Option value="1">非公共商户</Option>
				            </Select>
				          )}
				        </FormItem>
			    			
			    			<FormItem label="用户级别" className= { styles['form-item'] }>
				          {getFieldDecorator('level')(
				            <Select placeholder="请选择"  style={{width: '100px'}}> 
				              <Option value="">请选择</Option>
				              { config.userLevel.map((item) =>  <Option key={item.value} value={item.value.toString()}>{item.key}</Option>) }
				            </Select>
				          )}
				        </FormItem>
			        	<FormItem label="可用余额" className= { styles['form-item'] }>
				          {getFieldDecorator('balance')(
				            <Select placeholder="请选择"  style={{width: '100px'}}> 
				              <Option value="">请选择</Option>
				              <Option value="0">无余额</Option>
				              <Option value="1">有余额</Option>
				            </Select>
				          )}
				        </FormItem>
				        
				        <FormItem label="分润余额" className= { styles['form-item'] }>
				          {getFieldDecorator('fenrun')(
				            <Select placeholder="请选择"  style={{width: '100px'}}> 
				              <Option value="">请选择</Option>
				              <Option value="0">无余额</Option>
				              <Option value="1">有余额</Option>
				            </Select>
				          )}
				        </FormItem>
				        
				        <FormItem label="冻结余额" className= { styles['form-item'] }>
				          {getFieldDecorator('freeze')(
				            <Select placeholder="请选择"  style={{width: '100px'}}> 
				              <Option value="">请选择</Option>
				              <Option value="0">无余额</Option>
				              <Option value="1">有余额</Option>
				            </Select>
				          )}
				        </FormItem>
				        
				        <FormItem  label="认证" className= { styles['form-item'] }>
				          {getFieldDecorator('authentication')(
				            <Select placeholder="请选择"  style={{width: '100px'}}> 
				              <Option value="">请选择</Option>
				              <Option value="0">未认证</Option>
				              <Option value="1">已认证</Option>
				            </Select>
				          )}
				        </FormItem>
				        <FormItem>
				          <Button className= { styles['form-item'] }
				            type="primary"
				            icon="search"
				            htmlType="button"
				            loading={ this.props.searching }
				            onClick={ this.handleSubmit }
				          >搜索
				          </Button>
				        </FormItem>
			        </div>
			        
			    </Form>
	    	</div>
	    	
	    	<div  style={{marginTop: '10px'}}>
	    		<Table loading={ this.props.loading }  columns={ this.columns } dataSource={ this.props.list } pagination={ pagination } />
	    	</div>
	    	
	    	{ this.props.modalVisiable && 
	    		<UserDetailsModal 
	    		visiable = { this.props.modalVisiable } 
	    		item = { this.props.modalItem }
	    		close = { this.close } 
	    		ok = { this.editUser }
	    		updateLoading = { this.props.updateLoading }
	    		/> }
	    	
	    	
	    </div>
		)
	}
}

function mapStateToProps(state) {
  const { total, list, pageSize, searching, modalVisiable, modalItem, updateLoading } = state.userList;
  return {
  	loading: state.loading.models.userList,
  	total,
  	list, 
  	pageSize,
  	searching,
  	modalVisiable,
  	modalItem,
  	updateLoading,
  };
}

UserList.propTypes = {
  form: PropTypes.object,
}


export default connect(mapStateToProps)(Form.create()(UserList));
