import {navigate} from "react-router-dom"

const AdminProtected =({children}) => {
     //in this lesson,we check for admin status from localstorage
     //In lesson 7,this will use authentication service 

     const isAdmin =JSON.parse(localStorage.getItem("adminUser ")) || false;

     return isAdmin ? children :<Navigate to="/login" />
}
export default AdminProtected 