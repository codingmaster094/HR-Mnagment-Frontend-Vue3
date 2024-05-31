import { ref } from "vue";
import axios from "axios";
import { BaseURL } from '../../env.js';
import Cookies from "js-cookie";

export default function useRole() {
    const baseURL = BaseURL + "user";
    const token = Cookies.get('fmljwt')
    let Role = ref([]);
    let ErrorMessage = ref(null);
    let statusCode = ref(null);

    const RoleAccess = async() => {
        Role.value = [];
        ErrorMessage.value = null;
        statusCode.value = null;
        try {
            const res = await axios.post(baseURL + '/role/access' , {} ,{ headers: { "Authorization": `Bearer ${token}` } });
            if(res.status == 200){
              Role.value = res.data.response_message
            }
          } catch (err) {
            ErrorMessage.value = err;
          }
    }

return{
    Role,
    ErrorMessage,
    statusCode,
    RoleAccess
}
}