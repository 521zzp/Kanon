import io from 'socket.io-client'
var Socket, Dispatch;

// 'CUSTOMER_CONNECT', 'CLERK_CONNECT', 'CUSTOMER_SEND', 'CLERK_SEND', 'CUSTOMER_DISCONNECT' 

export default {
  namespace: 'onlineService',
  state: {
  	status: 0, // 0: 未连接, 1: 已连接, -1: 连接中，
  	serviceId: '',
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
  			id: obj.userId,
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
  	chattingReceive (state, { payload: obj }) {
  		//const chat = 
  		
  	},
  	chattingSwitch (state, { payload: { id } }) {
  		console.log('change -- == ')
  		console.log(id)
  		let current = state.chats.filter(
  			item => item.chatting
  		)[0]
  		let target = state.chats.filter(
  			item => item.id === id
  		)[0]
  		const temp = [].concat(state.chats)
  		temp.splice(state.chats.indexOf(current), 1, { ...current, chatting: false })
  		temp.splice(state.chats.indexOf(target), 1, { ...target, chatting: true, unread: 0 })
  		return { ...state, chats: temp }
  	}
  },
  effects: {
  	*connect ({ payload: obj }, { put, select }) {
  		console.log('try connect')
  		yield put({ type: 'update', payload: { status: -1 } })
  		//Socket = new WebSocket("ws://192.168.3.8:8090/webSocketOneToOne/sss" );
  		//Socket = new WebSocket("ws://localhost:4000/customer/service" );
  		Socket = new WebSocket("ws://192.168.3.8:8080/p2p_zgjf/websocket/0/3A7CEDEB-61A1-4107-868F-A1FDE925F75C");
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
          console.log(data)
          console.log(evt.data);
          
          switch (data.type){
						case 'CUSTOMER_CONNECT':
							Dispatch({
			      		type: 'newCustomerPush', 
			      		payload: data
			      	})
							break;
						case 'CUSTOMER_SEND':
							Dispatch({
			      		type: 'chattingReceive', 
			      		payload: data
			      	})
							break;
						case 'CLERK_CONNECT':
							Dispatch({
			      		type: 'clerkConnect', 
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
  		
  		console.log('send')
  		console.log(serviceId)
  		//Socket.emit('msg', {rp:"fine,thank you"});
  		Socket.send(JSON.stringify({ content: obj, serviceId, type: 0})); 
  	}
  },
  subscriptions: {
  	setup({ dispatch }) {
  		Dispatch = dispatch
  		
      /*websocket.listen((data) => {
      	
      	console.log('subscriptions data:')
      	console.log(data)
      	
      });*/
    },
    /*socketMessage({ dispatch }) {
		  return service.listen((data) => {
		  	console.log('socketMessage action')
		  });
		}*/
  },
};
