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
import { useState } from "react";
import { APPLICATION_STATUS_LIST } from "../util/constants";
import { Application, ApplicationRequest } from "../util/types";
import ApplicationModal from "./ApplicationModal";

type Props = {
  application: Application;
  onApplicationChange: (id: number, fields: object) => Promise<void>;
};

const ApplicationItem: React.FC<Props> = ({
  application,
  onApplicationChange,
}) => {
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [presentActionSheet, dismissActionSheet] = useIonActionSheet();

  const openChangeStatus = () => {
    const options: ActionSheetButton[] = [{ text: "Cancel", role: "cancel" }];

    Object.values(APPLICATION_STATUS_LIST).forEach((statusValue) => {
      options.push({
        text: statusValue,
        role: application.status === statusValue ? "selected" : undefined,
        handler: () => {
          dismissActionSheet();
          onApplicationChange(application.id, { status: statusValue });
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
          <IonCardTitle>Application #{application.id}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          {renderLabelValue("Name: ", application.user.name)}
          {renderLabelValue("Position: ", application.career.title)}
          {renderLabelValue("Status: ", application.status)}
        </IonCardContent>
        <IonButtons className="ion-justify-content-end">
          <IonButton
            fill={"clear"}
            color={"primary"}
            onClick={openChangeStatus}
          >
            <IonLabel>Change Status</IonLabel>
          </IonButton>
          <IonButton
            fill={"clear"}
            color={"primary"}
            onClick={() => setIsApplicationModalOpen(true)}
          >
            <IonLabel>View Application</IonLabel>
          </IonButton>
        </IonButtons>
      </div>
      <ApplicationModal
        career={application.career}
        application={application}
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        onSubmit={async (applicationRequest: ApplicationRequest) => {
          await onApplicationChange(application.id, applicationRequest);
          setIsApplicationModalOpen(false);
        }}
      />
    </IonItem>
  );
};
export default ApplicationItem;
