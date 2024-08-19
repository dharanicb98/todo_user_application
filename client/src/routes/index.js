
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Task2 from "../pages/task2";
import Layout from "../components/layout";
import Labels from "../pages/label";

const ProtectedRoutes = () => {
    return (
        <Layout>
        <Routes>
           
           <Route path="/" element={<Home/>}/>
           <Route path="/labels" element={<Labels/>}/>
           <Route path="/task-2" element={<Task2/>}/>
          
        </Routes>
        </Layout>
    )
}

export default ProtectedRoutes;