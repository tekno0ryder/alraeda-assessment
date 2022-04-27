import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonSearchbar,
  useIonActionSheet,
} from "@ionic/react";
import { filter } from "ionicons/icons";
import { useEffect, useState } from "react";
import { Career, CareersFiltersType } from "../util/types";

type Props = {
  careers: Career[] | undefined;
  onFiltersChange: (filters: CareersFiltersType) => Promise<void>;
};

const SearchCareer: React.FC<Props> = ({ careers, onFiltersChange }) => {
  const [cityList, setCityList] = useState<string[]>();

  const [titleSearch, setTitleSearch] = useState<string>();
  const [selectedCity, setSelectedCity] = useState<string>();

  const [presentActionSheet] = useIonActionSheet();

  // Consider making an API to return city list
  // since this assumes first careers object is full (no pagination) and not already filtered elsewhere
  useEffect(() => {
    if (!cityList && careers) {
      const cityList = new Set<string>();
      careers.forEach((career) => cityList.add(career.city));

      setCityList([...cityList]);
    }
  }, [careers, cityList]);

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
    const options = [
      {
        text: "All",
        role: selectedCity ? undefined : "selected",
        handler: () => onCitySearch(""),
      },
      { text: "Cancel", role: "cancel" },
    ];

    cityList?.forEach((city) => {
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
            placeholder="Search title..."
            value={titleSearch}
            onIonChange={onTitleSearch}
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
  );
};

export default SearchCareer;
