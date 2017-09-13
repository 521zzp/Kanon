
export default {
  namespace: 'newsList',
  state: {
  	modalVisiable: false,
  	total: 0, //总页码
  	current: 1, //当前页码
  	pageSize: 10, //每页数据条数
  	list: [], //数据集合
  	time: [null, null],  //时间范围
  	title: '', //标题
  	type: '', //新闻类型
  	newsTypesConfig:[
  		{ name: '文本新闻', type: 1 },
  		{ name: '图片新闻', type: 2 },
  		{ name: '官方公告', type: 3 },
  	],
  	modalValue: {
  		modalTitle: '添加新闻',
  		type: '',
  		title: 'safafsa',
  		link: '',
  		content: null,
  	}
  },
  reducers: {
  	addNews (state) {
  		return { ...state, modalValue: { modalTitle: '添加新闻', type: 2 }, modalVisiable: true }
  	},
  	closeModal (state) {
  		return { ...state, modalVisiable: false}
  	},
  	currentUpdate (state, { payload: obj }) {
  		return { ...state, ... obj }
  	},
  },
  effects: {
  	*getTotal({ payload: obj }, { put, select }) {
  		//如果不是进入页面查询，更新查询参数
  		obj ? yield put({ type: 'paramsUpdate', payload: obj }) : ''
  		//请求总数要把当前页数置为1
  		yield put({ type: 'currentUpdate', payload: { current: 1 } })
  		const params = { time, title, type } = yield select(state => state.newsList)
  		debugger
  		//查询总页数
  		const result = yield fetch(GATHERED_TOTAL, postModel(params)).then(onanaly);
  		yield put({ type: 'totalUpdate', payload: { total: result.total } });
  		if (result.total > 0) {
  			yield put({ type: 'getList' });
  		} else {
  			yield put({ type: 'update', payload: { list: [] } })
  		}
  	},
  	*getList ({ payload: obj }, { put, select }) {
  		obj ? yield put({ type: 'currentUpdate', payload: { current: obj } }) : ''
  		const params = { time, title, type, current, pageSize } = yield select(state => state.newsList)
  		const result = yield fetch(GATHERED_LIST, postModel(params)).then(onanaly);
			const list = result.map(
				(item, index) => ({ ...item, key: index })
			)
  		yield put({ type: 'update', payload: { list: list } })
  	},
  },
  subscriptions: {
  	setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/news/list') {
        	//查询参数初始化
       
          dispatch({
            type: 'getTotal'
          });
        }
      });
    },
  },
};
