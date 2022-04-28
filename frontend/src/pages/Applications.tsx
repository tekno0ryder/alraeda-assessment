import {
  IonButton,
  IonButtons,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonPage,
  useIonActionSheet,
  useIonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import { useState } from "react";
import { API } from "../api";
import ApplicationItem from "../components/ApplicationItem";
import toasts from "../util/toasts";
import { Application } from "../util/types";

const Applications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>();

  const [presentToast] = useIonToast();

  useIonViewWillEnter(async () => {
    try {
      const applications = await API.fetchApplications();
      setApplications(applications);
    } catch (error) {
      if (error instanceof Error) {
        presentToast(toasts.error(error.message));
      }
    }
  }, []);

  const onChangeStatus = async (id: number, newStatus: string) => {
    // For some reason relations are not populated using PATCH:updateApplication
    // Will use fetchApplication instead
    const _ = await API.updateApplication(id, {
      status: newStatus,
    });

    const newApplication = await API.fetchApplication(id);

    if (newApplication && applications) {
      // Find and replace modified application
      const newApplications = applications?.map((application) =>
        application.id === newApplication.id ? newApplication : application
      );
      setApplications(newApplications);

      presentToast(
        toasts.success(`Application #${id} changed to ${newStatus}`)
      );
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        {applications?.map((application) => (
          <ApplicationItem
            key={application.id}
            application={application}
            onChangeStatus={onChangeStatus}
          />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Applications;
