import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from ".//pages/Home";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/cors/Auth/OpenRoute";
import ProtectRoute from "./components/cors/Auth/ProtectRoute";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import MyProfile from "./components/cors/Dashboard/MyProfile";
import { useSelector } from "react-redux";
import Settings from "./components/cors/Dashboard/settings/Index";
import { ACCOUNT_TYPE } from "./utils/constants";
import Cart from "./components/cors/Dashboard/Cart"
import EnrolledCourses from "./components/cors/EnrolledCourses";
import AddCourse from "./components/cors/Dashboard/AddCourse";
import MyCourses from "./components/cors/Dashboard/MyCourses";
import EditCourse from "./components/cors/Dashboard/EditCourse";
import Catalog from "./pages/Catalog"
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/cors/ViewCourse/VideoDetails";
import Instructor from "./components/cors/Dashboard/instructorDashboard/Instructor";
function App() {

  const {user}=useSelector((state)=>state.profile);

  return (
    <div className={ "w-screen min-h-screen bg-richblack-900 flex flex-col font-inter"}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="catalog/:catalogName" element={<Catalog/>} />
        <Route path="courses/:courseId" element={<CourseDetails/>} />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
    <Route
          path="login"
          element={
            <OpenRoute>
              <Login/>
            </OpenRoute>
          }
        />

<Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />  

      <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />  

    <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />  

    <Route
          path="about"
          element={
            
              <About
               />
        
          }
        />  

        <Route
        element={
          <ProtectRoute>
            <Dashboard />
          </ProtectRoute>
        }>

          <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
          <Route path="/dashboard/settings" element={<Settings/>}/>

          {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route path="dashboard/cart" element={<Cart />} />
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
          </>
        )
          }

{
        user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
          <>
          <Route path="dashboard/instructor" element={<Instructor />} />
          <Route path="dashboard/add-course" element={<AddCourse />} />
          <Route path="dashboard/my-courses" element={<MyCourses />} />
          <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
          
          </>
        )
      }
        </Route>

        <Route element={
        <ProtectRoute>
          <ViewCourse />
        </ProtectRoute>
      }>

      {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route 
            path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
            element={<VideoDetails />}
          />
          </>
        )
      }

      </Route>


      </Routes>

     
      </div>
  );
}

export default App;
