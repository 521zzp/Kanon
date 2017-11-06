import { HOME_CARDS, HOME_WEEK_DATA } from '../config/url'
import { postModel, onanaly } from '../utils/net'



export default {
  namespace: 'home',
  state: {
  	cards: {
  		income: 0,
  		outcome: 0,
  		register: 0,
  		cost: 0
  	},
  	weekCount: [],
		weekIncomePort: [],
		weekRegisterPort: []
  },
  reducers: {
  	update (state, { payload: obj }) {
  		console.log('redux update:')
  		console.log(obj)
  		
  		return { ...state, ...obj }
  	}
  },
  effects: {
  	*getCards ({ payload: obj }, { put }) {
  		const { income = 0, outcome = 0, register = 0, cost = 0 } = yield fetch(HOME_CARDS, postModel()).then(onanaly);
  		yield put({ type: 'update', payload: { cards: { income, outcome, register, cost } } });
  	},
  	*getWeeks ({ payload: obj }, { put }) {
  		const { weekCount = [], weekIncomePort = [], weekRegisterPort = [] } = yield fetch(HOME_WEEK_DATA, postModel()).then(onanaly);
  		yield put({ type: 'update', payload: { weekCount, weekIncomePort, weekRegisterPort } });
  	}
  },
  subscriptions: {
  	setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
      	
      	console.log('pathname:')
      	console.log(pathname)
      	
        if (pathname === '/') {
        	
          dispatch({
            type: 'getCards'
          });
          dispatch({
            type: 'getWeeks'
          });
        }
      });
    }
  },
};
