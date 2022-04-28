import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonRouterOutlet,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import "./Careers.css";
import { useRequireAuth } from "../hooks/useRequireAuth";
import Applications from "./Applications";
import { Route, useHistory } from "react-router-dom";
import Evaluations from "./Evaluations";
import { ROUTES } from "../util/constants";

const Admin: React.FC = () => {
  const { routeInfo } = useIonRouter();
  const history = useHistory();
  useRequireAuth({ requireAdmin: true });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Admin</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref={ROUTES.login} />
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSegment value={routeInfo.pathname}>
            <IonSegmentButton
              value={ROUTES.applications}
              onClick={() => history.replace(ROUTES.applications)}
            >
              Applications
            </IonSegmentButton>
            <IonSegmentButton
              value={ROUTES.evaluations}
              onClick={() => history.replace(ROUTES.evaluations)}
            >
              Evaluation
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRouterOutlet>
          <Route path={ROUTES.applications} exact component={Applications} />
          <Route path={ROUTES.evaluations} exact component={Evaluations} />
        </IonRouterOutlet>
      </IonContent>
    </IonPage>
  );
};

export default Admin;
