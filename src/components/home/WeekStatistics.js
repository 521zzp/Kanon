import React from 'react';
import styles from './WeekStatistics.less';
import { Card, Row, Col } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell  }  from 'recharts';

function WeekStatistics({ weekCount, weekIncomePort, weekRegisterPort }) {
	
	const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
	
  return (
    <div className={styles.normal} >
    	<Row gutter={20}>
    		<Col lg={ 18 } md={ 18 } sm={24} className={styles.col}>
    			<Card className={ styles.statistics } bordered={false} style={{height: 432}}>
		    		<span className={ styles.title }>七日统计</span>	
		    		<ResponsiveContainer width="100%" height={360}>
			    		<LineChart  data={ weekCount }
			    				margin={{top: 20, right: 10, left: 10, bottom: 5}}>
			    			<XAxis dataKey="name" type="category"/>
      					<YAxis type="number" />
      					<CartesianGrid vertical={false} stroke="#dcdcdc" strokeDasharray="3 3" />
      					<Tooltip  wrapperStyle={{ border: 'none', boxShadow: '4px 4px 40px rgba(0, 0, 0, 0.05)' }}/>
      					<Legend />
				      	<Line dataKey="出金" type="monotone" stroke="#8884d8" />
				      	<Line dataKey="入金" type="monotone" stroke="#82ca9d" />
				      	<Line dataKey="成本" type="monotone" stroke="#FFB800" />
				      </LineChart>
		    		</ResponsiveContainer>
		    	</Card>
    		</Col>
    		<Col lg= { 6 } md={ 6 } sm={24} className={styles.col}>
    			<Card bordered={false} style={{height: 206,marginBottom: 20}} className={styles['pie-one']} >
    				<span className={styles['pie-statistic']}>一周注册端口统计</span>
    				<ResponsiveContainer width="100%" height={176}>
    					<PieChart >
						  <Pie data={ weekRegisterPort } dataKey="value" cx="50%" cy="50%" outerRadius={50} label >
						  	{ weekRegisterPort.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>) }
						  </Pie>
						  <Legend />
						  <Tooltip  wrapperStyle={{ border: 'none', boxShadow: '4px 4px 40px rgba(0, 0, 0, 0.05)' }}/>
						</PieChart>
    				</ResponsiveContainer>
	    		</Card>
	    		<Card bordered={false} style={{height: 206}} className={styles['pie-two']} >
    				<span className={styles['pie-statistic']}>一周入金端口统计</span>
    				<ResponsiveContainer width="100%" height={176}>
    					<PieChart >
						  <Pie data={ weekIncomePort } dataKey="value" cx="50%" cy="50%" outerRadius={50} label >
						  	{ weekIncomePort.map((entry, index) => <Cell key={index}  fill={COLORS[index % COLORS.length]}/>) }
						  </Pie>
						  <Legend />
						  <Tooltip  wrapperStyle={{ border: 'none', boxShadow: '4px 4px 40px rgba(0, 0, 0, 0.05)' }}/>
						</PieChart>
    				</ResponsiveContainer>
	    		</Card>
    		</Col>
    	
    	</Row>
    </div>
  );
}

WeekStatistics.propTypes = {
  weekCount: React.PropTypes.array.isRequired,
  weekIncomePort: React.PropTypes.array.isRequired,
  weekRegisterPort: React.PropTypes.array.isRequired,
};

export default WeekStatistics;
