import React from 'react';
import { connect } from 'dva';
import styles from './Home.css';
import Cards from '../components/home/Cards'
import WeekStatistics from '../components/home/WeekStatistics'
function Home({
  	cards, 
  	weekCount, 
  	weekIncomePort, 
  	weekRegisterPort
  }) {
  return (
    <div className={styles.normal}>
      	<Cards cards={ cards }/>
      	<WeekStatistics 
      		weekCount= { weekCount }
      		weekIncomePort = { weekIncomePort }
      		weekRegisterPort = { weekRegisterPort }
      		/>
    </div>
  );
}

function mapStateToProps(state) {
	
	const { cards, weekCount, weekIncomePort, weekRegisterPort } = state.home
	
  return {
  	cards, 
  	weekCount, 
  	weekIncomePort, 
  	weekRegisterPort
  };
}

export default connect(mapStateToProps)(Home);
