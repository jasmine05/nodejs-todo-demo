import { Provider } from 'mobx-react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import RootStore from './stores/rootStore'

const rootStore = new RootStore()

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider rootStore={rootStore}>
			<App />
		</Provider>
	</React.StrictMode>
)
