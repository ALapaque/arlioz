import './App.css'
import arliozLogo from './assets/arlioz.svg'


function App() {
	return (
		<div className="container">
			<div className="row">
				<div className="col">
					<div className="comming-soon">
							<img className={'logo'} src={arliozLogo} alt={'arlioz-logo'}/>
						<div className="coming-soon-container">
							<p className="coming-soon-container_text">COMING SOON</p>
						</div>
					</div>
				</div>
			</div>
		</div>
)
}

export default App
