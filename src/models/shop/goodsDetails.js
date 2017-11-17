import { SHOP_GOODS_DETAILS } from '../../config/url'
import { htmlToEditor, editorToHtml } from '../../utils/editor'
import { postModel, onanaly } from '../../utils/net'
import pathToRegexp from 'path-to-regexp';


export default {
  namespace: 'goodsDetails',
  state: {
  	type: '', //edit || add
  	id: '',//商品id
  	params: {
  		img: '',
	  	name: '',
	  	point: 0,
	  	stock: 100, //库存，可兑换数
	  	real: '0', //是否实物， 0：表示虚拟， 1表示实物,
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
  		const result = fetch(SHOP_GOODS_ADD, postModel(obj)).then(onanaly)
  		if (result) {
  			
  		}
  	}
  },
  subscriptions: {
  	setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
      	const edit = pathToRegexp('/goods/edit/:id').exec(pathname);
        if (edit) {
        	dispatch({
        		type: 'update',
        		payload: {
	        			type: 'edit',
	        			params: {}
	        		}
	        	})
        	const id = edit[1]
        	console.log('id: '+ id)
        }
        
        const add = pathToRegexp('/goods/add').exec(pathname);
        if (add) {
        	dispatch({
        		type: 'update',
        		payload: {
        			type: 'add',
        			params: {}
        		}
        	})
        }
        
        
      });
    },
  },
};
