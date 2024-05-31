// First Run : json-server --watch db.json --port 3333

import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { BaseURL } from "../../env.js";
import Cookies from "js-cookie";

export default function useUserLeave() {
  const UserurlLeave = BaseURL + "Leave";
  const Userurl = BaseURL + "user";
  const token = Cookies.get("fmljwt");
  let UserLeaveData = ref([]);
  let CalenderLeaveData = ref([]);
  let CelebrateEvents = ref([]);
  let LeaveBalance = ref([]);
  let ErrorLeaveMessage = ref(null);
  let statusLeaveCode = ref(null);

  let userLoginData = ref([]);

  //   Add Student Data
  const createUserLeave = async (formData) => {
    UserLeaveData.value = [];
    ErrorLeaveMessage.value = null;
    statusLeaveCode.value = null;

    try {
      const Form = new FormData();
      Form.append("Leave_type", formData.Leave_type);
      Form.append("leave_for", formData.leave_for);
      Form.append("leave_date", formData.leave_date);
      Form.append("leave_end_date", formData.leave_end_date);
      Form.append("Leave_is_for", formData.Leave_is_for);
      Form.append("From_Time", formData.From_Time);
      Form.append("To_Time", formData.To_Time);
      Form.append("recipients", formData.recipients);
      Form.append("Reason", formData.Reason);
      Form.append("Upload_file", formData.Upload_file);
      const res = await axios.post(
        UserurlLeave + "/create/user/Leave/Apply_leave",
        Form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res);
    } catch (err) {
      ErrorLeaveMessage.value = err;
    }
  };

  const AllUserGet = async () => {
    try {
      CelebrateEvents.value = [];
      const response = await axios.post(
        Userurl + "/user/AllUserGet",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      CelebrateEvents.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  const get_UserLeave = async () => {
    try {
      CalenderLeaveData.value = [];
      const response = await axios.post(
        UserurlLeave + "/get/user/Leave/Apply_leave",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      CalenderLeaveData.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  const get_UserLeave_id = async (id) => {
    try {
      const response = await axios.post(
        UserurlLeave + "/get/user/Leave/Apply_leave/" + id,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserLeaveData.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateUserprofile_UserLeave = async (id, custom_doc, file) => {
    try {
      const Form = new FormData();
      Form.append("Custom_document", custom_doc);
      Form.append("Attachments", file);
      const response = await axios.post(
        UserurlLeave + "/update/user/Leave/Apply_leave/" + id,
        Form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("response", response);
      UserLeaveData.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteUserprofile_UserLeave = async (id) => {
    try {
      const response = await axios.post(
        UserurlLeave + "/delete/user/Leave/Apply_leave/" + id,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserLeaveData.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  const FilterYearfun = async (year) => {
    try {
      const Form = new FormData();
      Form.append("year", year);
      const response = await axios.post(
        UserurlLeave + "/searching/user/Leave/Apply_leave_year/",
        Form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.status === true) {
        UserLeaveData.value = response.data.response_message;
      } else {
        UserLeaveData.value = response.data.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const LeaveType_getData = async (year, LeaveType) => {
    try {
      const Form = new FormData();
      Form.append("year", year);
      Form.append("LeaveType", LeaveType);
      const response = await axios.post(
        UserurlLeave + "/Leave/user/Leave/Apply_leave_year/",
        Form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("response", response);
      if (response.data.status === true) {
        LeaveBalance.value = response.data.response_message;
      } else {
        LeaveBalance.value = response.data.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    CalenderLeaveData,
    CelebrateEvents,
    LeaveBalance,
    UserLeaveData,
    ErrorLeaveMessage,
    statusLeaveCode,
    createUserLeave,
    AllUserGet,
    get_UserLeave,
    get_UserLeave_id,
    UpdateUserprofile_UserLeave,
    DeleteUserprofile_UserLeave,
    FilterYearfun,
    LeaveType_getData,
  };
}
