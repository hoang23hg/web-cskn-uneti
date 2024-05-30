import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'animate.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import { persistor, store } from './Services/Redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import dayjsPluginUTC from 'dayjs-plugin-utc'
// import timezone from 'dayjs-timezone-iana-plugin'
import timezone from 'dayjs/plugin/timezone.js'
import utc from 'dayjs/plugin/utc.js'
import { LocalizationProvider } from '@mui/x-date-pickers'
import BackToTop from './Components/BackToTop/BackToTop.jsx'

// Set Vietnamese locale globally
dayjs.extend(utc)
// dayjs.tz('Asia/Ho_Chi_Minh')
dayjs.extend(timezone)
dayjs.locale('vi')

dayjs().tz('Asia/Ho_Chi_Minh')
ReactDOM.createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </LocalizationProvider>
    <ToastContainer />
  </>,
  // </StrictMode>,
)
