import {
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
} from "@ionic/react";
import { locationOutline } from "ionicons/icons";
import { Career } from "../util/types";

type Props = {
  career: Career;
};

const CareerItemContent: React.FC<Props> = ({ career }) => {
  return (
    <div>
      <IonCardHeader>
        <IonCardTitle data-testid={"title"}>{career.title}</IonCardTitle>
        <IonCardSubtitle data-testid={"city"}>
          <IonIcon icon={locationOutline} /> {career.city}
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent data-testid={"subTitle"}>
        {career.subTitle}
      </IonCardContent>
    </div>
  );
};

export default CareerItemContent;
