import React from 'react';
import { Avatar, Badge } from 'antd';
import styles from './Customers.css';
import { Scrollbars } from 'react-custom-scrollbars';




function Customers({
	chats
}) {
	
	const online = chats.map(
		(item, index) => <li className={ styles.activity } key={ index }>
			    			<Avatar className={ styles.face } 
			    			src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" 
			    			>{item.name[0]}</Avatar>
			    			<span className={ styles.account }>{item.account}</span>
			    			<span className={ styles.name }>{item.name}</span>
			    			<Badge className={ styles.badge } count={item.unread}/>
			    		</li>
	)
	
  return (
    <div className={ styles.normal }>
    	<div className={ styles.title }>
    		<span>用户列表</span> 
    		<span className={ styles['user-number'] }>7</span>
    	</div>
    	<Scrollbars style={{ width: '100%', height: 'calc(100vh - 160px)', paddingRight: '30px' }} autoHide>
    		<ul className={ styles.group }>
	    		{online}
	    	</ul>
	    	
			 </Scrollbars>   
			 
    	
    	
    </div>
  );
}

export default Customers;
