import { htmlToEditor, editorToHtml } from '../../utils/editor'

export default {
  namespace: 'goodsDetails',
  state: {
  	type: '',
  	img: '',
  	name: '',
  	point: 0,
  	stock: 0, //库存，可兑换数
  	real: '0', //是否实物， 0：表示虚拟， 1表示实物,
  	goodsIllustrate: null, //商品说明
  	rechargeIllustrate: null, //兑换说明
  },
  reducers: {
  	editorContentChange (state, { payload: obj }) {
  		
  		if (obj.rechargeIllustrate) {
  			console.log(editorToHtml(obj.rechargeIllustrate))
  		} else{
  			console.log(editorToHtml(obj.goodsIllustrate))
  		}
  		
  		return { ...state, ...obj }
  	}
  },
  effects: {},
  subscriptions: {},
};
