

// First Run : json-server --watch db.json --port 3333

import { ref } from "vue";
import axios from "axios";
import { useRouter  } from "vue-router";
import Cookies from "js-cookie";
import { BaseURL } from "../../env.js";

const router = useRouter()
export default function useUser() {
    const Userurl = BaseURL + "user";
    const personalData = BaseURL + "profile";
    const LeaveData = BaseURL + "Leave";
    const EmployeesTime = BaseURL + "EmployeesTime";
    const token = Cookies.get('fmljwt')
    let UserData = ref([]); 
    let UserAttendace = ref([]); 
    let UserAttendace_id = ref([]); 
    let ErrorMessage = ref(null);
    let statusCode = ref(null);
    let router = useRouter();

    let userLoginData = ref([]);

  //   Add Student Data
  const createUser = async (formData) => {
    UserData.value = [];
    ErrorMessage.value = null;
    statusCode.value = null;
    try {
      const Form = new FormData()
      Form.append('name' , formData.name)
      Form.append('email', formData.email)
      Form.append('password' , formData.password)
      Form.append('mobile_no' , formData.mobile_no)
      Form.append('designation' , formData.designation)
      Form.append('Doj' , formData.Doj)
      Form.append('Dob' , formData.Dob)
      Form.append('salary' , formData.salary)
      Form.append('role' , formData.role)
      const res = await axios.post(Userurl + '/create/user' ,Form , { headers: { "Authorization": `Bearer ${token}` } } );
      console.log('res', res)
      if(res.data.response_code == 200){
        router.push({ name: 'Userlist' });
      }else{
        ErrorMessage.value = res.data.response_message
      }
    } catch (err) {
      ErrorMessage.value = err;
    }
  };
  
  const AllUserGet = async () => {
    UserData.value = [];
    ErrorMessage.value = null;
    statusCode.value = null;
    try {
      const res = await axios.post(Userurl + '/AllUserGet');
      if(res.data.response_code == 200){
        UserData.value = res.data.response_message
      }else{
        ErrorMessage.value = res.data.response_message
      }
    } catch (err) {
      ErrorMessage.value = err;
    }
  };

  const createUserAbout = async (formData) => {
    try {
        UserData.value = [];
        ErrorMessage.value = null;
        statusCode.value = null;
      const Form = new FormData()
      Form.append('user_id' , formData.user_id)
      Form.append('Salutation', formData.Salutation)
      Form.append('First_Name' , formData.First_Name)
      Form.append('Middle_Name' , formData.Middle_Name)
      Form.append('Last_Name' , formData.Last_Name)
      Form.append('Preferred_Name' , formData.Preferred_Name)
      Form.append('About_Yourself' , formData.About_Yourself)
      const res = await axios.post(personalData + '/create/user/profile/about' ,Form ,{ headers: { "Authorization": `Bearer ${token}` } });
    } catch (err) {
      ErrorMessage.value = err;
    }
  };

  const createUserBiodata = async (formData) => {
    try {
        UserData.value = [];
        ErrorMessage.value = null;
        statusCode.value = null;
      const Form = new FormData()
      Form.append('user_id' , formData.user_id)
      Form.append('Gender', formData.Gender)
      Form.append('Blood_Group' , formData.Blood_Group)
      Form.append('Gender_pronoun' , formData.Gender_pronoun)
      Form.append('Challenged' , formData.Challenged)
      Form.append('Marital_status' , formData.Marital_status)
      Form.append('Your_spouse_partners_name' , formData.Your_spouse_partners_name)
      const res = await axios.post(personalData + '/biodata/create/user/profile/biodata' ,Form ,{ headers: { "Authorization": `Bearer ${token}` } });
      console.log('res', res)
    } catch (err) {
      ErrorMessage.value = err;
    }
  };

  const createUserImportantdates = async (formData) => {
    try {
        UserData.value = [];
        ErrorMessage.value = null;
        statusCode.value = null;
      const Form = new FormData()
      Form.append('user_id' , formData.user_id)
      Form.append('Birth_date', formData.Birth_date)
      Form.append('partner_birth_date' , formData.partner_birth_date)
      Form.append('Marriage_anniversary' , formData.Marriage_anniversary)
      const res = await axios.post(personalData + '/importantDate/create/user/profile/importantDate' ,Form ,{ headers: { "Authorization": `Bearer ${token}` } });
    } catch (err) {
      ErrorMessage.value = err;
    }
  };

  const createUserworkdetails = async (formData) => {
    try {
        UserData.value = [];
        ErrorMessage.value = null;
        statusCode.value = null;
      const Form = new FormData()
      Form.append('user_id', formData.user_id)
      Form.append('DOJ', formData.DOJ)
      Form.append('Employment_Stage', formData.Employment_Stage)
      Form.append('Employment_Type' , formData.Employment_Type)
      Form.append('Employment_Grade' , formData.Employment_Grade)
      Form.append('Self_Service', formData.Self_Service)
      Form.append('Probation_End_Date' , formData.Probation_End_Date)
      Form.append('Date_of_Confirmation' , formData.Date_of_Confirmation)
      Form.append('Notice_period_start_date' , formData.Notice_period_start_date)
      Form.append('Exit_date' , formData.Exit_date)
      const res = await axios.post(personalData + '/workdetails/create/user/profile/workdetails' ,Form ,{ headers: { "Authorization": `Bearer ${token}` } });
    } catch (err) {
      ErrorMessage.value = err;
    }
  };

  const createUserreportingoffice = async (formData) => {
    try {
        UserData.value = [];
        ErrorMessage.value = null;
        statusCode.value = null;
      const Form = new FormData()
      Form.append('user_id', formData.user_id)
      Form.append('reporting_office', formData.reporting_office)
      const res = await axios.post(personalData + '/reporting/create/user/profile/reporting' ,Form ,{ headers: { "Authorization": `Bearer ${token}` } });
    } catch (err) {
      ErrorMessage.value = err;
    }
  };

  const createUsercurrentexperience = async (formData) => {
    try {
        UserData.value = [];
        ErrorMessage.value = null;
        statusCode.value = null;
      const Form = new FormData()
      Form.append('user_id', formData.user_id)
      Form.append('disignation', formData.disignation)
      Form.append('company', formData.company)
      Form.append('DOJ', formData.DOJ)
      const res = await axios.post(personalData + '/currentEX/create/user/profile/currentEX' ,Form ,{ headers: { "Authorization": `Bearer ${token}` } });
    } catch (err) {
      ErrorMessage.value = err;
    }
  };

  const GetUserLeaveStatus = async () => {
    try {
        UserData.value = [];
        ErrorMessage.value = null;
        statusCode.value = null;
      const res = await axios.post(LeaveData + '/All/get/user/Leave/Apply_leave' ,{} ,{ headers: { "Authorization": `Bearer ${token}` } });
      if(res.data.status === true){
        UserData.value = res.data.response_message
      }
    } catch (err) {
      ErrorMessage.value = err;
    }
  };


  const UpdateUserLeave = async(id , Data) =>{
    try {
        const Form = new FormData()
        Form.append('Leave_status' , true)
        const res = await axios.post(LeaveData + '/update/user/Leave/Apply_leave/' + id ,Form );
        console.log('res', res)
        } catch (error) {
            console.log(error)
        }
  }

  const deleteuserLeave = async(id) =>{
    try {
    const res = await axios.post(LeaveData + '/delete/user/Leave/Apply_leave/' + id ,{},{ headers: { "Authorization": `Bearer ${token}` } });
    } catch (error) {
        console.log(error)
    }
  }

  const GetUserAttendance = async (Data) => {
    try {
        UserAttendace.value = [];
        ErrorMessage.value = null;
        statusCode.value = null;
        const Form = new FormData()
        Form.append('id' , Data.selectedUserId)
        Form.append('year' , Data.selectedYear)
        Form.append('month' , Data.selectedMonth)
        const res = await axios.post(EmployeesTime + '/Admin_get/user/EmployeesTime' , Form , { headers: { "Authorization": `Bearer ${token}` } });
        console.log('res', res)
      if(res.data.status === true){
        UserAttendace.value = res.data.response_message
      }
    } catch (err) {
      ErrorMessage.value = err;
    }
  };

  const get_EmployeesTime_id = async (id) => {
    try {
        UserAttendace_id.value = [];
        ErrorMessage.value = null;
        statusCode.value = null;
        const res = await axios.post(EmployeesTime + '/Admin_get/user/EmployeesTime/' + id );
        console.log('res', res.data.response_message)
        UserAttendace_id.value = res.data.response_message
      
    } catch (err) {
      ErrorMessage.value = err;
    }
  };

  const UpdateEmployeeTimeData = async (id ,formData) => {
    try {
      const response = await axios.post(
        EmployeesTime + "/Admin_update/user/EmployeesTime/" + id,
        formData
      );
      console.log('response', response)
      UserAttendace.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    UserData,
    UserAttendace,
    UserAttendace_id,
    ErrorMessage,
    statusCode,
    userLoginData,
    createUser,
    AllUserGet,
    createUserAbout,
    createUserBiodata,
    createUserImportantdates,
    createUserworkdetails,
    createUserreportingoffice,
    createUsercurrentexperience,
    GetUserLeaveStatus,
    UpdateUserLeave,
    deleteuserLeave,
    GetUserAttendance,
    get_EmployeesTime_id,
    UpdateEmployeeTimeData
  };
}
