//COMPONENTS
import Nav from "./components/general/Navbar";
import Home from "./components/general/Home";
import SignIn from "./components/general/logIn";
import SignUp from "./components/general/SignUp";
import ForgotPassword from "./components/designs/ForgotPassword";
import Explore from "./components/explore/exploreComponents/Explore";
import Footer from "./components/general/Footer";
import Profile from "./components/explore/exploreProfile/Profile";
import Account from "./components/profile/account/Account";
import ProfileSettings from "./components/profile/settings/ProfileSettings";
import HowTo from "./components/designs/howto/HowTo";
import Activity from "./components/panel/activitiesPanel/ActivityContainer";
import CreateActivity from "./components/panel/activitiesPanel/CreateActivities";
import UserPanel from "./components/panel/UserPanel";
import VideosInterface from "./components/panel/VideosInterface";
import TalleresPanel from "./components/panel/activitiesPanel/ActivitiesPanel";
import EventosPanel from "./components/panel/eventsCalendarPanel/EventCalendarPanel";
import Spinner from "./components/designs/Spinner";
import ChangePassword from "./components/general/changePassword";
import Planes from "./components/designs/Plans";
import AboutUs from "./components/designs/About us/AboutContainer";
import AdminPanel from "./components/panel/AdminPanel";
import "./styles.css";

//UTILITIES
import SpinnerContext from "./utils/SpinnerContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import userActions from "./redux/actions/userActions";
import type { RootState, AppDispatch } from "./main";
import { current } from "@reduxjs/toolkit";
import FreeTrial from "./pages/FT1/FreeTrial";
import FreeTrial2 from "./pages/FT2/FreeTrial";
import Checkout from "./pages/FT3/Checkout";

import Swal from "sweetalert2";
import axios from "axios";

function App(props: any) {
  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(true);
  const [fechaUnMesDespues, setFechaUnMesDespues] = useState("");

  const fechaActual = new Date(); //no se borra esta linea
  //const fechaActual = new Date("2023-02-22T10:30:00.000Z"); //hay que borrar esta linea, es solamente para pruebas
  const diferencia =
    new Date(fechaUnMesDespues).getTime() - fechaActual.getTime();
  const diasFaltantes = Math.ceil(diferencia / (24 * 60 * 60 * 1000));

  const fechaUltimaAlerta = localStorage.getItem("fechaUltimaAlerta");

  const yaSeMostroAlertaHoy =
    fechaUltimaAlerta === fechaActual.toLocaleDateString();

  if (diasFaltantes <= 5 && !yaSeMostroAlertaHoy) {
    Swal.fire({
      title: `Faltan ${diasFaltantes} día/s para que se cumpla un mes de diferencia`,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });

    localStorage.setItem("fechaUltimaAlerta", fechaActual.toLocaleDateString());
  }

  if (diasFaltantes === 0 && !yaSeMostroAlertaHoy) {
    const url = `http://localhost:4000/api/student`;

    let data = {
      id: props.currentUser._id,
      plan: "",
    };

    axios.put(url, data).then((res) => {
      Swal.fire({
        title: `Su prueba gratuita vencio`,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    });
  }

  useEffect(() => {
    if (props.currentUser == "login" || !props.currentUser) {
      if (localStorage.getItem("token") !== null) {
        const token = localStorage.getItem("token");
        props.verifyToken(token);
      }
    }
    setFechaUnMesDespues(props?.currentUser?.dateFin);

     if(props.currentUser?.plan && props.currentUser?.plan==='free'){
      console.log(true,'SE ACTIVO EL IF')
      const url = `http://localhost:4000/api/student`;
      
      let data = {
        id: props.currentUser?._id,
        diference: diasFaltantes
      };
  
      axios.put(url, data).then((res) => {
        console.log(res)
      });
    } 
    

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [props.currentUser]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Router>
          <SpinnerContext.Provider value={{ spinner, setSpinner }}>
            <Nav newUser={props.currentUser} />
            <Routes>
              <Route path="/" element={<Home title="Home" />}></Route>
              <Route
                path="/home"
                element={<Home title="Home" newUser={props.currentUser} />}
              ></Route>
              <Route
                path="/explore"
                element={<Explore title="Explore" />}
              ></Route>
              <Route path="/howTo" element={<HowTo />}></Route>
              <Route
                path="/signIn"
                element={<SignIn title="Iniciar Sesión" />}
              ></Route>
              <Route
                path="/signUp"
                element={<SignUp title="Registro" />}
              ></Route>
              <Route path="/forgotPass" element={<ForgotPassword />}></Route>
              <Route
                path="/payments"
                element={<Planes newUser={props.currentUser} />}
              ></Route>
              <Route path="/aboutUs" element={<AboutUs />}></Route>

              {/*Non-new-students cant access to this route. */}
              {props?.currentUser?.plan === "" &&
              props?.currentUser?.newUser ? (
                <>
                  <Route
                    path="/activateAccount"
                    element={<FreeTrial newUser={props} />}
                  ></Route>
                  <Route
                    path="/activateAccount/2"
                    element={<FreeTrial2 newUser={props} />}
                  ></Route>
                </>
              ) : null}

              <Route
                path="/activateAccount/checkout"
                element={<Checkout newUser={props} />}
              ></Route>

              {/*Non-users cant access to these routes*/}
              {props?.currentUser ? (
                <>
                  <Route
                    path="/explore/profile/:id"
                    element={<Profile title="Perfil" />}
                  ></Route>
                  <Route
                    path="/explore/activity/:id"
                    element={<Activity />}
                  ></Route>
                  <Route path="/account" element={<Account />}></Route>
                  <Route
                    path="/account/settings"
                    element={
                      <ProfileSettings title="Configuración de perfil" />
                    }
                  ></Route>
                  <Route path="/account/panel" element={<UserPanel />}></Route>
                  <Route
                    path="/account/panel/teacherActivities/:type"
                    element={<TalleresPanel />}
                  ></Route>
                  <Route
                    path="/account/panel/teacherEvents"
                    element={<EventosPanel id={props.currentUser?._id} />}
                  ></Route>
                  <Route
                    path="/account/panel/teacherActivities/createActivity"
                    element={<CreateActivity />}
                  ></Route>
                  <Route
                    path="/account/panel/teacherVideos"
                    element={<VideosInterface />}
                  ></Route>
                  <Route path="/account/panel/studentActivities"></Route>
                  <Route path="/account/panel/studentEvents"></Route>
                  <Route
                    path="/account/settings/password"
                    element={<ChangePassword />}
                  ></Route>
                </>
              ) : null}

              {props?.currentUser?.admin ? (
                <Route path="/account/admin" element={<AdminPanel />}></Route>
              ) : null}
            </Routes>
            <Footer />
          </SpinnerContext.Provider>
        </Router>
      )}
    </>
  );
}

const mapDispatch = {
  verifyToken: userActions.verifyToken,
};

const mapState = (state: RootState) => {
  return {
    currentUser: state.userReducer.currentUser,
    activities: state.activityReducer.activities,
  };
};

const connector = connect(mapState, mapDispatch);

export default connector(App);
