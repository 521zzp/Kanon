import dva from 'dva';
import './index.css';
import './config/common.less';
import createLoading from 'dva-loading';
import { browserHistory } from 'dva/router';
import exception from './utils/exception'
import {dateFormat} from './utils/date'

dateFormat() //时间格式化方法
// 1. Initialize
const app = dva({
	history: browserHistory,
	onError(e, dispatch) {
		exception(e, dispatch)
	  },
});


app.use(createLoading());

app.model(require("./models/login"));

app.model(require("./models/user/investIdentifications"));

app.model(require("./models/shop/goodsDetails"));

app.model(require("./models/shop/goodsList"));

app.model(require("./models/check/promoteRegister"));

app.model(require("./models/setting/admins"));

app.model(require("./models/user/userRecordsInvite"));

app.model(require("./models/customer/onlineService"));

app.model(require("./models/user/userRecordsPoint"));

app.model(require("./models/user/userRecordsShopExchange"));

app.model(require("./models/user/userRecordsRecharge"));

app.model(require("./models/user/userRecordsCapitalStatements"));

app.model(require("./models/user/userRecordsInvest"));

app.model(require("./models/user/userRecordsCoupon"));

app.model(require("./models/user/userRecords"));

//app.model(require("./models/user/userList"));

app.model(require("./models/news/newsList"));

app.model(require("./models/financing/product"));

app.model(require("./models/couopn/raise"));

//app.model(require("./models/home"));

app.model(require("./models/gathering/gathered"));

app.model(require("./models/main"));

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

/*

☄く__,.ヘヽ.　　　　/　,ー､ 〉
　　　　　＼ &#39;, !-─‐-i　/　/´
　　　 　 ／｀ｰ&#39;　　　 L/／｀ヽ､
　　 　 /　 ／,　 /|　 ,　 ,　　　 &#39;,
　　　ｲ 　/ /-‐/　ｉ　L_ ﾊ ヽ!　 i
　　　 ﾚ ﾍ 7ｲ｀ﾄ　 ﾚ&#39;ｧ-ﾄ､!ハ|　 |
　　　　 !,/7 &#39;✪&#39;　　 ´i✪ﾊiソ| 　 |　　　
　　　　 |.从&#34;　　_　　 ,,,, / |./ 　 |
　　　　 ﾚ&#39;| i＞.､,,__　_,.イ / 　.i 　|
　　　　　 ﾚ&#39;| | / k_７_/ﾚ&#39;ヽ,　ﾊ.　|
　　　　　　 | |/i 〈|/　 i　,.ﾍ |　i　|
　　　　　　.|/ /　ｉ： 　 ﾍ!　　＼　|
　　　 　 　 kヽ&gt;､ﾊ 　 _,.ﾍ､ 　 /､!
　　　　　　 !&#39;〈//｀Ｔ´&#39;, ＼ ｀&#39;7&#39;ｰr&#39;
　　　　　　 ﾚ&#39;ヽL__|___i,___,ンﾚ|ノ
　　　　　 　　　ﾄ-,/　|___./
　　　　　 　　　&#39;ｰ&#39;　　!_,.:


* */
