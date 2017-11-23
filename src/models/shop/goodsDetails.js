import { SHOP_GOODS_DETAILS, SHOP_GOODS_INFO_SAVE } from '../../config/url'
import { htmlToEditor, editorToHtml } from '../../utils/editor'
import { postModel, onanaly } from '../../utils/net'
import pathToRegexp from 'path-to-regexp';
import { browserHistory } from 'dva/router';

export default {
  namespace: 'goodsDetails',
  state: {
  	type: '', //edit || add
  	id: '',//商品id
  	params: {
  		img: '',
	  	name: '',
	  	point: 0,
	  	stock: 0, //库存，可兑换数
	  	real: 0, //是否实物， 0：表示虚拟， 1表示实物,
	  	goodsIllustrate: null, //商品说明
	  	rechargeIllustrate: null, //兑换说明
  	}
  },
  reducers: {
  	update (state, { payload: obj }) {
  		return { ...state, ...obj }
  	},
  	editorContentChange (state, { payload: obj }) {
  		if (obj.rechargeIllustrate) {
  			console.log(editorToHtml(obj.rechargeIllustrate))
  		} else{
  			console.log(editorToHtml(obj.goodsIllustrate))
  		}
  		return { ...state, ...obj }
  	}
  },
  effects: {
  	*getGoodsDetailsById ({ payload: obj }, { put, select }) {
  		const { id } = yield select(state => state.goodsDetails)
  		const result = yield fetch(SHOP_GOODS_DETAILS, postModel(obj)).then(onanaly)
  		if (result) {
  			console.log('result:', result)
  			yield put({
	    		type: 'update',
	    		payload: {
        			params: {
        				...result,
        				goodsIllustrate: htmlToEditor(result.goodsIllustrate),
        				rechargeIllustrate: htmlToEditor(result.rechargeIllustrate),
        			}
        		}
        	})
  		}
  	},
  	*saveGoodsDetails({ payload: obj }, { put, select }) {
  		const { type, id, params } = yield select(state => state.goodsDetails)
  		const result = yield fetch(SHOP_GOODS_INFO_SAVE, postModel({ type, id })).then(onanaly)
  		if(result) {
  			browserHistory.push('/shop')
  		}
  	}
  },
  subscriptions: {
  	setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
      	const edit = pathToRegexp('/goods/edit/:id').exec(pathname);
        if (edit) {
        	const id = edit[1]
        	console.log('id: '+ id)
        	dispatch({
        		type: 'update',
        		payload: {
        			type: 'edit',
        			id: id,
        		}
        	})
        	dispatch({
        		type: 'getGoodsDetailsById',
        	})
        }
        
        const add = pathToRegexp('/goods/add').exec(pathname);
        if (add) {
        	dispatch({
        		type: 'update',
        		payload: {
        			type: 'add',
        			id: '',
        			params: {
        				rechargeIllustrate: ''
        			}
        		}
        	})
        }
      });
    },
  },
};
