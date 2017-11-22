import React from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Tree } from 'antd';
import styles from './JuniorTree.css';


const TreeNode = Tree.TreeNode;


function JuniorTree() {
	
	const sss = (e ,f) => {
		console.log(e)
		console.log(f)
	}
	
	const tree = {
		
		
		
	}
	
	
	const loop = data => data.map((item) => {
	  if (item.children && item.children.length) {
	    return <TreeNode key={item.key} title={item.key}>{loop(item.children)}</TreeNode>;
	  }
	  return <TreeNode key={item.key} title={item.key} />;
	});	
	
	
	
	
	
  return (
    <Row gutter={24} /*align={'middle'} type={ 'flex' }*/>
    	<Col xl={6} lg={8} md={10} xs={24}>
    		<Card bordered={ false }>
    		<Tree
	        defaultExpandedKeys={['0-0-0', '0-0-1']}
	        onSelect={ sss }
	      >
	        <TreeNode title="parent 1" key="0-0" onSelect={ sss }>
	          <TreeNode title="parent 1-0" key="0-0-0">
	            <TreeNode title="leaf" key="0-0-0-0" />
	            <TreeNode title="leaf" key="0-0-0-1" onSelect={ sss }/>
	          </TreeNode>
	          <TreeNode title="parent 1-1" key="0-0-1">
	            <TreeNode title='sss' key="0-0-1-0" />
	          </TreeNode>
	        </TreeNode>
	      </Tree>
    		
    		
    		</Card>
    	</Col>
    	
    	<Col xl={18} lg={16} md={14} xs={24}>
    		<Card bordered={ false }>2</Card>
    	</Col>
    
    </Row>
    
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(JuniorTree);
