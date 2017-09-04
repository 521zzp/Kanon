import dva from 'dva';
import './index.css';
import './config/common.less';
import createLoading from 'dva-loading';
import { browserHistory } from 'dva/router';



// 1. Initialize
const app = dva({
	history: browserHistory,
	onError(e, dispatch) {
		dispatch({
	      type: e.message,
	    })
	  },
});


app.use(createLoading());

app.model(require("./models/login"));

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
