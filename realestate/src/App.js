import "./App.css";
import React from "react";
import LoginChoice from "./components/loginChoice";
import RegisterChoice from "./components/registrationChoice";
import OwnerProfile from "./components/updateOwnerProfile";
import Home from "./components/home";
import OwnerReg from "./components/ownerReg";
import BuyerReg from "./components/buyerReg";
import AdminReg from "./components/adminReg";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  NavLink,
} from "react-router-dom";
import MainLogin from "./components/login";
import AdminDashboard from "./components/adminDashboard";
import OwnerDashboard from "./components/ownerDashboard";
import BuyerDashboard from "./components/buyerDashboard";
import ProfilePage from "./components/profilePage";
import OwnerUpdate from "./components/updateOwnerProfile";
import PropertyReg from "./components/PropertyReg";
import BuyerUpdateProfile from "./components/updateBuyerProfile";
import Axios from "axios";
import UpdateLandProperty from "./components/updateLandProperty";
import BuyerFavourite from "./components/buyerFavs";
import NotFound from './components/notFound';
import { render } from '@testing-library/react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      actorRole: "",
      landPropertyId: 0,
      user: {
        id: "",
        name: "",
        email: "",
        password: "",
        phoneNo: "",
        idProof: "",
        city: "",
        pinCode: "",
        regDate: "",
      },

      // landProperty: {
      //   propertyTitle: "",
      //   propertyArea: "",
      //   dimensionLength: "",
      //   dimensionBreadth: "",
      //   propertyPrice: "",
      //   propertyType: "",
      //   ownershipType: "",
      //   latitude: "",
      //   longitude: "",
      //   propertyCity: "",
      //   propertyPincode: "",
      //   propertyRegistDate: "",
      // },
    };
  }

  componentDidMount() {
    console.log("App.js cdm cld");
    if (
      this.state.user.id === "" &&
      localStorage.getItem("actorType") !== null &&
      localStorage.getItem("actorId") !== null
    ) {
      const id = localStorage.getItem("actorId");
      switch (localStorage.getItem("actorType")) {
        case "Buyer":
          {
            Axios.get(`http://localhost:8080/realEstate/buyer/${id}`).then(
              (res) => {
                const buyerUser = res.data;
                const user = {
                  id: buyerUser.buyerId,
                  name: buyerUser.buyerName,
                  email: buyerUser.buyerEmail,
                  password: buyerUser.buyerPassword,
                  phoneNo: buyerUser.buyerPhoneNo,
                  city: buyerUser.buyerCity,
                  pinCode: buyerUser.buyerPincode,
                  regDate: buyerUser.buyerRegistDate,
                };
                this.setState({ user });
                this.handleLogin("buyer");
              }
            );
          }
          break;
        case "Owner":
          {
            Axios.get(`http://localhost:8080/realEstate/owner/${id}`).then(
              (res) => {
                const ownerUser = res.data;
                const user = {
                  id: ownerUser.ownerId,
                  name: ownerUser.ownerName,
                  email: ownerUser.ownerEmail,
                  password: ownerUser.ownerPassword,
                  phoneNo: ownerUser.ownerPhoneNo,
                  city: ownerUser.ownerCity,
                  pinCode: ownerUser.ownerPincode,
                  regDate: ownerUser.ownerRegistDate,
                };
                this.setState({ user });
                this.handleLogin("owner");
              }
            );
          }
          break;
        case "Admin":
          {
            Axios.get(`http://localhost:8080/realEstate/admin/${id}`).then(
              (res) => {
                const admin = res.data;
                const user = {
                  id: admin.adminId,
                  name: admin.adminName,
                  email: admin.adminEmail,
                };
                this.setState({ user });
                this.handleLogin("admin");
              }
            );
          }
          break;
      }
    }
  }
  handlePropertyData = (landPropertyId) => {
    this.setState({ landPropertyId: landPropertyId });
  };

  handleUserData = (user) => {
    this.setState({ user });
    console.log(this.state.user);
    console.log(this.state.user.id, "state");
  };

  handleLogin = (role) => {
    this.setState({ isLogin: true });
    this.setState({ actorRole: role });
    console.log(this.state.actorRole);
  };
  logout = () => {
    const initialState = {
      /* etc */
    };
    this.setState({ isLogin: false });
    this.setState({ actorName: "" });
    localStorage.removeItem("actorType");
    localStorage.removeItem("actorId");
    localStorage.removeItem("role");
    this.setState({ initialState })
  };

  render() {
    console.log("App.js render cld ");
    return (
      <div>
        <nav className="navbar navbar-expand navbar-light bg-light">
          <div className="navbar-nav">
            <ul className="nav navbar-nav m-2">
              <li>
                <NavLink className="nav-link" to="/">
                  <h5>
                    <i>Horizon Real Estate</i>
                  </h5>
                </NavLink>
              </li>
            </ul>
          </div>

          {this.state.isLogin ? (
            <>
              <div className="navbar-nav">
                <ul className="nav navbar-nav m-2">
                  <li>
                    {" "}
                    <NavLink
                      className="nav-link"
                      to={"/" + this.state.actorRole + "Dash"}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className="navbar-nav ml-auto">
                <ul className="nav navbar-nav m-2">
                  <li>
                    <NavLink className="nav-link" to="/profile">
                      {"HI, " + String(this.state.user.name).toUpperCase()}
                    </NavLink>
                  </li>
                </ul>

                <ul className="nav navbar-nav m-2">
                  <li>
                    {" "}
                    <NavLink
                      className="nav-link btn btn-danger"
                      exact
                      onClick={this.logout}
                      to="/"
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className="navbar-nav ml-auto">
              <ul className="nav navbar-nav m-2">
                <li>
                  <NavLink className="nav-link" to="/Login">
                    <h5>Login</h5>
                  </NavLink>
                </li>
              </ul>

              <ul className="nav navbar-nav m-2 ">
                <li>
                  <NavLink className="nav-link" exact to="/Register">
                    <h5>SignUp</h5>
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </nav>
        <div className="container-fluid">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Login" component={LoginChoice} />
            <Route path="/Register" component={RegisterChoice} />
            <Route path="/ownerReg" component={OwnerReg} />
            <Route path="/buyerReg" component={BuyerReg} />
            <Route path="/adminReg" component={AdminReg} />
            <Route
              path="/ownerLogin"
              render={(props) => (
                <MainLogin
                  sendData={this.handleUserData}
                  ownerType="Owner"
                  {...props}
                />
              )}
            />
            <Route
              path="/buyerLogin"
              render={(props) => (
                <MainLogin
                  sendData={this.handleUserData}
                  ownerType="Buyer"
                  {...props}
                />
              )}
            />
            <Route
              path="/adminLogin"
              render={(props) => (
                <MainLogin
                  sendData={this.handleUserData}
                  ownerType="Admin"
                  {...props}
                />
              )}
            />
            {localStorage.getItem("role") == "Buyer" && (
              <Route
                path="/buyerDash"
                render={(props) => (
                  <BuyerDashboard
                    onLogin={this.handleLogin}
                    actorId={this.state.user.id}
                    user={this.state.user}
                    actorType="buyer"
                    {...props}
                  />
                )}
              />
            )}
            {localStorage.getItem("role") == "Owner" && (
              <Route
                path="/ownerDash"
                render={(props) => (
                  <OwnerDashboard
                    onLogin={this.handleLogin}
                    actorId={this.state.user.id}
                    user={this.state.user}
                    actorType="owner"
                    sendPropertyId={this.handlePropertyData}
                    {...props}
                  />
                )}
              />
            )}
            {localStorage.getItem("role") == "Admin" && (
              <Route
                path="/adminDash"
                render={(props) => (
                  <AdminDashboard
                    onLogin={this.handleLogin}
                    actorId={this.state.user.id}
                    user={this.state.user}
                    actorType="owner"
                    sendPropertyId={this.handlePropertyData}
                    {...props}
                  />
                )}
              />
            )}
            <Route
              path="/profile"
              render={(props) => (
                <ProfilePage
                  user={this.state.user}
                  actorType={this.state.actorRole}
                  {...props}
                />
              )}
            />
            <Route
              path="/ownerUpdate"
              render={(props) => (
                <OwnerUpdate
                  user={this.state.user}
                  onLogout={this.logout}
                  {...props}
                />
              )}
            />
            <Route
              path="/buyerUpdate"
              render={(props) => (
                <BuyerUpdateProfile
                  user={this.state.user}
                  onLogout={this.logout}
                  {...props}
                />
              )}
            />
            <Route
              path="/propertyReg"
              render={(props) => (
                <PropertyReg user={this.state.user} {...props} />
              )}
            />
            <Route
              path="/updateLandProperty"
              render={(props) => (
                <UpdateLandProperty
                  landProperty={this.state.landPropertyId}
                  user={this.state.user}
                  {...props}
                />
              )}
            />
            <Route path="/myFavorites" component={BuyerFavourite} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
