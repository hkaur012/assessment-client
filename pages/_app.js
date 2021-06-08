import 'tailwindcss/tailwind.css'
import Axios from 'axios'

Axios.defaults.baseURL = 'http://127.0.0.1:5000/api'


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
