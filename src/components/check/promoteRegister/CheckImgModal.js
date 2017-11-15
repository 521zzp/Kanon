import React from 'react';
import styles from './CheckImgModal.css';
import { Modal } from 'antd'

function CheckImgModal({
	visiable,
	close,
	list
}) {
	
	const handleOk = () => {
		close()
	}
	
  return (
    <div className={styles.normal}>
    	<Modal title="图片审核" 
    			width= { 800 }
          visible={ visiable }
          onOk={ handleOk }
          onCancel={handleOk}
        >
    	{ list.map(
    		(item,index) => <div key={ index } className={ styles.item } >
    				<h3 className={ styles['img-info'] }>{ item.name }</h3>
    				<img className={ styles.image } src={ item.path }  />
    				</div>
    	) }
    	</Modal>
    </div>
  );
}

export default CheckImgModal;
