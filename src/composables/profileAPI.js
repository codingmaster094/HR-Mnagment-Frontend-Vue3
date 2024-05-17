import { ref } from "vue";
import axios from "axios";
import Cookies from "js-cookie";
import { BaseURL } from './../../env.js';

export default function useProfile() {
  const token = Cookies.get("fmljwt");
  // about
  const profileurl = BaseURL + "profile";
  let UserDataprofile = ref([]);
  let ErrorMessageprofile = ref(null);
  let statusCodeprofile = ref(null);

  const get_user_profile_about = async () => {
    try {
      const response = await axios.post(
        profileurl + "/get/user/profile/about",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofile.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateUserprofile = async (formData) => {
    try {
      const response = await axios.post(
        profileurl + "/update/user/profile/about",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofile.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  //  Address
  const profileurladdress = BaseURL + "profile/address";
  let UserDataprofileadd = ref([]);
  let ErrorMessageprofileadd = ref(null);
  let statusCodeprofileadd = ref(null);
  const create_addres = async (formdata) => {
    try {
      const response = await axios.post(
        profileurladdress + "/create/user/profile/address",
        formdata,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const get_user_profile_address = async () => {
    try {
      const response = await axios.post(
        profileurladdress + "/get/user/profile/address",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.status == true) {
        UserDataprofileadd.value = response.data.response_message;
      } else {
        UserDataprofileadd.value = response.data.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const get_user_id_profile_address = async (id) => {
    try {
      const response = await axios.post(
        profileurladdress + "/get/user/profile/address/" + id,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofileadd.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateUserprofile_address = async (id, formData) => {
    try {
      const Form = new FormData();
      Form.append("Add_line_one", formData);
      const response = await axios.post(
        profileurladdress + "/update/user/profile/address/" + id,
        Form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofileadd.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };
  const DeleteUserprofile_address = async (id) => {
    try {
      const response = await axios.post(
        profileurladdress + "/delete/user/profile/address/" + id,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofileadd.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  //   Contact
  const profileurlcontact = BaseURL + "profile/contact";
  let UserDataprofilecontact = ref([]);
  let ErrorMessageprofilecontact = ref(null);
  let statusCodeprofilecontact = ref(null);

  const create_contact = async (formdata) => {
    try {
      const response = await axios.post(
        profileurlcontact + "/create/user/profile/contact",
        formdata,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const get_user_profile_contact = async () => {
    try {
      const response = await axios.post(
        profileurlcontact + "/get/user/profile/contact",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.status == true) {
        UserDataprofilecontact.value = response.data.response_message;
      } else {
        UserDataprofilecontact.value = response.data.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const get_user_id_profile_contact = async (id) => {
    try {
      const response = await axios.post(
        profileurlcontact + "/get/user/profile/contact/" + id,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofilecontact.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateUserprofile_contact = async (id, formData) => {
    try {
      const Form = new FormData();
      Form.append("contact", formData);
      const response = await axios.post(
        profileurlcontact + "/update/user/profile/contact/" + id,
        Form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofilecontact.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteUserprofile_contact = async (id) => {
    try {
      const response = await axios.post(
        profileurlcontact + "/delete/user/profile/contact/" + id,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofilecontact.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };


  // Biodata
  const profileurlBiodata = BaseURL + "profile/biodata";
  let UserDataprofilebiodata = ref([]);
  let ErrorMessageprofilebiodata = ref(null);
  let statusCodeprofilebiodata = ref(null);

  const get_user_profile_biodata = async () => {
    try {
      const response = await axios.post(
        profileurlBiodata + "/get/user/profile/biodata",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofilebiodata.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateUserprofile_biodata = async (formData) => {
    try {
      const response = await axios.post(
        profileurlBiodata + "/update/user/profile/biodata",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofilebiodata.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };


   // Importan Dates
   const profileurl_importantDate = BaseURL + "profile/importantDate";
   let UserDataprofile_importantDate = ref([]);
   let ErrorMessageprofile_importantDate = ref(null);
   let statusCodeprofile_importantDate = ref(null);

  const get_user_profile_importantDate = async () => {
    try {
      const response = await axios.post(
        profileurl_importantDate + "/get/user/profile/importantDate",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofile_importantDate.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateUserprofile_importantDate = async (formData) => {
    try {
      const response = await axios.post(
        profileurl_importantDate + "/update/user/profile/importantDate",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofile.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };


//   dependents
  const profileurl_dependents = BaseURL + "profile/dependents";
  let UserDataprofile_dependents = ref([]);
  let ErrorMessageprofile_dependents = ref(null);
  let statusCodeprofile_dependents = ref(null);

  const create_dependents = async (formdata) => {
    try {
      const response = await axios.post(
        profileurl_dependents + "/create/user/profile/dependents",
        formdata,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofile_dependents.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  const get_dependents = async () => {
    try {
      const response = await axios.post(
        profileurl_dependents + "/get/user/profile/dependents",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofile_dependents.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  const get_dependents_id = async (id) => {
    try {
      const response = await axios.post(
        profileurl_dependents + "/get/user/profile/dependents/" + id,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofile_dependents.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateUserprofile_dependents = async (id ,formData) => {
    try {
      const response = await axios.post(
        profileurl_dependents + "/update/user/profile/dependents/" + id,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('response', response)
      UserDataprofile_dependents.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteUserprofile_dependents = async (id) => {
    try {
      const response = await axios.post(
        profileurl_dependents + "/delete/user/profile/dependents/" + id,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofile_dependents.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };


   // Work Details
   const profileurl_workdetails = BaseURL + "profile/workdetails";
   let UserDataprofile_workdetails = ref([]);
   let ErrorMessageprofile_workdetails = ref(null);
   let statusCodeprofile_workdetails = ref(null);

  const get_user_profile_workdetails = async () => {
    try {
      const response = await axios.post(
        profileurl_workdetails + "/get/user/profile/workdetails",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofile_workdetails.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  // Reporting Details
  const profileurl_reporting = BaseURL + "profile/reporting";
  let UserDataprofile_reporting = ref([]);
  let ErrorMessageprofile_reporting = ref(null);
  let statusCodeprofile_reporting = ref(null);

 const get_user_profile_reporting = async () => {
   try {
     const response = await axios.post(
       profileurl_reporting + "/get/user/profile/reporting",
       {},
       { headers: { Authorization: `Bearer ${token}` } }
     );
     UserDataprofile_reporting.value = response.data.response_message;
   } catch (error) {
     console.log(error);
   }
 };

   // Reporting Details
   const profileurl_currentEX = BaseURL + "profile/currentEX";
   let UserDataprofile_currentEX = ref([]);
   let ErrorMessageprofile_currentEX = ref(null);
   let statusCodeprofile_currentEX = ref(null);
 
  const get_user_profile_currentEX = async () => {
    try {
      const response = await axios.post(
        profileurl_currentEX + "/get/user/profile/currentEX",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofile_currentEX.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  //   Past Experience
  const profileurl_pastEX = BaseURL + "profile/pastEX";
  let UserDataprofile_pastEX = ref([]);
  let ErrorMessageprofile_pastEX = ref(null);
  let statusCodeprofile_pastEX = ref(null);

  const create_pastEX = async (formdata) => {
    try {
      const response = await axios.post(
        profileurl_pastEX + "/create/user/profile/pastEX",
        formdata,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofile_pastEX.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  const get_pastEX = async () => {
    try {
      const response = await axios.post(
        profileurl_pastEX + "/get/user/profile/pastEX",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofile_pastEX.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  const get_pastEX_id = async (id) => {
    try {
      const response = await axios.post(
        profileurl_pastEX + "/get/user/profile/pastEX/" + id,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofile_pastEX.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateUserprofile_pastEX = async (id ,formData) => {
    try {
      const response = await axios.post(
        profileurl_pastEX + "/update/user/profile/pastEX/" + id,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('response', response)
      UserDataprofile_pastEX.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteUserprofile_pastEX = async (id) => {
    try {
      const response = await axios.post(
        profileurl_pastEX + "/delete/user/profile/pastEX/" + id,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofile_pastEX.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };


  //   Identity
  const profileurl_identity = BaseURL + "profile/identity";
  let UserDataprofile_identity = ref([]);
  let ErrorMessageprofile_identity = ref(null);
  let statusCodeprofile_identity = ref(null);

  const create_identity = async (formdata) => {
    try {
      const Form = new FormData()
      Form.append("Custom_document" , formdata.Custom_document)
      Form.append("Attachments" , formdata.Attachments)
      const response = await axios.post(
        profileurl_identity + "/create/user/profile/identity",
        Form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofile_identity.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  const get_identity = async () => {
    try {
      const response = await axios.post(
        profileurl_identity + "/get/user/profile/identity",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofile_identity.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  const get_identity_id = async (id) => {
    try {
      const response = await axios.post(
        profileurl_identity + "/get/user/profile/identity/" + id,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofile_identity.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateUserprofile_identity = async (id ,custom_doc , file) => {
    try {
      const Form = new FormData()
      Form.append("Custom_document" , custom_doc)
      Form.append("Attachments" , file)
      const response = await axios.post(
        profileurl_identity + "/update/user/profile/identity/" + id,
        Form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('response', response)
      UserDataprofile_identity.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteUserprofile_identity = async (id) => {
    try {
      const response = await axios.post(
        profileurl_identity + "/delete/user/profile/identity/" + id,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofile_identity.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  //   Others
  const profileurl_Others = BaseURL + "profile/Other";
  let UserDataprofile_Others = ref([]);
  let ErrorMessageprofile_Others = ref(null);
  let statusCodeprofile_Others = ref(null);

  const create_Others = async (formdata) => {
    try {
      const Form = new FormData()
      Form.append("Custom_document" , formdata.Custom_document)
      Form.append("Attachments" , formdata.Attachments)
      const response = await axios.post(
        profileurl_Others + "/create/user/profile/Others",
        Form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofile_Others.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  const get_Others = async () => {
    try {
      const response = await axios.post(
        profileurl_Others + "/get/user/profile/Others",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofile_Others.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  const get_Others_id = async (id) => {
    try {
      const response = await axios.post(
        profileurl_Others + "/get/user/profile/Others/" + id,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofile_Others.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateUserprofile_Others = async (id ,custom_doc , file) => {
    try {
      const Form = new FormData()
      Form.append("Custom_document" , custom_doc)
      Form.append("Attachments" , file)
      const response = await axios.post(
        profileurl_Others + "/update/user/profile/Others/" + id,
        Form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('response', response)
      UserDataprofile_Others.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteUserprofile_Others = async (id) => {
    try {
      const response = await axios.post(
        profileurl_Others + "/delete/user/profile/Others/" + id,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofile_Others.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };


  //   Bank Add
  const profileurl_bankDetails = BaseURL + "profile/bankDetails";
  let UserDataprofile_bankDetails = ref([]);
  let ErrorMessageprofile_bankDetails = ref(null);
  let statusCodeprofile_bankDetails = ref(null);

  const create_bankDetails = async (formdata) => {
    try {
      const response = await axios.post(
        profileurl_bankDetails + "/create/user/profile/bankDetails",
        formdata,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofile_bankDetails.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  const get_bankDetails = async () => {
    try {
      const response = await axios.post(
        profileurl_bankDetails + "/get/user/profile/bankDetails",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofile_bankDetails.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  const get_bankDetails_id = async (id) => {
    try {
      const response = await axios.post(
        profileurl_bankDetails + "/get/user/profile/bankDetails/" + id,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofile_bankDetails.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateUserprofile_bankDetails = async (id ,formData) => {
    try {
      const response = await axios.post(
        profileurl_bankDetails + "/update/user/profile/bankDetails/" + id,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('response', response)
      UserDataprofile_bankDetails.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteUserprofile_bankDetails = async (id) => {
    try {
      const response = await axios.post(
        profileurl_bankDetails + "/delete/user/profile/bankDetails/" + id,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      UserDataprofile_bankDetails.value = response.data.response_message;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    // About
    UserDataprofile,
    ErrorMessageprofile,
    statusCodeprofile,
    UpdateUserprofile,
    get_user_profile_about,

    // Address
    UserDataprofileadd,
    ErrorMessageprofileadd,
    statusCodeprofileadd,
    create_addres,
    get_user_id_profile_address,
    get_user_profile_address,
    UpdateUserprofile_address,
    DeleteUserprofile_address,

    // Contact
    UserDataprofilecontact,
    ErrorMessageprofilecontact,
    statusCodeprofilecontact,
    create_contact,
    get_user_profile_contact,
    get_user_id_profile_contact,
    UpdateUserprofile_contact,
    DeleteUserprofile_contact,

    // Biodata
    UserDataprofilebiodata,
    ErrorMessageprofilebiodata,
    statusCodeprofilebiodata,
    get_user_profile_biodata,
    UpdateUserprofile_biodata,

    // Important Dates
    UserDataprofile_importantDate,
    ErrorMessageprofile_importantDate,
    statusCodeprofile_importantDate,
    get_user_profile_importantDate,
    UpdateUserprofile_importantDate,

    // dependents
    UserDataprofile_dependents,
    ErrorMessageprofile_dependents,
    statusCodeprofile_dependents,
    create_dependents,
    get_dependents,
    get_dependents_id,
    UpdateUserprofile_dependents,
    DeleteUserprofile_dependents,

    // workDetails
    UserDataprofile_workdetails,
    ErrorMessageprofile_workdetails,
    statusCodeprofile_workdetails,
    get_user_profile_workdetails,

    // Reporting
    UserDataprofile_reporting,
    ErrorMessageprofile_reporting,
    statusCodeprofile_reporting,
    get_user_profile_reporting,

    // Current Experience
    UserDataprofile_currentEX,
    ErrorMessageprofile_currentEX,
    statusCodeprofile_currentEX,
    get_user_profile_currentEX,

    // Past Experience
    UserDataprofile_pastEX,
    ErrorMessageprofile_pastEX,
    statusCodeprofile_pastEX,
    create_pastEX,
    get_pastEX,
    get_pastEX_id,
    UpdateUserprofile_pastEX,
    DeleteUserprofile_pastEX,

    // identity
    UserDataprofile_identity,
    ErrorMessageprofile_identity,
    statusCodeprofile_identity,
    create_identity,
    get_identity,
    get_identity_id,
    UpdateUserprofile_identity,
    DeleteUserprofile_identity,

    // other
    UserDataprofile_Others,
    ErrorMessageprofile_Others,
    statusCodeprofile_Others,
    create_Others,
    get_Others,
    get_Others_id,
    UpdateUserprofile_Others,
    DeleteUserprofile_Others,

    // Bank Add
    UserDataprofile_bankDetails,
    ErrorMessageprofile_bankDetails,
    statusCodeprofile_bankDetails,
    create_bankDetails,
    get_bankDetails,
    get_bankDetails_id,
    UpdateUserprofile_bankDetails,
    DeleteUserprofile_bankDetails,
  };
}
