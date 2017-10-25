import { message } from 'antd';
import { browserHistory } from 'dva/router';

let token, name, face, nav, power;

try{
	//如果要将一个已经声明的变量用于解构赋值，必须非常小心.只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。
	 ( { token, name, face, nav } = JSON.parse(localStorage.getItem('admin')) );
	console.log('local stroage!!!')
	console.log(nav)
	power = []
	nav.forEach( (item) => {
		item.children.forEach(
			innerItem => power.push(innerItem.path) 
		)
	})
}catch(e){
	alert(1)
	token = '';
	name = '';
	face = '';
	power = []; 
}


export default {
  namespace: 'main',
  state: {
  	token: token,
  	name: name,
  	face: face,
  	power: power,
  	nav: nav,
  },
  reducers: {
  	loginStroage (state, { payload: info }) {
  		return { ...state, ...info, power: power }
  	},
    offLineUpdate (state, { payload: info }) {
  		return { ...state, ...info }
  	},
  },
  effects: {
  	*offLine (state, { put }) {
  		message.error('登录超时，请重新登录', 1.5 , () => browserHistory.push('/login') )
  		const obj = {
  			token: '',
  			name: '',
  			face: '',
  			power: [],
  		}
  		try{
  				localStorage.removeItem('admin')
  		}catch(e){
  		}
  		yield put({ type: 'offLineUpdate', payload: obj })
  	},
  	*powerValidate ({ payload: path }, { put, select }) {
  		//权限监控
  		const { nav } = yield select(state => state.main)
  		const common = [ '/', '/login', '/forbidden', '/404' ]
  		if (!~common.indexOf(path)) {
  			const power = []
	 		nav.forEach( (item) => {
	 			console.log(item)
	 			item.children.forEach(
	 				innerItem => power.push(innerItem.path) 
	 			)
	 		})
	 		if (!~power.indexOf(path)) {
	 			browserHistory.push('/forbidden')
	 		}
  		}
  	}
  },
  subscriptions: {
  	setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
      	
      	console.log('pathname===============================================:')
      	console.log(pathname)
      	dispatch({
      		type: 'powerValidate',
      		payload: pathname
      	})
      });
    }
  },
};
