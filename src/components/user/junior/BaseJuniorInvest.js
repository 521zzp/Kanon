import React from 'react';
import { Card, Form, DatePicker, Button, Col, Row, Table } from 'antd';
import styles from './BaseJuniorInvest.css';

const { MonthPicker } = DatePicker;
const FormItem = Form.Item;


function BaseJuniorInvest({
	search,
	datas,
	form: {
		getFieldDecorator,
		getFieldsValue,
		validateFields,
	}
}) {
	
	
	const columns = [
		{
		  title: '标的类型',
		  dataIndex: 'type',
		  key: 'type',
		},
		{
		  title: '新增投资人数',
		  dataIndex: 'peoples',
		  key: 'peoples',
		},
		{
		  title: '投资总金额（元）',
		  dataIndex: 'money',
		  key: 'money',
		},
	]
	
	const mockData = [
		{
			type: '1个月',
			peoples: 15,
			money: 52000,
			key: 1, 
		},
		{
			type: '3个月',
			peoples: 75,
			money: 278288,
			key: 2, 
		},
		{
			type: '6个月',
			peoples: 55,
			money: 78527,
			key: 3, 
		},
		{
			type: '12个月',
			peoples: 74,
			money: 45242,
			key: 4, 
		},
	]
	
	const handleSubmit = (e) => {
	    e.preventDefault();
	   	validateFields((err, values) => {
	      if (!err) {
	      	const time = values['time']
	      	console.log(time.format('YYYY-MM'))
	      	search({
	      		time: time.format('YYYY-MM')
	      	})
	      }
	    });
	  }
	
  return (
    <Card bordered={ false } style={{marginTop: '10px'}} title="下级商户投资数据" >
    	<Form layout="inline" style={{ marginBottom: '10px' }}>
	  		<FormItem> 
	          {getFieldDecorator('time', {
	          	rules: [
		            {	required: true, message: '请选择查询日期！', }, 
	            ],
	          })(
	            <MonthPicker  format={ 'YYYY-MM' } />
	          )}
	        </FormItem>
	        <FormItem>
	          <Button
	            type="primary"
	            htmlType="submit"
	            onClick={ handleSubmit }
	          >
	          	查询
	          </Button>
	        </FormItem>
	  	</Form>
	  	
	  	<div className={ styles['count-wrap'] }>
	  		<span>
	  			<span >新增注册人数:</span>
	  			<span className={ styles.title }>{ datas.newRegisters }</span>
	  		</span>
	  		<span style={{ marginLeft: '20px' }}>
	  			<span >新增总投资人数:</span>
	  			<span className={ styles.title }>{ datas.newInvestPeoples }</span>
	  		</span>
	  	</div>
	  	<Row gutter={24} style={{ marginTop: '10px' }}>
	      <Col  span={12}>
	      	<div className={ styles['table-title'] }>三级内商户（含3级）</div>
	      	<Table columns={ columns } dataSource={ datas.innerThree } pagination={ false }/>
	      </Col>
	      <Col  span={12}>
	      	<div className={ styles['table-title'] }>三级外商户</div>
	      	<Table columns={ columns } dataSource={ datas.outerThree } pagination={ false }/>
	      </Col>
	    </Row>
    </Card>
  );
}

export default Form.create()(BaseJuniorInvest);
