

// First Run : json-server --watch db.json --port 3333

import { ref } from "vue";
import axios from "axios";
import { useRouter  } from "vue-router";
import { BaseURL } from '../../env.js';
import Cookies from "js-cookie";


export default function useUser() {
    const Userurl = BaseURL + "user";
    const atendanceurl = BaseURL + "attendance";
    const token = Cookies.get('fmljwt')
    let UserData = ref([]); 
    let ErrorMessage = ref(null);
    let statusCode = ref(null);
    let router = useRouter();

    let userLoginData = ref([]);
    let getAlluserData = ref([]);

  //   Add Student Data
  const createUser = async (formData) => {
    UserData.value = [];
    ErrorMessage.value = null;
    statusCode.value = null;

    try {
      const Form = new FormData()
      Form.append('name' , formData.name)
      Form.append('mobile_no' , formData.mobile_no)
      Form.append('designation' , formData.designation)
      Form.append('email', formData.email)
      Form.append('password' , formData.password)
      const res = await axios.post(Userurl + '/create/user' ,Form);
      if(res.data.response_code == 200){
        router.push({ name: 'Login' });
      }else{
        ErrorMessage.value = res.data.response_message
      }
    } catch (err) {
      ErrorMessage.value = err;
    }
  };

  const LoginUser = async (formData) => {
    UserData.value = [];
    ErrorMessage.value = null;
    statusCode.value = null;
    try { 
      const Form = new FormData()
      Form.append('email', formData.email)
      Form.append('password' , formData.password)
      const response = await axios.post(Userurl + '/login/user' ,Form);
      if(response.data.data.response_code == 200){
        Cookies.set('fmljwt', response.data.data.auth, { expires: 1 })
        Cookies.set('_id', response.data.data.data._id, { expires: 1 })
        router.push('/home');
      }else{
        ErrorMessage.value = response.data.data.response_message
      }
    } catch (err) {
      ErrorMessage.value = err;
    }
  };



  const logoutUser = async() => {
    const response = await axios.post(Userurl + "/logout", {}, { headers: { "Authorization": `Bearer ${token}` } })
      if(response.data.status == true){
        Cookies.remove('fmljwt')
        Cookies.remove('INOUT')
        Cookies.remove('_id')
        localStorage.removeItem('stopwatchHours');
        localStorage.removeItem('stopwatchMinutes');
        localStorage.removeItem('stopwatchSeconds');
        router.push('/')
      }
};


const AllUserGet = async () => {
  try {
    getAlluserData.value = [];
    const response = await axios.post(
      Userurl + "/AllUserGet",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    getAlluserData.value = response.data.response_message;
  } catch (error) {
    console.log(error);
  }
};

const profileADD = async(formdata) => {
try {
  const Form = new FormData()
  Form.append('profile_image' , formdata.profile_image)
  const response = await axios.post(Userurl + "/PrifileAdd", Form , { headers: { "Authorization": `Bearer ${token}` } })
} catch (error) {
  console.log(error)
}
}

const UserGet = async()=>{
  try {
    userLoginData.value = [];
    try {
      const response = await axios.post(Userurl + '/UserGet', {} ,{ headers: { "Authorization": `Bearer ${token}` } });  
      userLoginData.value = response.data.response_message   
    } catch (error) {
      console.log(error)
    }
  } catch (error) {
    console.log(error)
  }
}


  return {
    UserData,
    ErrorMessage,
    statusCode,
    userLoginData,
    getAlluserData,
    createUser,
    LoginUser, 
    AllUserGet, 
    logoutUser,
    UserGet,
    profileADD
  };
}
