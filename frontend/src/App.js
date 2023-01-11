// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import * as sessionActions from "./store/session";

import SignupFormPage from "./components/SignupFormPage";
import GetAllSpots from "./components/AllSpots";
import GetSpotDetails from "./components/SpotDetails";
import NewSpotFormPage from "./components/NewSpotFormPage";
import CreateReviewForm from "./components/CreateReview";
import UserBookingsPage from "./components/UserBookings"
import UserSpotsPage from "./components/UserListings";
import UserReviewsPage from "./components/UserReviews";
import UserProfile from "./components/UserProfile";
import { AboutDevPage } from "./components/DevelpoerPage";
import { PageNotFound } from "./components/PageNotFound";

import Navigation from "./components/Navigation";
import { Route, Switch } from "react-router-dom";



function App() {

  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/aboutDev'>
            <AboutDevPage />
          </Route>
          <Route exact path='/myProfile'>
            <UserProfile />
          </Route>
          <Route exact path='/myReviews'>
            <UserReviewsPage />
          </Route>
          <Route exact path='/myListings'>
            <UserSpotsPage />
          </Route>
          <Route exact path='/myBookings'>
            <UserBookingsPage />
          </Route>
          <Route path='/spots/:spotId/create'>
            <CreateReviewForm />
          </Route>
          <Route path='/spots/create'>
            <NewSpotFormPage />
          </Route>
          <Route path='/spots/:spotId' exact={true}>
            <GetSpotDetails />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/'>
            <GetAllSpots />
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
