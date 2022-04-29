import {
  IonButton,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonRow,
} from "@ionic/react";
import { documentOutline, logoLinkedin } from "ionicons/icons";
import { Evaluation } from "../util/types";
import trophy from "../assets/trophy.png";
import { EVALUATION_SETTINGS } from "../util/constants";

type Props = {
  index: number;
  evaluation: Evaluation;
};

const EvaluationItem: React.FC<Props> = ({ evaluation, index }) => {
  const isPassed = evaluation.score >= EVALUATION_SETTINGS.passScore;
  const resume = evaluation.application.resume;
  return (
    <IonItem>
      <IonGrid>
        <IonRow className="ion-align-items-center">
          <IonCol size="1">
            <IonCardTitle>{index + 1}</IonCardTitle>
          </IonCol>
          <IonCol>
            <IonCardTitle>{evaluation.application.user.name}</IonCardTitle>
            <IonCardSubtitle>
              <a href={resume.content} download={resume.name}>
                <IonButton fill="clear">
                  <IonIcon icon={documentOutline} />
                </IonButton>
              </a>

              <IonButton
                fill="clear"
                onClick={() => window.open(evaluation.linkedIn)}
              >
                <IonIcon icon={logoLinkedin} />
              </IonButton>
            </IonCardSubtitle>
          </IonCol>
          <IonCol
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {index === 0 && isPassed && (
              <IonImg src={trophy} style={{ width: 38 }} />
            )}
            <p
              style={{ color: isPassed ? "green" : "red", fontWeight: "bold" }}
            >
              {evaluation.score} / {EVALUATION_SETTINGS.maxScore}
            </p>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

export default EvaluationItem;
