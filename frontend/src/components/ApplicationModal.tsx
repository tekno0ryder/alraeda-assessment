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
import { Application, Base64File, Career } from "../util/types";
import FileUpload from "./FileUpload";
import { useState } from "react";
import FileItem from "./FilesItem";
import { API } from "../api";
import { useAuth } from "../hooks/useAuth";

type Props = {
  career: Career;
  isOpen: boolean;
  onDismiss: () => void;
  application?: Application;
};

const ApplicationModal: React.FC<Props> = ({
  isOpen,
  career,
  application,
  onDismiss,
}) => {
  const [resume, setResume] = useState<Base64File | null>();
  const [files, setFiles] = useState<Base64File[]>([]);

  const [presentToast] = useIonToast();
  const { user } = useAuth();

  useIonViewWillEnter(() => {
    //If application provided then we're in edit mode
    if (application) {
      setResume(application.resume);
    }
  }, []);

  const onSubmit = async () => {
    try {
      if (!resume) {
        throw Error("Resume is required");
      }

      const response = await API.submitApplication({
        userId: user?.id!,
        careerId: career.id,
        resume: resume!,
        files: files,
      });
      if (response) {
        presentToast({ message: "Applicatoin submitted!", duration: 1000 });
        onDismiss();
      }
    } catch (error) {
      if (error instanceof Error) {
        presentToast({ message: error.message, duration: 1000 });
      }
    }
  };

  const onResumeUpload = (file: Base64File) => setResume(file);

  const onResumeDelete = (_: Base64File) => setResume(null);

  const onFileUpload = (newFile: Base64File) => {
    const isExists = files.find((file) => file.name === newFile.name);
    if (!isExists) {
      setFiles([...files, newFile]);
    }
  };

  const onFileDelete = (fileToDelete: Base64File) => {
    const filesFiltered = files.filter(
      (file) => file.name !== fileToDelete.name
    );
    setFiles(filesFiltered);
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
        {application}
        <IonNote>
          Please fill the form to apply for position [{career.title} in{" "}
          {career.city}]
        </IonNote>
        <div>
          <h6>Resume</h6>
          {resume && <FileItem file={resume} onFileDelete={onResumeDelete} />}
          <FileUpload OnFileUpload={onResumeUpload} />
        </div>
        <div>
          <h6>Other Files</h6>
          {files.map((file) => (
            <FileItem key={file.name} file={file} onFileDelete={onFileDelete} />
          ))}
          <FileUpload OnFileUpload={onFileUpload} />
        </div>
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
