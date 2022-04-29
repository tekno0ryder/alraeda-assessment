import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonItemDivider,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import { useState } from "react";
import { useParams } from "react-router";
import { API } from "../api";
import ApplicationModal from "../components/ApplicationModal";
import CareerItemContent from "../components/CareerItemContent";
import { useAuth } from "../hooks/useAuth";
import { useRequireAuth } from "../hooks/useRequireAuth";
import { ROUTES } from "../util/constants";
import toasts from "../util/toasts";
import { ApplicationRequest, Career } from "../util/types";

const CareerDetails: React.FC = () => {
  const [career, setCareer] = useState<Career>();
  const { id } = useParams<{ id: string }>();
  const [hasApplication, setHasApplication] = useState(false);

  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  const [presentToast] = useIonToast();
  const { user } = useAuth();
  useRequireAuth();

  useIonViewWillEnter(async () => {
    try {
      const career = await API.fetchCareerById(id);
      setCareer(career);

      const application = await API.searchApplication({
        userId: user?.id!,
        careerId: id,
      });
      if (application) {
        setHasApplication(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        presentToast(toasts.error(error.message));
      }
    }
  }, [user, id]);

  const onApplicationSubmit = async (
    applicationRequest: ApplicationRequest
  ) => {
    try {
      const res = await API.submitApplication(applicationRequest);
      if (res) {
        presentToast(toasts.success("Application submitted!"));
        setIsApplicationModalOpen(false);
        setHasApplication(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        presentToast(toasts.error(error.message));
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={ROUTES.careers} />
          </IonButtons>
          <IonTitle>Career Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {career && (
          <>
            <div className="ion-text-center">
              <CareerItemContent career={career} />
            </div>
            <IonItemDivider />
            <div>
              <h4>Description</h4>
              <p>{career.body}</p>
            </div>
            <IonItemDivider />
            <div>
              <h4>Skills</h4>
              {career.skills.map((skill) => (
                <IonChip key={skill}>{skill}</IonChip>
              ))}
            </div>
            <div className="ion-margin-vertical ion-text-center">
              <IonButton
                disabled={hasApplication}
                onClick={() => setIsApplicationModalOpen(true)}
              >
                {hasApplication ? "Applied" : "Apply"}
              </IonButton>
            </div>
            <ApplicationModal
              career={career}
              isOpen={isApplicationModalOpen}
              onClose={() => setIsApplicationModalOpen(false)}
              onSubmit={onApplicationSubmit}
            />
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CareerDetails;
