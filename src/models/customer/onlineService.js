import io from 'socket.io-client'
var Socket, Dispatch;

export default {
  namespace: 'onlineService',
  state: {
  	status: 0, // 0: 未连接, 1: 已连接, -1: 连接中，
  	records: [
  		{
  			id: '545465748asfsa8g0',
  			user: 'fgkhsnfklhnkglfs',
  			clerk: '0astgastgasg07',
  			time: '2017-08-24 12:12',
  			sender: 0, 
  			userFace: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  			userNickname: '喵帕斯',
  			clerkNickname: '007',
  			type: 1, //1表示text, 其余后续添加
  			content: '豫章故郡，洪都新府',
  		},
  		{
  			id: '545465748asfsa8g0',
  			user: 'fgkhsnfklhnkglfs',
  			clerk: '0astgastgasg07',
  			time: '2017-08-24 12:12',
  			sender: 1, 
  			userFace: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  			userNickname: '喵帕斯',
  			clerkNickname: '007',
  			type: 1, //1表示text, 其余后续添加
  			content: '豫章故郡，洪都新府',
  		}
  	
  	],
  },
  reducers: {
  	update (state, { payload: obj }) {
  		return { ...state, ...obj }
  	},
  	updateRecords (state, { payload: obj }) {
  		console.log('reducer')
  		
  		return { ...state, records: [...state.records, obj ] }
  	},
  },
  effects: {
  	*connect ({ payload: obj }, { put, select }) {
  		console.log('try connect')
  		yield put({ type: 'update', payload: { status: -1 } })
  		//Socket = new WebSocket("ws://192.168.3.8:8090/webSocketOneToOne/sss" );
  		//Socket = new WebSocket("ws://localhost:4000/customer/service" );
  		Socket = new SockJS('http://192.168.3.8:8080/guestbook');
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
          var data = evt.data;
          console.log("数据已接收...");
          console.log(data)
          console.log(evt);
          
          Dispatch({
	      	 type: 'updateRecords', 
	      	 payload: JSON.parse(data)
	      })
      };
  	},
  	*send ({ payload: obj }, { put, select }) {
  		console.log('send')
  		//Socket.emit('msg', {rp:"fine,thank you"});
  		Socket.send(JSON.stringify({ content: obj })); 
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
