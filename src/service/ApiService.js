import axios from 'axios';

const COVID_CONTROLLER_IP = 'http://192.168.0.45' //http://localhost';

//const COVID_CONTROLLER_IP = 'http://192.168.0.200' //http://localhost';



const USER_API_BASE_URL = COVID_CONTROLLER_IP +':8081/users';
const EMPLOYEE1_API_BASE_URL = COVID_CONTROLLER_IP +':8081/245678342/ighklsd'; //used to fetch single employee record by user id

const VISITOR1_API_BASE_URL = COVID_CONTROLLER_IP +':8081/245678342/ighklsd1'; //used to fetch single visitor record by user id

const AUTH_API_BASE_URL = COVID_CONTROLLER_IP +':8081/auth';
const DOCT_API_BASE_URL = COVID_CONTROLLER_IP +':8081/doctables';
const DOCT_API_BASE_URL1 = COVID_CONTROLLER_IP +':8081/doctabless';
const JOBT_API_BASE_URL = COVID_CONTROLLER_IP +':8081/jobtables';
const WCT_API_BASE_URL = COVID_CONTROLLER_IP +':8081/workcenters';



class ApiService {

	//******************** users table *****************
    fetchUsers() {
        return axios.get(USER_API_BASE_URL);
    }

    fetchUserById(userId) {
        return axios.get(USER_API_BASE_URL + '/' + userId);
    }

    deleteUser(userId) {
        return axios.delete(USER_API_BASE_URL + '/' + userId);
    }

    addUser(user) {
        return axios.post(""+USER_API_BASE_URL, user);
    }

    editUser(user) {
        return axios.put(USER_API_BASE_URL + '/' + user.id, user);
    }
//******************************************************
		
		
//******************** workcenter table Transaction table *****************
		fetchWcrows() {
        return axios.get(WCT_API_BASE_URL);
    }

    fetchWcrow(empId) {
        return axios.get(WCT_API_BASE_URL + '/' + empId);
    }

    fetchWcrowById(empId) {
        return axios.get(WCT_API_BASE_URL + '/' + empId);
    }

    deleteWcrow(empId) {
        return axios.delete(WCT_API_BASE_URL + '/' + empId);
    }

    addWcrow(emp) {
        return axios.post(""+WCT_API_BASE_URL, emp);
    }

    editWcrow(emp) {
        return axios.put(WCT_API_BASE_URL + '/' + emp.emp_id, emp);
    }
 
//******************************************************

//******************** Jobtable Transaction table *****************
		fetchJobrows() {
        return axios.get(JOBT_API_BASE_URL);
    }

    fetchJobrow(empId) {
        return axios.get(JOBT_API_BASE_URL + '/' + empId);
    }

    fetchJobrowById(empId) {
        return axios.get(JOBT_API_BASE_URL + '/' + empId);
    }

    deleteJobrow(empId) {
        return axios.delete(JOBT_API_BASE_URL + '/' + empId);
    }

    addJobrow(emp) {
        return axios.post(""+JOBT_API_BASE_URL, emp);
    }

    editJobrow(emp) {
        return axios.put(JOBT_API_BASE_URL + '/' + emp.emp_id, emp);
    }
 
//******************************************************

	//******************** employee Email Service *****************
    emailEmployee(empId) {
        //return axios.get(EMPLOYEE_API_BASE_URL + '/email/' + empId);
    }

//******************************************************



		
//******************** Doctable Transaction table *****************
		fetchDocrows() {
        return axios.get(DOCT_API_BASE_URL);
    }
		
		fetchDocrows1(empId) {
        return axios.get(DOCT_API_BASE_URL1 + '/' + empId);
    }
		
		
    fetchDocrow(empId) {
        return axios.get(DOCT_API_BASE_URL + '/' + empId);
    }

    fetchDocrowById(empId) {
        return axios.get(DOCT_API_BASE_URL + '/' + empId);
    }

    deleteDocrow(empId) {
        return axios.delete(DOCT_API_BASE_URL + '/' + empId);
    }

    addDocrow(emp) {
        return axios.post(""+DOCT_API_BASE_URL, emp);
    }

    editDocrow(emp) {
        return axios.put(DOCT_API_BASE_URL + '/' + emp.emp_id, emp);
    }
 
//******************************************************
		
/************ Authentication services ****************/
    getAuthenticated(auth){
        return axios.post(""+AUTH_API_BASE_URL, auth);
    }			
		
    ChkMyToken(token){
			  if(token ==""){
					token="hello";
				}
        return axios.get(""+AUTH_API_BASE_URL+'/' + token);
    }			
		
		
}

export default new ApiService();