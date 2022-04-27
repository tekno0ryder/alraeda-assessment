import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLoading,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonRouter,
  useIonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import { locationOutline } from "ionicons/icons";
import { useState } from "react";
import { useParams } from "react-router";
import { API } from "../api";
import careers from "../api/careers";
import CareerItemContent from "../components/CareerItemContent";
import { Career } from "../util/types";

const CareerDetails: React.FC = () => {
  const [career, setCareer] = useState<Career>();
  const { id } = useParams<{ id: string }>();
  const [presentToast] = useIonToast();

  useIonViewWillEnter(async () => {
    try {
      const career = await API.fetchCareerById(id);
      setCareer(career);
    } catch (error) {
      if (typeof error === "string") {
        presentToast({ message: error, duration: 1000 });
      }
    }
  }, [id]);

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
            <h4>Description</h4>
            <p>{career.body}</p>
            <IonItemDivider />
            <h4>Skills</h4>
            {career.skills.map((skill) => (
              <IonChip>{skill}</IonChip>
            ))}
            <div className="ion-margin-vertical ion-text-center">
              <IonButton>Apply</IonButton>
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CareerDetails;
