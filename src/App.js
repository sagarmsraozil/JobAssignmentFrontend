import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './style.css';
import { ToastProvider } from 'react-toast-notifications';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 

//components import
import Header from './assignmentComponents/header';
import ProjectRoute from './assignmentComponents/projectRoute';

function App() {
  return (
    <div className="App">
        <ToastProvider placement="top-center">
            <BrowserRouter>
                <Header/>
                <ProjectRoute/>
            </BrowserRouter>
        </ToastProvider>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
      />
    </div>
  );
}

export default App;
