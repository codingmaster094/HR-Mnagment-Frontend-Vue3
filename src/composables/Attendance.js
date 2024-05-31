import { onMounted, ref } from "vue";
import axios from "axios";
import { BaseURL } from "../../env.js";
import Cookies from "js-cookie";

export default function useAttendance() {
  const token = Cookies.get("fmljwt");
  let atendanceurl = BaseURL + "attendance";
  let EmployeeUrl = BaseURL + "EmployeesTime";
  let attendanceGetData = ref([]);
  let attendanceLeaveGetData = ref([]);
  let EmployeeTimeGetData = ref([]);
  let ErrorattendanceMessage = ref(null);


  const Attendance_present_create = async(formData)=>{
    try { 
      const Form = new FormData()
      Form.append('date', formData.date)
      Form.append('attendace_status' , formData.attendace_status)
      const result = await axios.post(atendanceurl + '/create/user/attendance' ,Form , { headers: { "Authorization": `Bearer ${token}` } });
      console.log('', )
    } catch (err) {
      ErrorMessage.value = err;
    }
  }

  const getAllAttendance_report = async (formdata) => {
    attendanceGetData.value = [];
    attendanceLeaveGetData.value = [];
    ErrorattendanceMessage.value = null;
    try {
      const res = await axios.post(atendanceurl + "/get/user/attendance",formdata,{ headers: { Authorization: `Bearer ${token}` } });
      if(res.data.status == true){
        attendanceGetData.value = res.data.response_message;
        attendanceLeaveGetData.value = res.data.data;
      }else{
        attendanceGetData.value = res.data.response_message;
      }
      // currentRecord.value = res.data.response_message; // Update currentRecord with new data // Update local storage
    } catch (err) {
      ErrorattendanceMessage.value = err;
    }
  };

  const EmployeeGetData = async () => {
    EmployeeTimeGetData.value = [];
    try {
      const res = await axios.post(EmployeeUrl + "/get/user/EmployeesTime",{},{ headers: { Authorization: `Bearer ${token}` } });
      if(res.data.status == true){
        EmployeeTimeGetData.value = res.data.response_message;
      }else{
        EmployeeTimeGetData.value = res.data.data;
      }
      // currentRecord.value = res.data.response_message; // Update currentRecord with new data // Update local storage
    } catch (err) {
      ErrorattendanceMessage.value = err;
    }
  };


  return {
    attendanceGetData,
    ErrorattendanceMessage,
    attendanceLeaveGetData,
    EmployeeTimeGetData,
    Attendance_present_create,
    getAllAttendance_report,
    EmployeeGetData
  };
}
