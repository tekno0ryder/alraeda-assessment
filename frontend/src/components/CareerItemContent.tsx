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
        <IonCardTitle>{career.title}</IonCardTitle>
        <IonCardSubtitle>
          <IonIcon icon={locationOutline} /> {career.city}
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>{career.subTitle}</IonCardContent>
    </div>
  );
};

export default CareerItemContent;
