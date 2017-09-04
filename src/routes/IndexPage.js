import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { Link } from 'dva/router'
import { Layout, Menu, Breadcrumb, Icon, Avatar, Button, Popconfirm  } from 'antd';
import { browserHistory } from 'dva/router';
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
	    	current: '1',
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
	
	
	render() {
		const minHeight = document.documentElement.clientHeight - 64;
		
	    return (
		    <Layout>
			    <Header className="header">
			      <div className={styles.logo} />
			      <div className="fr">
			    	<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
			    	<Popconfirm title="确认退出系统" okText="退出" cancelText="取消" onConfirm={ this.logout }>
						<Button type="primary" shape="circle" icon="logout" />
					</Popconfirm>
			      </div>
			    </Header>
			    <Layout>
			      <Sider width={ 200 } style={{ background: '#fff' }}>
			        <Menu
			          mode="inline"
			          selectedKeys={[this.state.current]}
			          onOpenChange={this.onOpenChange}
			          onClick={this.handleClick}
			          defaultOpenKeys={['sub1']}
			          openKeys={this.state.openKeys}
			          style={{ height: '100%', borderRight: 0 }}
			        >
			          <SubMenu key="sub1" title={<span><Icon type="red-envelope" />收款管理</span>}>
			            <Menu.Item key="1"><Link to="/gathered">已收款</Link></Menu.Item>
			            <Menu.Item key="2">代收款</Menu.Item>
			            <Menu.Item key="3">明细</Menu.Item>
			            <Menu.Item key="4">回收站</Menu.Item>
			          </SubMenu>
			          <SubMenu key="sub2" title={<span><Icon type="team" />商户管理</span>}>
			            <Menu.Item key="5">商户列表</Menu.Item>
			            <Menu.Item key="6">会员关系</Menu.Item>
			            <Menu.Item key="7">添加商户</Menu.Item>
			            <Menu.Item key="8">会员列表</Menu.Item>
			          </SubMenu>
			          <SubMenu key="sub7" title={<span><Icon type="wallet" />提现管理</span>}>
			          	<Menu.Item key="26"><Link to="/news/list">提现申请</Link></Menu.Item>
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
			            <Menu.Item key="13"><Link to="/raise">发布理财</Link></Menu.Item>
			            <Menu.Item key="14"><Link to="/raise">已发布理财</Link></Menu.Item>
			            <Menu.Item key="15"><Link to="/experience">资金明细</Link></Menu.Item>
			            <Menu.Item key="16"><Link to="/raise">理财统计</Link></Menu.Item>
			          </SubMenu>
			          <SubMenu key="sub5" title={<span><Icon type="notification" />新闻管理</span>}>
			            <Menu.Item key="17"><Link to="/news/add">发布新闻</Link></Menu.Item>
			            <Menu.Item key="18"><Link to="/news/list">新闻列表</Link></Menu.Item>
			            <Menu.Item key="19"><Link to="/experience">短信群发</Link></Menu.Item>
			            <Menu.Item key="20"><Link to="/raise">滚动新闻</Link></Menu.Item>
			            <Menu.Item key="21"><Link to="/raise">移动推送</Link></Menu.Item>
			          </SubMenu>
			          <SubMenu key="sub6" title={<span><Icon type="setting" />系统设置</span>}>
			            <Menu.Item key="22"><Link to="/news/add">网站设置</Link></Menu.Item>
			            <Menu.Item key="23"><Link to="/news/list">APP首页产品设置</Link></Menu.Item>
			            <Menu.Item key="24"><Link to="/experience">Banner设置</Link></Menu.Item>
			            <Menu.Item key="25"><Link to="/raise">其他设置</Link></Menu.Item>
			          </SubMenu>
			        </Menu>
			      </Sider>
			      <Layout style={{ padding: '12px 12px', minHeight: minHeight }}>
			        <Content style={{ background: '#fff', padding: 12, margin: 0, minHeight: 780 }}>
			          {this.props.children}
			        </Content>
			      </Layout>
			    </Layout>
			</Layout>
		  );
	  }
}

function mapStateToProps(state) {
	const { token } = state.main;
	return {
	  	token: token,
	};
}

IndexPage.propTypes = {
	
};

export default connect(mapStateToProps)(IndexPage);
