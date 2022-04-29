import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonList,
  IonNote,
  IonPage,
  useIonToast,
} from "@ionic/react";
import { play } from "ionicons/icons";
import { useState } from "react";
import { API } from "../api";
import EvaluationItem from "../components/EvaluationItem";
import { STATUS_LIST, EVALUATION_SETTINGS } from "../util/constants";
import toasts from "../util/toasts";
import { Evaluation } from "../util/types";

const Evaluations: React.FC = () => {
  const [evaluations, setEvaluations] = useState<Evaluation[]>();
  const [presentToast] = useIonToast();

  const onEvaluate = async () => {
    try {
      const evaluations = await API.evaluateResumes();
      setEvaluations(evaluations);
      updateApplications(evaluations);
    } catch (error) {
      if (error instanceof Error) {
        presentToast(toasts.error(error.message));
      }
    }
  };

  // Change application status based on the score
  const updateApplications = (evaluations: Evaluation[]) => {
    try {
      const promises = [];

      for (const evaluation of evaluations) {
        const application = evaluation.application;
        // Update uncompleted apllications only
        if (application.status !== STATUS_LIST.completed) {
          const newStatus =
            evaluation.score >= EVALUATION_SETTINGS.passScore
              ? STATUS_LIST.accepted
              : STATUS_LIST.rejected;

          promises.push(
            API.updateApplication(application.id, {
              status: newStatus,
            })
          );
        }
      }
      // Execute update statuses
      Promise.all(promises);
    } catch (error) {
      if (error instanceof Error) {
        presentToast(toasts.error(error.message));
      }
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        {!evaluations && (
          <>
            <IonNote>
              Start the service by clicking on FAB button
              <br />
              Pass score:
              <b> {EVALUATION_SETTINGS.passScore} </b> Max score:
              <b> {EVALUATION_SETTINGS.maxScore} </b>
            </IonNote>
            <IonFab
              className={"ion-margin"}
              vertical="bottom"
              horizontal="end"
              slot="fixed"
            >
              <IonFabButton onClick={onEvaluate}>
                <IonIcon icon={play} />
              </IonFabButton>
            </IonFab>
          </>
        )}
        <IonList>
          {evaluations?.map((evaluation, index) => (
            <EvaluationItem
              key={evaluation.application.id}
              index={index}
              evaluation={evaluation}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Evaluations;
