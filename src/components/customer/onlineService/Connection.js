import React from 'react';
import { Card, Button, Icon } from 'antd';
import styles from './Connection.css';

function Connection({
	connect,
	status,
}) {
  return (
    <div className={styles.normal}>
      <Card bordered={ false }>
      	<div>
      		<Button type="primary" icon="fork" onClick={ connect }>连接系统</Button>
      	</div>
      </Card>
      { status === 0 && <Card bordered={ false } style={{ marginTop: '10px' }}>
      	<div className={ styles['status-wrap'] }>
      			<div className={ styles['status-off-wrap'] }>
      				<Icon type="frown-o" className={ styles['offline-icon'] }/>
      				<span className={ styles['status-span'] }>当前状态:未连接</span>
      			</div>
      	</div>
      </Card>}
      
      { status === -1 && <Card bordered={ false } style={{ marginTop: '10px' }}>
      	<div className={ styles['status-wrap'] }>
      			<div className={ styles['status-connecting-wrap'] }>
      				<div className={ styles.spinner }></div>
      				<span className={ styles['status-connecting-span'] }>连接中……</span>
      			</div>
      	</div>
      </Card>}
      
    </div>
  );
}

export default Connection;
