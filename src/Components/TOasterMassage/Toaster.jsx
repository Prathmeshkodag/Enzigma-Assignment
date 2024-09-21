import React, { useEffect } from "react";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Toaster({
    newtaskadd,
    taskdelete,
    edittask,
}){

    useEffect(()=>{
        if(newtaskadd==true){
            toast.success('New Task Added Successfully', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: 0,
                theme: "colored",
                transition: Zoom,
                style: { backgroundColor: 'green', color: 'white' } 
                });
        }
       },[newtaskadd]);
       useEffect(()=>{
        if(taskdelete==true){
            toast.success(' Task Deleted Successfully', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: 0,
                theme: "colored",
                transition: Zoom,
                style: { backgroundColor: 'red', color: 'white' } 
                });
        }
       },[taskdelete]);

       useEffect(()=>{
        if(edittask==true){
            toast.success(' Task Updated Successfully', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: 0,
                theme: "colored",
                transition: Zoom,
                style: { backgroundColor: '#ffc107', color: 'white' } 
                });
        }
       },[edittask]);
    return (
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Zoom}  
        />
      );
};

export default Toaster;
