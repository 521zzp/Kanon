import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'dva';
import { Link  } from 'dva/router';
import styles from './Login.less';
import classnames from 'classnames'
import { RainyDay } from '../utils/rainyday'


import { Row, Col, Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
let engine = null

class Login extends Component {

	constructor(props) {
		super(props)
	}

	componentDidMount () {
		console.log('componentDidMount')
		
		console.log(RainyDay)
		console.log(document.getElementById('image'))
		
		
		setTimeout(function () {
			engine = new RainyDay({
	            image: document.getElementById('image'),
	            parentElement: document.getElementById('image').parentNode
	        });
	        
	       engine.rain([ [3, 2, 2] ], 100);
		}, 100)
		
	}

	componentWillUnmount () {
		//组件卸载清除canvas
		console.log('componentWillUnmount')
		let canvas = document.getElementsByTagName('canvas')[0]
		canvas.parentNode.removeChild(canvas)

	}

    handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	        console.log('Received values of form: ', values);
	        this.props.dispatch({
		      type: 'login/login',
		      payload: values,
		    });
	      }
	    });
	  }

	render () {
		const { getFieldDecorator } = this.props.form;
	
		// classnames 结合  less 结合  css modules
		const  cls  = classnames({
			[styles.title]: false,
			[styles['title-two']]: true,
		})

		return (
			    <div className={styles.normal}>
				    <div>
				    	<img  alt="background" src={require('../assets/login/3.jpg')} 
				    	id="image" className={styles['bg-img']}/>
				    </div>
				    <div className={styles.form}>
				    	<Row>
					      <Col span={4} offset={10}>
					    		<div className={styles['form-wrap']}>
					    			<span className={ styles.title }>掌柜金服管理员系统</span><br/>
						    		<Form onSubmit={this.handleSubmit} className="login-form">
								        <FormItem>
								          {getFieldDecorator('account', {
								            rules: [
								            	{ required: true, message: '用户名不能为空!' },
								            ],
								          })(
								            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="账号" />
								          )}
								        </FormItem>
								        <FormItem>
								          {getFieldDecorator('password', {
								            rules: [{ required: true, message: '密码不能为空!' }],
								          })(
								            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
								          )}
								        </FormItem>
								        <FormItem>
								          <div>
								          	 <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
									            登录
									          </Button>
								          </div>
								        </FormItem>
								    </Form>
					    		</div>
					      </Col>
					    </Row>
				    </div>
				    
			    </div>
			  );
	}
}

function mapStateToProps() {
  return {};
}

Login.propTypes = {
  form: PropTypes.object,
}


export default connect(mapStateToProps)(Form.create()(Login));
