import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Home = () => {
	return (
		<>
			<div className='home'>
				<Row sm={1} md={2}>
					<Col sm={1} md={4}>
						<Card></Card>
					</Col>
					<Col sm={1} md={2}>
						<Card></Card>
					</Col>
				</Row>
			</div>
		</>
	)
}

export default Home;