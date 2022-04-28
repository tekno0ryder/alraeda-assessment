import {
  ActionSheetButton,
  IonButton,
  IonButtons,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  useIonActionSheet,
} from "@ionic/react";
import { APPLICATION_STATUS_LIST } from "../util/constants";
import { Application } from "../util/types";

type Props = {
  application: Application;
  onChangeStatus: (id: number, newStatus: string) => Promise<void>;
};
const ApplicationItem: React.FC<Props> = ({ application, onChangeStatus }) => {
  const [presentActionSheet, dismiss] = useIonActionSheet();

  const openChangeStatus = () => {
    const options: ActionSheetButton[] = [{ text: "Cancel", role: "cancel" }];

    Object.values(APPLICATION_STATUS_LIST).forEach((statusValue) => {
      options.push({
        text: statusValue,
        role: application.status === statusValue ? "selected" : undefined,
        handler: () => {
          dismiss();
          onChangeStatus(application.id, statusValue);
        },
      });
    });

    presentActionSheet(options, "Change status");
  };

  const renderLabelValue = (label: string, value: string) => {
    return (
      <div>
        <b>{label} </b> {value}
      </div>
    );
  };

  return (
    <IonItem>
      <div style={{ width: "100%" }}>
        <IonCardHeader>
          <IonCardTitle>Application {application.id}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          {renderLabelValue("Name: ", application.user.name)}
          {renderLabelValue("Position: ", application.career.title)}
          {renderLabelValue("Status: ", application.status)}
        </IonCardContent>
        <IonButtons className="ion-justify-content-end">
          <IonButton fill={"clear"} onClick={openChangeStatus}>
            <IonLabel>Change Status</IonLabel>
          </IonButton>
          <IonButton fill={"clear"} onClick={() => {}}>
            <IonLabel>View Application</IonLabel>
          </IonButton>
        </IonButtons>
      </div>
    </IonItem>
  );
};
export default ApplicationItem;
