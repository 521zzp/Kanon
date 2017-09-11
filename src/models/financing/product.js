import { PRODUCT_TOAL, PRODUCT_LIST, PRODUCT_DETAILS } from '../../config/url'
import { postModel, onanaly } from '../../utils/net'

export default {
  namespace: 'product',
  state: {
  	total: 0, //总页码
  	current: 1, //当前页码
  	pageSize: 10, //每页数据条数
  	time: [null, null],  //时间范围
  	name: '', //产品名称
  	status: '', //0:上架状态,1下架状态
  	list: [],
  	modalVisiable: false,
  	productTypes: [ //产品类别配置
  		{ type: 0, name: '正常标' },
  		{ type: 1, name: '新手标' },
  		{ type: 2, name: '限时标' },
  		{ type: 3, name: '预售标' },
  	],
  	modalValue: {
  		modalTitle: '添加产品', //弹框标题
  		modalType: 'release', //发布产或编辑产品
  		/*产品信息：*/
  		type: 0, //产品类别
  		saleTimeRange: [], //产品为限时标时有时间范围
  		preSaleTime: '', //产品为预售标时有预售时间
  		name: '', //产品名称
  		rate: '', //产品利率
  		limit: '', //资金上限
  		startMoney: '', //起投金额
  		term: 0, //产品周期
  		systemInvest: 0, //系统投资
  		grantTerm: 0, //发利周期
  		status: 0, //0：上架状态，1：下架状态
  		repaymentWay: '', //还款方式
  		startProfitDay: '', //起始受益日， 提示：T+输入的数字
  		loanEnterprise: '', //借款企业信息
  		safeGuarantee: '', //安全保障,
  		repaymentPlan: '', //回款计划
  	}
  },
  reducers: {
  	productTypeChange (state, { payload: value }) {
  		console.log('value:')
  		console.log(value)
  		const temp = { ...state.modalValue, type: value}
  		console.log(temp)
  		console.log({ ...state, modalValue: temp })
  		return { ...state, modalValue: temp }
  	},
  	productRateChange (state, { payload: value }) {
  		console.log('value:')
  		console.log(value)
  		const temp = { ...state.modalValue, rate: value}
  		console.log(temp)
  		console.log({ ...state, modalValue: temp })
  		return { ...state, modalValue: temp }
  	},
  	update (state, { payload: obj }) {
  		return { ...state, ...obj }
  	},
  	listUpdate (state, { payload: obj }) {
  		return { ...state, ...obj }
  	},
  	editProductRedux (state, { payload: obj }) {
  		const tempModal = { ...state, ...obj, modalTitle: '编辑产品', modalType: 'edit' }
  		return { ...state, modalValue: tempModal, modalVisiable: true }

  	},
  	
  },
  effects: {
  	*getTotal ({ payload: obj }, { put, select }) {
  		obj ? yield put({ type: 'listUpdate', payload: obj }) : ''
  		yield put({ type: 'update', payload: { current: 1 } })
  		const { account, order, time, status } = yield select(state => state.gathered);
  		const result = yield fetch(PRODUCT_TOAL, postModel({ account, order, time, status })).then(onanaly);
  		yield put({ type: 'update', payload: { total: result.total } });
  	 	if (result.total > 0) {
  			yield put({ type: 'getList' });
  		} else {
  			yield put({ type: 'listUpdate', payload: { list: [] } })
  		}
  	},
  	*getList ({ payload: obj }, { put, select }) {
  		obj ? yield put({ type: 'update', payload: { current: obj } }) : ''
  		const params = { ...(yield select(state => state.gathered)), current: obj ? obj : 1 };
  		delete params.list;
  		const result = yield fetch(PRODUCT_LIST, postModel(params)).then(onanaly);
			const list = result.map(
				(item, index) => ({ ...item, key: index })
			)
  		yield put({ type: 'listUpdate', payload: { list: list } })
  	},
  	*editProductById ({ payload: id }, { put, select }) {
  		const result = fetch(PRODUCT_DETAILS, postModel({id})).then(onanaly);
  		yield put({ type: 'editProductRedux', payload: result })
  	}
  },
  subscriptions: {
  	setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/product') {
          dispatch({
            type: 'getTotal'
          });
        }
      });
    },
  },
};
