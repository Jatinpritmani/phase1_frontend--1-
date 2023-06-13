import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Login from "./Components/Login/Index";
// import VerifyOtp from "./Components/Login/VerifyOtp";
// import DsdInfo from "./Components/DsdInfo/Index";
// import CheckFloat from "./Components/CheckFloat/Index";
// import AgentList from "./Components/AgentList/Index";
// import PageNotFound from "./Components/PageNotFound";
// import { ProtectedRoutes, SignedInRoutes } from "./Routes/ProtectedRoutes";
// import Layout from "./Layout/index";
// import ChildLayout from "./ChildLayout";
import SignIn from "./component/auth/SignIn";
import SignUp from "./component/auth/SignUp";
import FeedComponent from "./component/Feed/FeedComponent";
import Layout from "./component/layout";
import EventComponent from "./component/Event/EventComponent";
import { Toaster } from "react-hot-toast";
import "react-tooltip/dist/react-tooltip.css";
function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter basename="/">
        <Routes>
          {/* <Route path="*" element={<PageNotFound />} /> */}
          <Route
            path="/"
            element={
              // <ProtectedRoutes
              //   component={
              //     <Layout>
              <SignIn />
              //     </Layout>
              //   }
              // />
            }
          />
          <Route
            path="signin"
            element={
              // <SignedInRoutes
              //   component={
              //     <Layout>
              <SignIn />
              //   </Layout>
              // }
              // />
            }
          />{" "}
          <Route
            path="signup"
            element={
              // <SignedInRoutes
              //   component={
              //     <Layout>
              <SignUp />
              //   </Layout>
              // }
              // />
            }
          />
          <Route
            path="feed"
            element={
              // <SignedInRoutes
              //   component={
              <Layout>
                <FeedComponent />
              </Layout>
            }
          />
          <Route
            path="event"
            element={
              // <SignedInRoutes
              //   component={
              <Layout>
                <EventComponent />
              </Layout>
            }
          />
          {/* }
        /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
