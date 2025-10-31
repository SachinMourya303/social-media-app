import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './app/stateManagement/store.js'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
      <App />
     </PersistGate>
   </Provider>
  </BrowserRouter>,
)
