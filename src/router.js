import React from 'react';
import { Router, Route } from 'dva/router';
import PropTypes from 'prop-types'
import IndexPage from './routes/IndexPage';

import Login from "./routes/Login.js";
import Gathered from "./routes/Gathering/Gathered.js";

//用户管理
import UserList from "./routes/User/UserList.js"; //用户列表
import UserRecords from "./routes/User/UserRecords.js"; //用户列表


//礼券管理
import Experience from "./routes/Coupon/Experience.js"; //体验金
import Raise from "./routes/Coupon/Raise.js"; //加息券

//新闻管理
import AddNews from "./routes/News/AddNews.js"; //添加新闻
import NewsList from "./routes/News/NewsList.js"; //新闻列表

//理财产品
import Product from './routes/Financing/Product.js' //理财产品


//在线客服
import OnlineService from './routes/Customer/OnlineService'  //在线服务

import Home from "./routes/Home.js";


/*function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      
      
      <Route path="/login" component={Login} />
    </Router>
  );
}
*/
const Routers = function ({ history, app}) {
	const routes = [
		{
			path: '/',
			component: IndexPage,
			indexRoute:{ component: Home },
			childRoutes: [
				/*用户管理*/
				{
					path: '/users',
					component: UserList,
				},
				{
					path: '/userRecords',
					component: UserRecords,
				},
				{
					path: '/gathered',
					component: Gathered,
				},
				/*活动管理*/
				{
					path: '/experience',
					component: Experience,
				},
				{
					path: '/raise',
					component: Raise,
				},
				/*新闻管理*/
				{
					path: '/news/add',
					component: AddNews,
				},
				{
					path: '/news/list',
					component: NewsList,
				},
				/*理财产品*/
				{
					path: '/product',
					component: Product,
				},
				/*
				 * 在线客服
				 */
				{
					path: '/onlineService',
					component: OnlineService,
				},
			]
		},
		{
			path: '/login',
			component: Login
		},
		
		
	]
	return <Router history={history} routes={routes} />;
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers;
