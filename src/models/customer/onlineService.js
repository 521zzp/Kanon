//import io from 'socket.io-client'
import { notification } from 'antd';
import { CUSTOMER_SERVICE_SOCKET } from '../../config/url'

var Socket, Dispatch;

// 'CUSTOMER_CONNECT', 'CLERK_CONNECT', 'CUSTOMER_SEND', 'CLERK_SEND', 'CUSTOMER_DISCONNECT' 
// 'CHAT_HISTORY_RECORDS'

export default {
  namespace: 'onlineService',
  state: {
  	status: 0, // 0: 未连接, 1: 已连接, -1: 连接中，
  	serviceId: '',
  	scrollBehavior: 'bottom',// top, bottom, stable
  	records: [],
  	chats: []
  },
  reducers: {
  	update (state, { payload: obj }) {
  		return { ...state, ...obj }
  	},
  	updateRecords (state, { payload: obj }) {
  		console.log('reducer')
  		
  		return { ...state, records: [...state.records, obj ] }
  	},
  	newCustomerPush (state, { payload: obj }) {
  		var first = false
  		if (state.chats.length === 0 ) {
  			first = true
  		}
  		const chat = {
  			userId: obj.userId,
  			records: obj.records,
  			online: true,
  			more: obj.more,
  			unread: first ? 0 : 1,
  			face: obj.face,
  			account: obj.account,
  			name: obj.name,
  			chatting: first, 
  		}
  		console.log('new conncetion')
  		console.log(chat)
  		return { ...state, chats: [ ...state.chats, chat ] }
  	},
  	clerkConnect (state, { payload: obj }) {
  		return { ...state, serviceId: obj.serviceId }
  	},
  	customerDisconnected (state, { payload: obj }) {
  		const disconnect = state.chats.filter(
	  		item => item.userId === obj.userId
	  	)[0]
  		const temp = [].concat(state.chats)
  		temp.splice(state.chats.indexOf(disconnect), 1) 
			if (temp.length > 0 && disconnect.chatting) {
				const first = { ...temp[0], chatting: true }
				temp.splice(0, 1, first)
			}  	
			return { ...state, chats: temp }
  	},
  	clerkDisconnect (state, { payload: obj }) {
  		return  {
		  	status: 0,
		  	serviceId: '',
		  	scrollBehavior: 'bottom',
		  	records: [],
		  	chats: []
		  }
  	},
  	chattingReceive (state, { payload: obj }) {
  		try {
  			const current =  state.chats.filter(
	  			item => item.userId === obj.userId
	  		)[0]
	  		const target = { 
	  			...current, 
	  			records: [ ...current.records, obj], 
	  			unread: current.chatting ? 0 : current.unread + 1
	  		}
	  		//左侧移动浮窗提醒
	  		console.log('左侧移动浮窗提醒ss')
	  		console.log(obj)
	  /*		notification.open({
	  			message: obj.userNickName,
	  			description: obj.content
	  		})*/
	  		if (!current.chatting) {
	  			notification.open({
				    message: obj.userNickName,
				    description: obj.type === 1 ? obj.content : '图片',
				    duration: 2,
				  });
	  		}
	  		const temp = [].concat(state.chats)
  		  temp.splice(state.chats.indexOf(current), 1, target)
				return { ...state, chats: temp, scrollBehavior: 'bottom' }  		
  		} catch (e) {
  			console.log(e)
  			return { ...state }
  		}
  		
  	},
  	chattingSwitch (state, { payload: { userId } }) {
  		console.log('change -- == ')
  		console.log(userId)
  		let current = state.chats.filter(
  			item => item.chatting
  		)[0]
  		let target = state.chats.filter(
  			item => item.userId === userId
  		)[0]
  		console.log(current)
  		console.log(target)
  		
  		const temp = [].concat(state.chats)
  		temp.splice(state.chats.indexOf(current), 1, { ...current, chatting: false })
  		temp.splice(state.chats.indexOf(target), 1, { ...target, chatting: true, unread: 0 })
  		return { ...state, chats: temp }
  	},
  	receiveHistoryRecords (state, { payload: obj }) {
  		try {
  			const current =  state.chats.filter(
	  			item => item.userId === obj.userId
	  		)[0]
	  		const target = { 
	  			...current, 
	  			records: [ ...obj.records, ...current.records], 
	  			unread: current.chatting ? 0 : current.unread + obj.records.length,
	  			more: obj.more,
	  		}
	  		const temp = [].concat(state.chats)
  		  temp.splice(state.chats.indexOf(current), 1, target)
				return { ...state, chats: temp, scrollBehavior: 'top' }  		
  		} catch (e) {
  			console.log(e)
  			return { ...state }
  		}
  	}
  },
  effects: {
  	*connect ({ payload: obj }, { put, select }) {
  		console.log('try connect')
  		yield put({ type: 'update', payload: { status: -1 } })
  		const { id } = yield select(state => state.main )
  		
  		console.log('客服id')
  		console.log(id)
  		//Socket = new WebSocket("ws://192.168.3.8:8090/webSocketOneToOne/sss" );
  		//Socket = new WebSocket("ws://localhost:4000/customer/service" );
  		//const socketurl = "ws://" + location.host + CUSTOMER_SERVICE_SOCKET + "/0/" + id;
    	const socketurl = 'ws://www.shangnongtou.com:8090/websocket'+ "/0/" + id;
		  //const socketurl = 'ws://192.168.3.8:8090/websocket'+ "/0/" + id;
  		console.log(socketurl)
  		Socket = new WebSocket(socketurl);
  		//Socket = new SockJS('http://192.168.3.8:8080/guestbook');
  		//Socket = new WebSocket("ws://192.168.3.8:8090/ws" );
  		//Socket = io('http://localhost:4000',)
  		//Socket = io("http://192.168.3.8:8090/socket" );
  		console.log(Socket)
  		
  		/*Socket.on('connect', () => {
  			console.log('socket.io已连接')
			  console.log(Socket.id); // 'G5p5...'
			  Socket.on('msg',function(data){
					console.log('收到服务端发送消息：')
				  console.log(data);
				});
				Dispatch({
	      	 type: 'update', 
	      	 payload: { status: 1 }
	      })
			});*/
  		Dispatch({
	      	 type: 'update', 
	      	 payload: { status: 1 }
	      })
  		Socket.onerror = function(evt) {
			    console.log("WebSocketError!");
			    Dispatch({
	      	 type: 'clerkDisconnect',
	      })
			};
			
			Socket.onopen = function()
	    {
	    	console.log('已连接')
	      Dispatch({
	      	 type: 'update', 
	      	 payload: { status: 1 }
	      })
	    };
  		Socket.onmessage = function (evt) 
      { 
          var data = JSON.parse(evt.data);
          console.log("数据已接收...");
          console.log(JSON.stringify(data))
          console.log(evt.data);
          
          switch (data.socketType){
						case 'CUSTOMER_CONNECT':
							Dispatch({
			      		type: 'newCustomerPush', 
			      		payload: data
			      	})
							break;
						case 'COMMON_SEND':
							Dispatch({
			      		type: 'chattingReceive', 
			      		payload: data.record
			      	})
							break;
						case 'CLERK_CONNECT':
							Dispatch({
			      		type: 'clerkConnect', 
			      		payload: data
			      	})
							break;
						case 'CUSTOMER_DISCONNECT':
							Dispatch({
			      		type: 'customerDisconnected', 
			      		payload: data
			      	})
							break;
						case 'CHAT_HISTORY_RECORDS':
							Dispatch({
			      		type: 'receiveHistoryRecords', 
			      		payload: data
			      	})
							break;	
						default:
							break;
					}
          
      };
  	},
  	*send ({ payload: obj }, { put, select }) {
  		console.log('send obj')
  		console.log(obj)
  		
  		const { serviceId } = yield select(state => state.onlineService)
  		const userId = (yield select(state => state.onlineService)).chats.filter(
  			item => item.chatting
  		)[0].userId
  		console.log('send')
  		console.log(serviceId)
  		console.log('user')
  		console.log(userId)
  		Socket.send(JSON.stringify({ content: obj, socketType: 'COMMON_SEND', serviceId, userId, type: 1, sender: 0})); 
  	},
  	*getHistoryRecords ({ payload: obj }, { put, select }) {
  		const { serviceId } = yield select(state => state.onlineService)
  		const currentChat = (yield select(state => state.onlineService)).chats.filter(
  			item => item.chatting
  		)[0]
  		const userId = currentChat.userId
  		const id = currentChat.records[0].id
  		Socket.send(JSON.stringify({
  			socketType: 'CHAT_HISTORY_RECORDS', 
  			userId, 
  			serviceId,
  			id
  		}))
  	}
  },
  subscriptions: {
  	setup({ dispatch }) {
  		Dispatch = dispatch
    },
  },
};
 