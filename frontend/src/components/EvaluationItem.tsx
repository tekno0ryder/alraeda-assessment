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
  const resume = evaluation.application.resume;
  const isPassed = evaluation.score >= EVALUATION_SETTINGS.passScore;
  const rank = index + 1; // start from 1 instead of 0

  return (
    <IonItem>
      <IonGrid>
        <IonRow className="ion-align-items-center">
          <IonCol size="1">
            <IonCardTitle data-testid={"rank"}>{rank}</IonCardTitle>
          </IonCol>
          <IonCol>
            <IonCardTitle data-testid={"name"}>
              {evaluation.application.user.name}
            </IonCardTitle>
            <IonCardSubtitle>
              <a
                data-testid={"resume"}
                href={resume.content}
                download={resume.name}
              >
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
            {rank === 1 && isPassed && (
              <IonImg
                data-testid={"trophy"}
                src={trophy}
                style={{ width: 38 }}
              />
            )}
            <p
              data-testid={"score"}
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
