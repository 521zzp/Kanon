import { USER_JUNIOR_USER, USER_JUNIOR_STATISTICS,
			USER_JUNIOR_INVEST_STATISTICS,
			

} from '../../config/url';
import { postModel, onanaly } from '../../utils/net';
import { message } from 'antd';


export default {
  namespace: 'junior',
  state: {
  	baseParams: {
  		account: '',
  		idCard: '',
  	},
  	id: '', //查询用户的userid
  	baseUserInfo: [],
  	juniorStatistics: {
  		registerTotal: 0,
  		investPeople: 0,
  		investMoney: 0,
  	},
  	juniorInvestStatistics: {
  		newRegisters: 0, //新增注册人数
	  	newInvestPeoples: 0, //新增总投资人数
	  	innerThree: [], //三级内
	  	outerThree: [], //三级外
  	}
  },
  reducers: {
  	update (state, { payload: obj }) {
  		return { ...state, ...obj }
  	},
  },
  effects: {
  	*getUserInfo ({ payload: obj }, { put, select }) {
  		yield put({ type: 'update', payload: { baseParams: obj } })
  		const user = yield fetch(USER_JUNIOR_USER, postModel(obj)).then(onanaly)
			if (user) {
				console.log('user', user)
				yield put({ type: 'update', payload: { baseUserInfo : [user], id: user.id } })
			}
  	},
  	*getJuniorStatistics({ payload: obj }, { put, select }) {
  		const { id } = yield select(state => state.junior)
  		if (id) {
  			const result = yield fetch(USER_JUNIOR_STATISTICS, postModel({ ...obj, id })).then(onanaly)
  			yield put({ type: 'update', payload: { juniorStatistics: result } })
  		} else {
  			message.error('请先搜索用户！');
  		}
  		
  	},
  	*getJuniorInvestStatistics({ payload: obj }, { put, select }) {
  		const { id } = yield select(state => state.junior)
  		if (id) {
  			const result = yield fetch(USER_JUNIOR_INVEST_STATISTICS, postModel({ ...obj, id })).then(onanaly)
				result && (yield put({ type: 'update', payload: { juniorInvestStatistics: result } }))
  		} else {
  			message.error('请先搜索用户！');
  		}
  	},
  	
  	
  	
  },
  subscriptions: {
  	
  },
};
