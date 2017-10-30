import React from 'react';
import { Router } from 'dva/router';
import PropTypes from 'prop-types'
import IndexPage from './routes/IndexPage';
import { browserHistory } from 'dva/router';
import main from './models/main'



import Login from "./routes/Login.js";
//import Home from "./routes/Home.js";


/*import Gathered from "./routes/Gathering/Gathered.js";

//用户管理
//import UserList from "./routes/User/UserList.js"; //用户列表
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

//其他功能
import Forbidden from './routes/Other/Forbidden' //权限不足禁止访问*/



const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}


const Routers = function ({ history, app}) {
	const routes = [
		{
			path: '/',
			component: IndexPage,//主页
			onEnter: (params) => { 
				if (!main.state.token) {
					browserHistory.push('/login') 
					return false;
				} else {
					return true;
				}
			},
			getIndexRoute (nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/home'))
          cb(null, { component: require('./routes/Home') })
        }, 'home')
      },
			childRoutes: [
				/*用户管理*/
				{
					path: '/users',//用户列表
					getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/user/userList'))
              cb(null, require('./routes/User/UserList'))
            }, 'userList')
          },
				},
				{
					path: '/userRecords',
					getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/User/UserRecords'))
            }, 'userRecords')
          },
				},
				{
					path: '/gathered',
					getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/Gathering/Gathered'))
            }, 'gathered')
          },
				},
				/*活动管理*/
				{
					path: '/experience',
					getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/Coupon/Experience'))
            }, 'experience')
          },
					//component: Experience,
				},
				{
					path: '/raise',
					getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/Coupon/Raise'))
            }, 'raise')
          },
					//component: Raise,
				},
				/*新闻管理*/
				{
					path: '/news/add',
					getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/News/AddNews'))
            }, 'news-add')
          },
					//component: AddNews,
				},
				{
					path: '/news/list',
					getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/News/NewsList'))
            }, 'news-lisy')
          },
					//component: NewsList,
				},
				/*理财产品*/
				{
					path: '/product',
					getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/Financing/Product'))
            }, 'product')
          },
					//component: Product,
				},
				/*
				 * 系统设置
				 */
				{
					path: '/admins', //权限管理
					getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/Setting/Admins'))
            }, 'admins')
          },
					//component: OnlineService,
				},
				{
					path: '/power', //权限管理
					getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/Setting/Power'))
            }, 'power')
          },
					//component: OnlineService,
				},
				/*
				 * 在线客服
				 */
				{
					path: '/onlineService',
					getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/Customer/OnlineService'))
            }, 'onlineService')
          },
					//component: OnlineService,
				},
				/*
				 * 其他功能
				 */
				{
					path: '/forbidden',
					getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/Other/Forbidden'))
            }, 'forbidden')
          },
					//component: Forbidden,
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
