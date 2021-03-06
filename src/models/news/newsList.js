import { NEWS_TOTAL, NEWS_LIST, NEWS_DETAILS } from '../../config/url'
import { postModel, onanaly } from '../../utils/net'
import { htmlToEditor, editorToHtml } from '../../utils/editor'

export default {
  namespace: 'newsList',
  state: {
  	modalVisible: false,
  	searching: false, //搜索按钮是否在搜索状态
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
  	operation: 'add', //保存时的操作
  	modalValue: {
  		modalTitle: '添加新闻',
  		path: '', //文本新闻的地址
  		type: '',
  		title: '',
  		link: '',
  		content: null,
  	}
  },
  reducers: {
  	addNews (state) {
  		return { ...state, modalValue: { modalTitle: '添加新闻', type: undefined }, modalVisible: true, operation: 'add' }
  	},
  	editNews (state, { payload: obj }) {
  		return { ...state, modalValue: { modalTitle: '编辑新闻', ...obj, content: htmlToEditor(obj.content) }, modalVisible: true, operation: 'edit' }
  	},
  	closeModal (state) {
  		return { ...state, modalVisible: false}
  	},
  	currentUpdate (state, { payload: obj }) {
  		return { ...state, ... obj }
  	},
  	update (state, { payload: obj }) {
  		return { ...state, ... obj }
  	},
  	newsTypeChange (state, { payload: obj }) {
  		return { ...state, modalValue: { ...state.modalValue, type: obj } }
  	},
  	unpoadPath (state, { payload: obj }) {
  		return { ...state, modalValue: { ...state.modalValue, path: obj } }
  	},
  	editorChange(state, { payload: obj }) {
  		return { ...state, modalValue: { ...state.modalValue, content: obj } }
  	},
  	searching (state, { payload: obj }) {
  		return { ...state, searching: obj }
  	},
  },
  effects: {
  	*getTotal({ payload: obj }, { put, select }) {
  		yield put({ type: 'searching', payload: true })
  		try{
  			//如果不是进入页面查询，更新查询参数
	  		obj ? yield put({ type: 'paramsUpdate', payload: obj }) : ''
	  		//请求总数要把当前页数置为1
	  		yield put({ type: 'currentUpdate', payload: { current: 1 } })
	  		const { time, title, type } = yield select(state => state.newsList);
	  		//查询总页数
	  		const result = yield fetch(NEWS_TOTAL, postModel({ time, title, type })).then(onanaly);
	  		yield put({ type: 'update', payload: { total: result.total } });
	  		if (result.total > 0) {
	  			yield put({ type: 'getList' });
	  		} else {
	  			yield put({ type: 'update', payload: { list: [] } })
	  		}
  		}finally{
  			yield put({ type: 'searching', payload: false })
  		}
  		
  	},
  	*getList ({ payload: obj }, { put, select }) {
  		obj ? yield put({ type: 'currentUpdate', payload: { current: obj } }) : ''
  		const { time, title, type, current, pageSize } = yield select(state => state.newsList)
  		const result = yield fetch(NEWS_LIST, postModel({ time, title, type, current, pageSize })).then(onanaly);
			const list = result.map(
				(item, index) => ({ ...item, key: index })
			)
  		yield put({ type: 'update', payload: { list: list } })
  	},
  	*getDetails({ payload: obj }, { put, select }) {
  		console.log(obj)
  		const result = yield fetch(NEWS_DETAILS, postModel({ id: obj })).then(onanaly);
  		result ? yield put({ type: 'editNews', payload: result }) : ''
  	}
  	
  },
  subscriptions: {
  	setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/news/list') {
        	//查询参数初始化
           dispatch({
            type: 'update',
            payload: {
            	time: [null, null],
					  	title: '', 
					  	type: '', 
            }
          });
          dispatch({
            type: 'getTotal'
          });
        }
      });
    },
  },
};
