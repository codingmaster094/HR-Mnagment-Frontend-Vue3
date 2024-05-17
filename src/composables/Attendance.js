import { onMounted, ref } from "vue";
import axios from "axios";
import { BaseURL } from "../../env.js";
import Cookies from "js-cookie";

export default function useAttendance() {
  const token = Cookies.get("fmljwt");
  let atendanceurl = BaseURL + "attendance";
  let attendanceGetData = ref([]);
  let ErrorattendanceMessage = ref(null);


  const getAllAttendance_report = async () => {
    attendanceGetData.value = [];
    ErrorattendanceMessage.value = null;
    try {
      const res = await axios.post(
        atendanceurl + "/get/user/attendance",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if(res.data.status == true){
        attendanceGetData.value = res.data.response_message;
      }else{
        attendanceGetData.value = res.data.response_message;
      }
      // currentRecord.value = res.data.response_message; // Update currentRecord with new data // Update local storage
    } catch (err) {
      ErrorattendanceMessage.value = err;
    }
  };


  return {
    attendanceGetData,
    ErrorattendanceMessage,
    getAllAttendance_report,
  };
}
