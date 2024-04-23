import StatusList from "../../StatusList/StatusList";
import classes from "./ProjectBoardLong.module.css";

export default function ProjectBoardLong({ activities, activitiesListChange }) {
  return (
    <>
      <StatusList
        activities={activities}
        activitiesListChange={activitiesListChange}
        title={"Do zrobienia"}
        id={"todo"}
      />
      <StatusList
        activities={activities}
        activitiesListChange={activitiesListChange}
        title={"W toku"}
        id={"doing"}
      />
      <StatusList
        activities={activities}
        activitiesListChange={activitiesListChange}
        title={"Zrobione"}
        id={"done"}
      />
    </>
  );
}
