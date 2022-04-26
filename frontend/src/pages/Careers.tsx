import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
  useIonRouter,
  useIonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { filter, locationOutline, location, search } from "ionicons/icons";
import { API } from "../api";
import { Career } from "../util/types";
import "./Careers.css";
import { useRequireAuth } from "../hooks/useRequireAuth";

const Careers: React.FC = () => {
  const [careers, setCareers] = useState<Career[]>();

  const [cityList, setCityList] = useState<string[]>();
  const [titleSearch, setTitleSearch] = useState<string>();
  const [selectedCity, setSelectedCity] = useState<string>();

  const router = useIonRouter();
  const [presentActionSheet] = useIonActionSheet();
  const [presentToast] = useIonToast();
  useRequireAuth();

  useIonViewWillEnter(async () => {
    search();
  }, []);

  useEffect(() => {
    search({ title: titleSearch, city: selectedCity });
  }, [titleSearch, selectedCity]);

  // Used to show list of cities
  const showActionSheet = () => {
    const options = [
      {
        text: "All",
        role: selectedCity ? undefined : "selected",
        handler: () => setSelectedCity(""),
      },
      { text: "Cancel", role: "cancel" },
    ];

    cityList?.forEach((city) => {
      options.push({
        text: city,
        role: city === selectedCity ? "selected" : undefined,
        handler: () => setSelectedCity(city),
      });
    });

    presentActionSheet(options, "Select city");
  };

  const search = async (filters?: { title?: string; city?: string }) => {
    try {
      const careers = await API.fetchCareerList(filters);
      setCareers(careers);

      // 1st time only: Extract city list for filteration
      if (!cityList) {
        const cityList = new Set<string>();
        careers.forEach((career) => cityList.add(career.city));

        setCityList([...cityList]);
      }
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
            <IonBackButton />
          </IonButtons>
          <IonTitle>Careers</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Search bar */}
        <IonGrid>
          <IonRow className="ion-align-items-center">
            <IonCol size="11">
              <IonSearchbar
                animated
                placeholder="Search title..."
                value={titleSearch}
                onIonChange={(e) => setTitleSearch(e.detail.value!)}
              />
            </IonCol>
            <IonCol size="1">
              <IonButton buttonType="text" onClick={showActionSheet}>
                <IonIcon
                  icon={filter}
                  style={{ color: selectedCity ? "blue" : "" }}
                />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        {/* Careers List */}
        {careers?.map((career) => (
          <IonItem
            key={career.id}
            routerLink={`${router.routeInfo.pathname}/${career.id}`}
          >
            <div>
              <h4>{career.title}</h4>
              <div>
                <IonIcon icon={locationOutline} />
                <span>{career.city}</span>
              </div>
              <p>{career.subTitle}</p>
            </div>
          </IonItem>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Careers;
