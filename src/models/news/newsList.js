
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
  	}
  },
  effects: {},
  subscriptions: {},
};
