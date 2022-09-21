import React, { Fragment, useEffect, useState } from "react";
import { Container, Loader } from "semantic-ui-react";
import { Activity } from "../modules/activity";
import Navbar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
	const [activities, setActivities] = useState<Activity[]>([]);
	const [selectedActivity, setSelectedActivity] = useState<
		Activity | undefined
	>(undefined);
	const [editMode, setEditMode] = useState(false);
	const [loading, setLoading] = useState(true);
	const [submiting, setSubmiting] = useState(false);

	useEffect(() => {
		agent.Activities.list().then((response) => {
			var activities: Activity[] = [];
			response.forEach((activity) => {
				activity.date = activity.date.split("T")[0];
				activities.push(activity);
			});
			setLoading(false);
			setActivities(activities);
		});
	}, []);

	function handleSelectActivity(id: string) {
		setSelectedActivity(activities.find((x) => x.id === id));
	}

	function handleCancelSelectActivity() {
		setSelectedActivity(undefined);
	}

	function handleFormOpen(id?: string) {
		id ? handleSelectActivity(id) : handleCancelSelectActivity();
		setEditMode(true);
	}
	function handleFormClose() {
		setEditMode(false);
	}
	function handleCreateOrEditActivity(activity: Activity) {
		setSubmiting(true);

		if (activity.id) {
			agent.Activities.update(activity).then(() => {
				setActivities([
					...activities.filter((x) => x.id !== activity.id),
					activity,
				]);
				setEditMode(false);
				setSelectedActivity(activity);
				setSubmiting(false);
			});
		} else {
			activity.id = uuid();
			agent.Activities.create(activity).then(() => {
				setActivities([...activities, activity]);
				setEditMode(false);
				setSelectedActivity(activity);
				setSubmiting(false);
			});
		}
	}

	function handleDeleteActivity(id: string) {
		setSubmiting(true)
		agent.Activities.delete(id).then(() => {
			setActivities([...activities.filter((x) => x.id !== id)]);
			setSubmiting(false);
		})
		
	}

	if (loading)
		return <LoadingComponent content="Loading..."></LoadingComponent>;

	return (
		<Fragment>
			<Navbar openForm={handleFormOpen} />
			<Container style={{ marginTop: "7em" }}>
				<ActivityDashboard
					activities={activities}
					selectedActivity={selectedActivity}
					selectActivity={handleSelectActivity}
					cancelSelectActivity={handleCancelSelectActivity}
					editMode={editMode}
					openForm={handleFormOpen}
					closeForm={handleFormClose}
					createOrEdit={handleCreateOrEditActivity}
					deleteActivity={handleDeleteActivity}
					submiting = {submiting}
				></ActivityDashboard>
			</Container>
		</Fragment>
	);
}

export default App;
