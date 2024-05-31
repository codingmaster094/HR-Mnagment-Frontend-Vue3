

// First Run : json-server --watch db.json --port 3333

import { ref } from "vue";
import axios from "axios";
import { useRouter  } from "vue-router";
import { BaseURL } from '../../env.js';
import Cookies from "js-cookie";


export default function useAdmin() {
    const Adminurl = BaseURL + "Admin";
    const token = Cookies.get('fmljwt')
    let AdminData = ref([]); 
    let ErrorMessage = ref(null);
    let statusCode = ref(null);
    let router = useRouter();

  //   Add Student Data
  const createAdmin = async (formData) => {
    AdminData.value = [];
    ErrorMessage.value = null;
    statusCode.value = null;

    try {
      const Form = new FormData()
      Form.append('name' , formData.name)
      Form.append('email', formData.email)
      Form.append('password' , formData.password)
      const res = await axios.post(Adminurl + '/create/Admin' ,Form);
      if(res.data.response_code == 200){
        router.push({ name: 'Login' });
      }else{
        ErrorMessage.value = res.data.response_message
      }
    } catch (err) {
      ErrorMessage.value = err;
    }
  };

  const LoginAdmin = async (formData) => {
    AdminData.value = [];
    ErrorMessage.value = null;
    statusCode.value = null;
    try { 
      const Form = new FormData()
      Form.append('email', formData.email)
      Form.append('password' , formData.password)
      const response = await axios.post(Adminurl + '/login/Admin' ,Form);
      if(response.data.data.response_code == 200){
        Cookies.set('Adminfmljwt', response.data.data.auth, { expires: 1 })
        Cookies.set('_id', response.data.data.data._id, { expires: 1 })
        router.push('/home');
      }else{
        ErrorMessage.value = response.data.data.response_message
      }
    } catch (err) {
      ErrorMessage.value = err;
    }
  };



  const logoutAdmin = async() => {
    const response = await axios.post(Adminurl + "/logout/Admin", {}, { headers: { "Authorization": `Bearer ${token}` } })
      if(response.data.status == true){
        Cookies.remove('Adminfmljwt')
        router.push('/login')
      }
};

  return {
    AdminData,
    ErrorMessage,
    statusCode,
    createAdmin,
    LoginAdmin, 
    logoutAdmin,
  };
}
