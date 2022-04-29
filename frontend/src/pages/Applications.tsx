import {
  IonContent,
  IonPage,
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

  const onApplicationChange = async (id: number, fields: object) => {
    await API.updateApplication(id, fields);

    // For some reason relations are not populated using PATCH:updateApplication
    // Will use fetchApplication instead
    const newApplication = await API.fetchApplication(id);

    // Find and replace modified application
    if (newApplication && applications) {
      const newApplications = applications?.map((application) =>
        application.id === newApplication.id ? newApplication : application
      );
      setApplications(newApplications);
      presentToast(toasts.success(`Application #${id} has been updated!`));
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        {applications?.map((application) => (
          <ApplicationItem
            key={application.id}
            application={application}
            onApplicationChange={onApplicationChange}
          />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Applications;
