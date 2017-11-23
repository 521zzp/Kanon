import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Tree, Table, } from 'antd';
import styles from './JuniorTree.css';
import JuniorInfo from '../../components/user/junior/JuniorInfo';
import { postModel, onanaly } from '../../utils/net';
import { USER_JUNIOR_TREE_SEARCH } from '../../config/url';



const TreeNode = Tree.TreeNode;

class JuniorTree extends Component{
	constructor (props) {
   		super(props)
   		this.state = {
   			tree: props.tree
   		}
	}
	
	
	sss = (e ,f) => {
		console.log(e)
		console.log(f)
		this.props.dispatch({
			type: 'junior/getJuniorInfo',
			payload: {
				junior: e[0]
			}
		})
		
		console.log('查询用户：', e[0])
	}
	
	renderTreeNodes = (data) => {
	    return data.map((item) => {
	      if (item.children) {
	        return (
	          <TreeNode title={item.key} key={item.key} isLeaf={item.isLeaf} dataRef={item}>
	            { this.renderTreeNodes(item.children) }
	          </TreeNode>
	        );
	      }
	      return <TreeNode key={item.key} title={item.key} isLeaf={item.isLeaf} dataRef={item} />;
	    });
	}
	
	onLoadData =  (treeNode) => {
		
		console.log('treeNode:', treeNode)
		console.log('treeNode.props:', treeNode.props)
		
		return new Promise( async (resolve, reject) => {
	      if (treeNode.props.children) {
	        resolve();
	        return;
	      } else {
	      	
	      	try {
	      		const result = await fetch(USER_JUNIOR_TREE_SEARCH, postModel()).then(onanaly)
	      		console.log(result)
	      		if (result && result.length) {
	      			treeNode.props.dataRef.children = result
	      		} else {
	      			treeNode.props.dataRef.isLeaf = true
	      		}
	      		this.setState({
		          tree: [...this.state.tree],
		        });
	      		resolve();
	      	} catch (e) {
	      		reject();
	      	}
	       
	      }
	      	
	    });
	}
	
	columns = [
		{
		  title: '标的类型',
		  dataIndex: 'type',
		  key: 'type',
		},
		{
		  title: '新增投资人数',
		  dataIndex: 'peoples',
		  key: 'peoples',
		},
		{
		  title: '投资总金额（元）',
		  dataIndex: 'money',
		  key: 'money',
		},
	]
	
	
	render () {
		return (
			<div>
				<Row gutter={24} >
			    	<Col xl={6} lg={8} md={10} xs={24} className={ styles['row-one'] }>
			    		<Card bordered={ false } className={ styles['tree-card'] }>
			    		<Tree  
				        onSelect={ this.sss }
				        loadData={ this.onLoadData }
				      >
				        { this.renderTreeNodes(this.state.tree) }
				      </Tree>
			    		
			    		
			    		</Card>
			    	</Col>
			    	
			    	<Col xl={18} lg={16} md={14} xs={24} className={ styles['row-one'] }>
			    		<Card bordered={ false }>
			    			<JuniorInfo junior={ this.props.juniorInfo }/>
			    		
			    		</Card>
			    	</Col>
			    </Row>
			    <Row gutter={24}>
			    	<Col xl={8} lg={8} md={12} xs={24} className={ styles['row-one'] }>
			    		<Card bordered={ false } title="一级用户统计">
			    			<Table dataSource={ this.props.levelOne } columns={ this.columns } pagination={ false } />
			    		</Card>
			    	</Col>
			    	<Col xl={8} lg={8} md={12} xs={24} className={ styles['row-one'] }>
			    		<Card bordered={ false } title="二级用户统计">
			    			<Table dataSource={ this.props.levelTwo } columns={ this.columns } pagination={ false } />
			    		</Card>
			    	</Col>
			    	<Col xl={8} lg={8} md={12} xs={24} className={ styles['row-one'] }>
			    		<Card bordered={ false } title="三级用户统计">
			    			<Table dataSource={ this.props.levelThree } columns={ this.columns } pagination={ false } />
			    		</Card>
			    	</Col>
			    </Row>
			</div>
		    
		    
		);
	}
}

function mapStateToProps(state) {
  const { tree, juniorInfo, levelOne, levelTwo, levelThree } = state.junior
  
  return {
  	tree,
  	juniorInfo,
  	levelOne,
  	levelTwo,
  	levelThree,
  	
  };
}

export default connect(mapStateToProps)(JuniorTree);
