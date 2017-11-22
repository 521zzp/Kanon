import React, { Component } from 'react';
import { Card, Form, Select, Radio, Button  } from 'antd';
import styles from './BaseTotalJunior.css';
import CountUp from 'react-countup';


const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

function BaseTotalJunior({
	search,
	datas,
	form: {
		getFieldDecorator, getFieldsValue, validateFields
	}
}) {
	
	const gridStyle = {
	  textAlign: 'center',
	};
	
	const hasErrors = (value) => {
		return !(value.type === 2)
	}
	
	const handleSubmit = (e) => {
    e.preventDefault();
   	validateFields((err, values) => {
      if (!err) {
        if (values.type === 1) {
        	search({})
        } else{
        	search({ year: values.year })
        }
      }
    });
  }
	
  return (
    <Card bordered={ false } style={{marginTop: '10px'}} title="下级商户累计数据">
    	<Form layout="inline" style={{ marginBottom: '10px' }}>
	  		<FormItem> 
	          {getFieldDecorator('type', {
	            initialValue: 1
	          })(
	            <RadioGroup >
			        <Radio value={1}>全部</Radio>
			        <Radio value={2}>按年查询</Radio>
			    </RadioGroup>
	          )}
	        </FormItem>
	        <FormItem > 
	          {getFieldDecorator('year', {
	            initialValue: '2017'
	          })(
	            <Select style={{ width: 100 }} disabled={hasErrors(getFieldsValue())} >
						    <Option value="2017">2017</Option>
						    <Option value="2018">2018</Option>
						    <Option value="2019">2019</Option>
						    <Option value="2020">2020</Option>
						    <Option value="2021">2021</Option>
						  </Select>
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
    	<Card.Grid style={gridStyle}>
	    	<div>已注册总人数（人）</div>
	    	<span className={ styles.value }>
	    		<CountUp
	            start={0}
	            end={ datas.registerTotal ? datas.registerTotal : 0 }
	            duration={2.75}
	            useEasing
	            useGrouping
	            separator=","
	        />
	    	</span>
	    </Card.Grid>
	    <Card.Grid style={gridStyle}>
	    	<div>累计投资人数（人）</div>
	    	<span className={ styles.value }>
	    		<CountUp
	            start={0}
	            end={ datas.investPeople ? datas.investPeople : 0 }
	            duration={2.75}
	            useEasing
	            useGrouping
	            separator=","
	        />
	    	</span>
	    </Card.Grid>
	    <Card.Grid style={gridStyle}>
	    	<div>累计投资金额（元）</div>
	    	<span className={ styles.value }>
	    		<CountUp
	            start={0}
	            end={ datas.investMoney ? datas.investMoney : 0 }
	            duration={2.75}
	            useEasing
	            useGrouping
	            separator=","
	        />
	    	</span>
	    </Card.Grid>
    </Card>
  );
}

export default Form.create()(BaseTotalJunior);
