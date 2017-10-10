import { message } from 'antd';

export default function (e, dispatch) {
		try { 
			const err = JSON.parse(e.message)
			console.log('err object:')
			console.log(err)
			switch (err.type)
			{
				case 0:
					console.log(err.msg)
					message.error(err.msg)
					break;
				case 1: 
					dispatch({
				      type: err.message,
				      payload: err.payload
				   });
					break;
			}
		
		} catch (err) {
			console.log('未捕获的异常：')
			console.log(e)
		}
		
	
	
}
