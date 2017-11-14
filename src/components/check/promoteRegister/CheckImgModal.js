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
    		(item,index) => <img className={ styles.image } src={ item } key={ index } />
    	) }
    	</Modal>
    </div>
  );
}

export default CheckImgModal;
