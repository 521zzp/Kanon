import React from 'react';
import PropTypes from 'prop-types'
import { Form, Input, Modal, Select, InputNumber, Row, Col, Switch, Collapse, DatePicker   } from 'antd'
import QueueAnim from 'rc-queue-anim';
import Editor from '../../common/Editor';


import styles from './ProductModal.css';

const FormItem = Form.Item;
const Panel = Collapse.Panel;
const Option = Select.Option;
const { RangePicker } = DatePicker;


const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}

const formItemLayoutTwo = {
	labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
}

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

function ProductModal({
	item = {},
	productTypes,
	visiable,
	productTypeChange,
	productRateChange,
	close,
	form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    getFieldsError, getFieldError, isFieldTouched,validateFields
  }
}) {
	
	const handleCancel = () => {
    console.log('Clicked cancel button');
    close()
  }
	
	const handleOk = () => {
		console.log('ok')
	}
	
	const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        dispatch({
		      type: 'gathered/getTotal',
		      payload: values,
		    });
      }
    });
  }
	
	const modalClose = () => console.log('close')
	
	const editorConfig = {
		editorStyle: {
	    minHeight: 200,
	  }
	}
	
	const loanEnterpriseChange = (text) => {
		console.log(text)
	}
	
  return (
    <div className={styles.normal}>
      <Modal title={ item.modalTitle } afterClose={ modalClose }
          visible={ visiable }
          onOk={ handleSubmit }
          confirmLoading={false}
          onCancel={handleCancel}
          width= { 750 }
        >
        <Form>
        	<Row>
        		<Col span={ 12 }>
        			<FormItem label="产品类别：" hasFeedback {...formItemLayout}>
			          {getFieldDecorator('type', {
			          	 rules: [{ required: true, message: '请选择产品类型！' }],
			          })(
							     	<Select placeholder="请选择产品类型"  onChange={ productTypeChange }>
								       { productTypes.map( item => <Select.Option value={`${item.type}`} key={`${item.type}`}>{item.name}</Select.Option>)}
								    </Select>
			          )}
			        </FormItem>
        		</Col>
        		<Col span={ 12 }>
        			<FormItem label="产品标题：" hasFeedback { ...formItemLayout} >
			          {getFieldDecorator('name', {
			          	initialValue: item.name,
			            rules: [{ required: true, message: '产品标题不能为空！'  }],
			          })(
							     	<Input  placeholder="请不要填写已发布的产品名称" />
			          )}
			        </FormItem>
        		</Col>
        	</Row>
        	
        	<Row>
        		<Col span={ 7 } offset={ 1 }>
        			<FormItem label="产品利率" hasFeedback {...formItemLayoutTwo} >
			          {getFieldDecorator('rate', {
			          	initialValue: item.rate,
			          	rules: [{ required: true, message: '产品利率不能为空！' }],
			          })(
			            <InputNumber min={ 0 } step={ 0.00001 } onChange={ productRateChange }  placeholder="请填写产品利率（日）" style={{ width: '100%'}}/>
			          )}
			        </FormItem>
        		</Col>
        		<Col span={ 4 }>
        			<span className={ styles['year-rate'] }>
        				{ item.rate === undefined ? '0%' : (typeof item.rate === 'number' ? (item.rate * 365 * 100).toFixed(2) + '%' : 
        					(parseFloat(item.rate) * 365 * 100).toFixed(2) + '%')
        					 }
        			(年)</span>
        		</Col>
        		<Col span={ 12 }>
        			<FormItem label="资金上限：" hasFeedback {...formItemLayout}>
			          {getFieldDecorator('limit', {
			          	initialValue: item.limit,
			            rules: [{ required: true, message: '资金上限不能为空！' }],
			          })(
							     	<InputNumber min={ 0 }  placeholder="最多可融资多少金额(单位:万元)" style={{ width: '100%'}}/>
			          )}
			        </FormItem>
        		</Col>
        	</Row>
        		
        	<Row>
        		<Col span={ 12 }>
        			<FormItem label="起投金额：" hasFeedback {...formItemLayout}>
			          {getFieldDecorator('startMoney', {
			          	initialValue: item.startMoney,
			            rules: [{ required: true, message: '起投金额不能为空！' }],
			          })(
							     	<InputNumber min={ 0 }  step={ 1000 }  placeholder="填写整数即可(单位:元)" style={{ width: '100%'}} />
			          )}
			        </FormItem>
        		</Col>
        		<Col span={ 12 }>
        			<FormItem label="产品期限：" hasFeedback {...formItemLayout}>
			          {getFieldDecorator('term', {
			          	initialValue: item.term,
			            rules: [{ required: true, message: '产品期限不能为空！' }],
			          })(
							     	<InputNumber min={ 0 } placeholder="产品到期周期(单位:天)" style={{ width: '100%'}}/>
			          )}
			        </FormItem>
        		</Col>
        	</Row>
        	
        	<Row>
        		<Col span={ 12 }>
        			<FormItem label="系统投资：" hasFeedback {...formItemLayout}>
			          {getFieldDecorator('systemInvest', {
			          	initialValue: item.systemInvest,
			             rules: [{ required: true, message: '系统投资不能为空！' }],
			          })(
			            <InputNumber min={ 0 }   placeholder="系统投入资金不发放收益(单位:万元)" style={{ width: '100%'}} />
			          )}
			        </FormItem>
        		</Col>
        		<Col span={ 12 }>
        			<FormItem label="发息周期：" hasFeedback {...formItemLayout}>
			          {getFieldDecorator('grantTerm', {
			          	initialValue: item.grantTerm,
			             rules: [{ required: true, message: '发息周期不能为空！' }],
			          })(
			            <InputNumber min={ 0 }   placeholder="多少天发一次利息(单位:天)不可修改！" style={{ width: '100%'}} />
			          )}
			        </FormItem>
        		</Col>
        	</Row>
        	
        	
        	<Row>
        		<Col span={ 12 }>
        			<FormItem label="产品状态" {...formItemLayout}>
			          {getFieldDecorator('status', {
			             valuePropName: 'checked',
			             initialValue: item.status === 0,
			          })(
			          	<Switch checkedChildren="上架" unCheckedChildren="下架"/>
			          )}
			        </FormItem>
        		</Col>
        		<Col span={ 12 }>
        			<FormItem label="还款方式：" hasFeedback {...formItemLayout}>
			          {getFieldDecorator('repaymentWay', {
			          	initialValue: item.repaymentWay,
			          	rules: [{ required: true, message: '还款方式不能为空！' }],
			          })(
			            <Input placeholder="请填写还款方式" />
			          )}
			        </FormItem>
        		</Col>
        	</Row>
        	
        	<Row>
        		<Col span={ 12 }>
        			<FormItem label="收益起始日：" hasFeedback {...formItemLayout}>
			          {getFieldDecorator('startProfitDay', {
			          	initialValue: item.startProfitDay,
			             rules: [{ required: true, message: '受益起始日不能为空！' }],
			          })(
			            <Input placeholder="T+输入的数字" />
			          )}
			        </FormItem>
        		</Col>
        		<Col span={ 12 }>
        			{
        				item.type == 3 && <FormItem label="预售时间：" hasFeedback {...formItemLayout}>
				          {getFieldDecorator('preSaleTime', {
				          	initialValue: item.preSaleTime,
				            rules: [{ required: true, message: '请选择预售时间！' }],
				          })(
				            <DatePicker  placeholder="请选择预售时间" style={{ width: '100%'}}/>
				          )}
				        </FormItem> 
        			} 
        			{
        				item.type == 2 && <FormItem label="销售时间：" hasFeedback {...formItemLayout}>
				          {getFieldDecorator('saleTimeRange', {
				          	initialValue: item.saleTimeRange,
				            rules: [{ required: true, message: '请选择销售时间！' }],
				          })(
				            <RangePicker  />
				          )}
				        </FormItem>
        				
        			}
        		</Col>
        	</Row>
        	
        
        	
        	<Row>
        		<Col span={ 22 } offset={ 1 } >
        			<Collapse>
						    <Panel  header="借款企业信息：" key="1">
						      <Editor change= { loanEnterpriseChange } config={ editorConfig } />
						    </Panel>
						    <Panel header="安全保障：" key="2">
						      <Editor change= { loanEnterpriseChange } config={ editorConfig } />
						    </Panel>
						    <Panel header="回款计划：" key="3">
						      <Editor change= { loanEnterpriseChange } config={ editorConfig } />
						    </Panel>
						  </Collapse>
        		</Col>
        	</Row>
		        
	      </Form>
      </Modal>
    </div>
  );
}

export default Form.create()(ProductModal);
