import { USER_JUNIOR_USER, USER_JUNIOR_STATISTICS,
			USER_JUNIOR_INVEST_STATISTICS,
			USER_JUNIOR_INFO, USER_JUNIOR_THREE_STATISTICS,

} from '../../config/url';
import { postModel, onanaly } from '../../utils/net';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';


export default {
  namespace: 'junior',
  state: {
  	baseParams: {
  		account: '',
  		idCard: '',
  	},
  	account: '', //查询用户手机号
  	idCard: '', //查询用户身份证号 
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
  	},
  	tree: [],
  	juniorInfo: {
  		floor: '',// 层级
  		level: '',
  		account: '',
  		name: '',
  		idCard: '',
  		port: '',
  		registerTime: '',
  		financing: 0, //理财金额
  		offerReward: 0, //对上级奖金
  		getReward: 0, //获取奖金
  	},
  	levelOne: [],
  	levelTwo: [],
  	levelThree: [],
  },
  reducers: {
  	update (state, { payload: obj }) {
  		return { ...state, ...obj }
  	},
  },
  effects: {
  	*getUserInfo ({ payload: obj }, { put, select }) {
  		yield put({ type: 'update', payload: { ...obj } })
  		const user = yield fetch(USER_JUNIOR_USER, postModel(obj)).then(onanaly)
			if (user) {
				console.log('user', user)
				yield put({ type: 'update', payload: { baseUserInfo : [user], id: user.id } })
			}
  	},
  	*getJuniorStatistics ({ payload: obj }, { put, select }) {
  		const { id } = yield select(state => state.junior)
  		if (id) {
  			const result = yield fetch(USER_JUNIOR_STATISTICS, postModel({ ...obj, id })).then(onanaly)
  			yield put({ type: 'update', payload: { juniorStatistics: result } })
  		} else {
  			message.error('请先搜索用户！');
  		}
  		
  	},
  	*getJuniorInvestStatistics ({ payload: obj }, { put, select }) {
  		const { id } = yield select(state => state.junior)
  		if (id) {
  			const result = yield fetch(USER_JUNIOR_INVEST_STATISTICS, postModel({ ...obj, id })).then(onanaly)
				result && (yield put({ type: 'update', payload: { juniorInvestStatistics: result } }))
  		} else {
  			message.error('请先搜索用户！');
  		}
  	},
  	*searchTree ({ payload: obj }, { put, select }) {
  		
  	},
  	*getJuniorInfo({ payload: obj }, { put, select }) {
  		const { account } = yield select(state => state.junior)
  		const result = yield fetch(USER_JUNIOR_INFO, postModel({ ...obj, account })).then(onanaly)
  		result && (yield put({ type: 'update', payload: { juniorInfo: result } }))
  	},
  	*getJuniorThreeStatistics({ payload: obj }, { put, select }) {
  		const { account } = yield select(state => state.junior)
  		let { levelOne, levelTwo, levelThree } = yield fetch(USER_JUNIOR_THREE_STATISTICS, postModel({ account })).then(onanaly)
  		if (levelOne) {
  			levelOne = levelOne.map(
	  			(item, index) => ({ ...item, key: index })
	  		)
  			levelTwo = levelTwo.map(
	  			(item, index) => ({ ...item, key: index })
	  		)
  			levelThree = levelThree.map(
	  			(item, index) => ({ ...item, key: index })
	  		)
  			yield put({ type: 'update', payload: { levelOne, levelTwo, levelThree } })
  		}
  	}
  },
  subscriptions: {
  	setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
      	const path = pathToRegexp('/juniorTree/:account').exec(pathname);
        if (path) {
        	const account = path[1]
        	console.log('account: '+account)
        	dispatch({
        		type: 'update',
        		payload: {
        			account,
        			tree: [
				  		{
				  			key: account,
				  			isLeaf: false,
				  		}
				  	],
        		}
        	})
        	dispatch({
        		type: 'getJuniorThreeStatistics',
        	})
        }
       
        
        
      });
    },
  },
};
