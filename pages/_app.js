import "tailwindcss/tailwind.css";
import Axios from "axios";

Axios.defaults.baseURL = "https://hatchway-assessment.herokuapp.com/api";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
