import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonModal,
  IonNote,
  IonTitle,
  IonToolbar,
  useIonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import { Base64File, Career } from "../util/types";
import FileUpload from "./FileUpload";
import { useState } from "react";
import FileItem from "./FilesItem";
import { API } from "../api";
import { useAuth } from "../hooks/useAuth";

type Props = {
  career: Career;
  isOpen: boolean;
  onDismiss: () => void;
  isEditMode?: boolean;
};

const ApplicationModal: React.FC<Props> = ({
  isOpen,
  career,
  isEditMode,
  onDismiss,
}) => {
  const [resume, setResume] = useState<Base64File | null>();

  const [presentToast] = useIonToast();
  const { user } = useAuth();

  const onSubmit = async () => {
    let errors = "";
    if (!user) {
      errors += "Sign in first";
    }
    if (!resume) {
      errors += "Resume is required";
    }

    if (errors) {
      return presentToast({ message: errors, duration: 1000 });
    }

    try {
      const response = await API.submitApplication({
        userId: user?.id!,
        careerId: career.id,
        resume: resume!,
      });
      if (response) {
        presentToast({ message: "Applicatoin submitted!", duration: 1000 });
        onDismiss();
      }
    } catch (error) {
      if (typeof error === "string") {
        presentToast({ message: error, duration: 1000 });
      }
    }
  };
  return (
    <IonModal backdropDismiss={false} isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={onDismiss}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Application</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonNote>
          Please fill the form to apply for position [{career.title} in{" "}
          {career.city}]
        </IonNote>
        <h4>Resume</h4>
        {resume && (
          <FileItem
            file={resume}
            onFileDelete={() => {
              setResume(null);
            }}
          />
        )}
        <FileUpload onFileChange={setResume} />
      </IonContent>
      <IonFooter className={"ion-margin"}>
        <IonToolbar>
          <IonButton type="submit" onClick={onSubmit}>
            Submit
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
};

export default ApplicationModal;
