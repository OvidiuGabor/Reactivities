import React, { Fragment, useEffect } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route, useLocation } from "react-router-dom";
import HomePage from "../../features/activities/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

function App() {
	const location = useLocation();
	return (
		<Fragment>
			<Route exact path="/" component={HomePage} />
			<Route
				path={"/(.+)"}
				render={() => (
					<React.Fragment>
						<Navbar />
						<Container style={{ marginTop: "7em" }}>
							<Route exact path="/activities" component={ActivityDashboard} />
							<Route path="/activities/:id" component={ActivityDetails} />
							<Route
								key={location.key}
								path={["/createActivity", "/manage/:id"]}
								component={ActivityForm}
							/>
						</Container>
					</React.Fragment>
				)}
			/>
		</Fragment>
	);
}

export default observer(App);
