import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
  useIonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import { useState } from "react";
import { API } from "../api";
import { Career, CareersFiltersType } from "../util/types";
import "./Careers.css";
import CareersSearch from "../components/CareersSearch";
import CareerItemContent from "../components/CareerItemContent";

const Careers: React.FC = () => {
  const [careers, setCareers] = useState<Career[]>();

  const router = useIonRouter();
  const [presentToast] = useIonToast();

  useIonViewWillEnter(async () => {
    search();
  }, []);

  const search = async (filters?: CareersFiltersType) => {
    try {
      const careers = await API.fetchCareerList(filters);
      setCareers(careers);
    } catch (error) {
      if (typeof error === "string") {
        presentToast({ message: error, duration: 1000 });
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="login" />
          </IonButtons>
          <IonTitle>Careers</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Search bar */}
        <CareersSearch careers={careers} onFiltersChange={search} />
        {/* Careers List */}
        <IonList>
          {careers?.map((career) => (
            <IonItem
              key={career.id}
              routerLink={`${router.routeInfo.pathname}/${career.id}`}
            >
              <CareerItemContent career={career} />
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Careers;
