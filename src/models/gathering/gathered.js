import { postModelTwo } from '../../utils/net'
import { browserHistory } from 'dva/router';


export default {
  namespace: 'gathered',
  state: {
  	total: 100,
  	current: 1,
  },
  reducers: {
  	getTotalr(state, { payload: obj }){
  		console.log('reducers datas:')
  		console.log(obj)
  		return { ...state, current: obj }
  	},
  	second (state, { payload: obj }) {
  		console.log('second')
  		console.log(obj)
  	}
  },
  effects: {
  	*getTotal ( {payload: obj}, {call, put}) {
  		yield put({ type: 'getTotalr', payload: obj })
  	}
  },
  subscriptions: {
  },
};
