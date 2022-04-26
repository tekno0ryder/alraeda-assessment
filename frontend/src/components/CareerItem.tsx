import { IonIcon, IonItem, IonList, useIonRouter } from "@ionic/react";
import { locationOutline } from "ionicons/icons";
import { Career } from "../util/types";

type Props = {
  career: Career;
};

const CareerItem: React.FC<Props> = ({ career }) => {
  const router = useIonRouter();

  return (
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
  );
};

export default CareerItem;
