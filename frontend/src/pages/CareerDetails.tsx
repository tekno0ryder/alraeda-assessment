import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonItemDivider,
  IonNote,
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
import { Career } from "../util/types";

const CareerDetails: React.FC = () => {
  const [career, setCareer] = useState<Career>();
  const { id } = useParams<{ id: string }>();
  const [hasApplication, setHasApplication] = useState();

  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  const [presentToast] = useIonToast();
  const { user } = useAuth();

  useIonViewWillEnter(async () => {
    try {
      const career = await API.fetchCareerById(id);
      setCareer(career);

      const application = await API.fetchApplication(user?.id!, id);
      setHasApplication(application!!);
    } catch (error) {
      if (typeof error === "string") {
        presentToast({ message: error, duration: 1000 });
      }
    }
  }, [user, id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/careers" />
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
              <IonButton onClick={() => setIsApplicationModalOpen(true)}>
                {hasApplication ? "Edit my application" : "Apply"}
              </IonButton>
            </div>
            <ApplicationModal
              isEditMode={hasApplication}
              career={career}
              isOpen={isApplicationModalOpen}
              onDismiss={() => setIsApplicationModalOpen(false)}
            />
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CareerDetails;
