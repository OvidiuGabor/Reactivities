import { observer } from "mobx-react-lite";
import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Activity } from "../../../app/modules/activity";
import { useStore } from "../../../app/stores/store";

function ActivityForm() {
	const { activityStore } = useStore();

	const initialState = activityStore.selectedActivity ?? {
		id: "",
		title: "",
		category: "",
		date: "",
		description: "",
		city: "",
		venue: "",
	};

	const [activity, setActivity] = useState(initialState);
	function handleSubmit() {
		activityStore.selectedActivity?.id
			? activityStore.updateActivity(activity)
			: activityStore.createActivity(activity);
	}

	function handleInputChange(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const { name, value } = event.target;
		setActivity({ ...activity, [name]: value });
	}

	//if(submiting) return <LoadingComponent content="Submiting..."></LoadingComponent>

	return (
		<Segment clearing>
			<Form onSubmit={handleSubmit} autoComplete="off">
				<Form.Input
					placeholder="Title"
					value={activity.title}
					name="title"
					onChange={handleInputChange}
				></Form.Input>
				<Form.TextArea
					placeholder="Description"
					value={activity.description}
					name="description"
					onChange={handleInputChange}
				></Form.TextArea>
				<Form.Input
					placeholder="Category"
					value={activity.category}
					name="category"
					onChange={handleInputChange}
				></Form.Input>
				<Form.Input
					type="date"
					placeholder="Date"
					value={activity.date}
					name="date"
					onChange={handleInputChange}
				></Form.Input>
				<Form.Input
					placeholder="City"
					value={activity.city}
					name="city"
					onChange={handleInputChange}
				></Form.Input>
				<Form.Input
					placeholder="Venue"
					value={activity.venue}
					name="venue"
					onChange={handleInputChange}
				></Form.Input>
				<Button
					loading={activityStore.loading}
					floated="right"
					positive
					type="submit"
					content="Submit"
				/>
				<Button
					onClick={activityStore.closeForm}
					floated="right"
					type="button"
					content="Cancel"
				/>
			</Form>
		</Segment>
	);
}

export default observer(ActivityForm);
