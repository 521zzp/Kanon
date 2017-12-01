import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { Link } from 'dva/router'
import { Layout, Menu, Breadcrumb, Icon, Avatar, Button, Popconfirm, Switch  } from 'antd';
import { browserHistory } from 'dva/router';
import classnames from 'classnames'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

/*
 * 基本页面
 */
class IndexPage extends Component {
	
	constructor (props) {
   		super(props)
	    this.state = { 
	    	openKeys: [],
	    	current: '',
	    	theme: 'light',
	    }
	    console.log('indexpage init:')
	    console.log(this.props)
	    //未登录返回登录页面
	    if (this.props.token === '') { 
	    	browserHistory.push('/login')
	    }
	}
	
	handleClick = (e) => {
	    console.log('Clicked: ', e);
	    this.setState({ current: e.key });
	}
	onOpenChange = (openKeys) => {
	    const state = this.state;
	    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
	    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));
	
	    let nextOpenKeys = [];
	    if (latestOpenKey) {
	      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
	    }
	    if (latestCloseKey) {
	      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
	    }
	    this.setState({ openKeys: nextOpenKeys });
	}
	getAncestorKeys = (key) => {
	    const map = {
	     /* sub3: ['sub2'],*/ //二级菜单配置
	    };
	    return map[key] || [];
	}
	
	logout = () => {
		console.log('logout')
		this.props.dispatch({
			type: 'login/logout'
		})
	}
	
	themeChange = checked => checked ? this.setState({ ...this.state, theme: 'dark' }) : this.setState({ ...this.state, theme: 'light' })
	
	
	render() {
		
		const switchWrap = classnames({
			clearfix: true,
			[styles['switch-wrap']]: true,
		})
		
		const siderClass = classnames({
			[styles.sider]: true,
			[styles.dark]: this.state.theme === 'dark'
		})
		
		const navs = this.props.nav.map(
			(item, index) => {
				const children = item.children.map(
					(innerItem, innerIndex ) => {
						return <Menu.Item key={ '' + index +  innerIndex }><Link to={ innerItem.path }>{ innerItem.name }</Link></Menu.Item>
					}
				)
				return  <SubMenu key={ '' + index } title={<span><Icon type={item.icon} />{ item.name }</span>}>
							{ children }
				        </SubMenu>
				
			}
		)
		
		
	    return (
		    <Layout className={styles.main}>
			    <Layout>
			      <Sider width={ 200 } className={ siderClass }>
			      	<div className={ styles.logo }>
		          		<Link to="/" className={ styles['logo-link'] }>
		          			<img className={ styles['logo-img'] }  alt="LOGO" src={ require('../assets/common/logo.png') }/>
		          		</Link> 
			        </div>
			        <Menu className={styles.menu}
			          mode="inline"
			          theme={this.state.theme}
			          selectedKeys={[this.state.current]}
			          onOpenChange={this.onOpenChange}
			          onClick={this.handleClick}
			          openKeys={this.state.openKeys}
			          style={{ borderRight: 0 }}
			        >
						
					{ navs }
					
			        </Menu>
			        
			        <div className = { switchWrap } >
			        	<span>Switch Theme</span>
			        	<Switch checkedChildren="Dark" unCheckedChildren="Light" onChange={ this.themeChange }/>
			        </div>
			      </Sider>
			      <Layout style={{  height: '100vh',marginLeft: '200px',overflow: 'auto'}}>
			      	<Header className={styles.header}>
				      <div className="fr">
				    	<Avatar className={styles.face} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
				    	<Popconfirm title="确认退出系统" okText="退出" cancelText="取消" onConfirm={ this.logout }>
							<Button type="primary" shape="circle" icon="logout"/>
						</Popconfirm>
				      </div>
				    </Header>
			        <Content className={styles['content-wrap']}>
			          	{this.props.children}
			        </Content>
			      </Layout>
			    </Layout>
			</Layout>
		  );
	  }
}

function mapStateToProps(state) {
	const { token, nav } = state.main;
	return {
	  	token,
	  	nav,
	};
}

IndexPage.propTypes = {
	
};

export default connect(mapStateToProps)(IndexPage);

/*
<SubMenu key="sub2" title={<span><Icon type="team" />用户管理</span>}>
					    <Menu.Item key="5"><Link to="/users">用户列表</Link></Menu.Item>
					    <Menu.Item key="6"><Link to="/userRecords">用户记录</Link></Menu.Item>
					    <Menu.Item key="7"><Link to="/investIdentification">投资绑卡统计</Link></Menu.Item>
					    <Menu.Item key="sub2-7"><Link to="/junior">下级商户</Link></Menu.Item>
					    <Menu.Item key="8">会员列表</Menu.Item>
					  </SubMenu>
					  <SubMenu key="sub1" title={<span><Icon type="red-envelope" />收款管理</span>}>
					    <Menu.Item key="1"><Link to="/gathered">已收款</Link></Menu.Item>
					    <Menu.Item key="2">代收款</Menu.Item>
					    <Menu.Item key="3">明细</Menu.Item>
					    <Menu.Item key="4"><Link to="/">回收站</Link></Menu.Item>
					  </SubMenu>
					  <SubMenu key="sub7" title={<span><Icon type="wallet" />提现管理</span>}>
					  	<Menu.Item key="26"><Link to="/withdrawApply">提现申请</Link></Menu.Item>
					    <Menu.Item key="27"><Link to="/experience">等待支付</Link></Menu.Item>
					    <Menu.Item key="28"><Link to="/raise">提现明细</Link></Menu.Item>
					  </SubMenu>
					  <SubMenu key="sub3" title={<span><Icon type="global" />活动管理</span>}>
					    <Menu.Item key="9">抵用券</Menu.Item>
					    <Menu.Item key="10"><Link to="/raise">加息券</Link></Menu.Item>
					    <Menu.Item key="11"><Link to="/experience">体验金</Link></Menu.Item>
					    <Menu.Item key="12">红包</Menu.Item>
					  </SubMenu>
					  <SubMenu key="sub4" title={<span><Icon type="book" />理财产品</span>}>
					    <Menu.Item key="13"><Link to="/product">发布理财</Link></Menu.Item>
					    <Menu.Item key="14"><Link to="/raise">已发布理财</Link></Menu.Item>
					    <Menu.Item key="15"><Link to="/experience">资金明细</Link></Menu.Item>
					    <Menu.Item key="16"><Link to="/raise">理财统计</Link></Menu.Item>
					  </SubMenu>
					  <SubMenu key="sub9" title={<span><Icon type="shop" />商城管理</span>}>
					    <Menu.Item key="16"><Link to="/shop">商品列表</Link></Menu.Item>
					  </SubMenu>
					  <SubMenu key="sub5" title={<span><Icon type="notification" />新闻管理</span>}>
					    <Menu.Item key="17"><Link to="/news/add">发布新闻</Link></Menu.Item>
					    <Menu.Item key="18"><Link to="/news/list">新闻列表</Link></Menu.Item>
					    <Menu.Item key="19"><Link to="/experience">短信群发</Link></Menu.Item>
					    <Menu.Item key="20"><Link to="/raise">滚动新闻</Link></Menu.Item>
					    <Menu.Item key="21"><Link to="/raise">移动推送</Link></Menu.Item>
					  </SubMenu>
					   <SubMenu key="sub10" title={<span><Icon type="hourglass" />审核中心</span>}>
					    <Menu.Item key="31"><Link to="/promoteRegister">员工推广</Link></Menu.Item>
					    <Menu.Item key="32"><Link to="/merchantRegister">商户审核</Link></Menu.Item>
					  </SubMenu>
					  <SubMenu key="sub11" title={<span><Icon type="rocket" />异业推广</span>}>
					    <Menu.Item key="41"><Link to="/yunCaiTang">蕴才汤优惠券验证</Link></Menu.Item>
					  </SubMenu>
					  <SubMenu key="sub6" title={<span><Icon type="setting" />系统设置</span>}>
					    <Menu.Item key="22"><Link to="/news/add">网站设置</Link></Menu.Item>
					    <Menu.Item key="23"><Link to="/news/list">APP首页产品设置</Link></Menu.Item>
					    <Menu.Item key="24"><Link to="/experience">Banner设置</Link></Menu.Item>
					    <Menu.Item key="27"><Link to="/admins">管理员设置</Link></Menu.Item>
					    <Menu.Item key="25"><Link to="/raise">其他设置</Link></Menu.Item>
					  </SubMenu>
					  <SubMenu key="sub8" title={<span><Icon type="customer-service" />在线客服</span>}>
					    <Menu.Item key="31"><Link to="/onlineService">我的客服</Link></Menu.Item>
					  </SubMenu>*/