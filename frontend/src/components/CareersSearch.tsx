import {
  ActionSheetButton,
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonSearchbar,
  useIonActionSheet,
} from "@ionic/react";
import { filter } from "ionicons/icons";
import { useState } from "react";
import { CITY_LIST } from "../util/constants";
import { CareersFiltersType } from "../util/types";

type Props = {
  onFiltersChange: (filters: CareersFiltersType) => Promise<void>;
};

const CareersSearch: React.FC<Props> = ({ onFiltersChange }) => {
  const [titleSearch, setTitleSearch] = useState<string>();
  const [selectedCity, setSelectedCity] = useState<string>();

  const [presentActionSheet] = useIonActionSheet();

  const onTitleSearch = (e: CustomEvent) => {
    const newTitle = e.detail.value!;
    setTitleSearch(newTitle);
    onFiltersChange({ title: newTitle, city: selectedCity });
  };

  const onCitySearch = (newCity: string) => {
    setSelectedCity(newCity);
    onFiltersChange({ title: titleSearch, city: newCity });
  };

  // Used to show list of cities
  const showActionSheet = () => {
    const options: ActionSheetButton[] = [
      {
        text: "All",
        role: selectedCity ? undefined : "selected",
        handler: () => onCitySearch(""),
      },
      { text: "Cancel", role: "cancel" },
    ];

    CITY_LIST.forEach((city) => {
      options.push({
        text: city,
        role: city === selectedCity ? "selected" : undefined,
        handler: () => onCitySearch(city),
      });
    });

    presentActionSheet(options, "Select city");
  };

  return (
    <IonGrid>
      <IonRow className="ion-align-items-center">
        <IonCol size="11">
          <IonSearchbar
            animated
            data-testid="searchBar"
            placeholder="Search title..."
            value={titleSearch}
            onIonChange={onTitleSearch}
          />
        </IonCol>
        <IonCol size="1">
          <IonButton
            data-testid="filterCity"
            buttonType="text"
            onClick={showActionSheet}
          >
            <IonIcon
              icon={filter}
              style={{ color: selectedCity ? "blue" : "" }}
            />
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default CareersSearch;
