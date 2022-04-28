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
import CreatableSelect from "react-select/creatable";
import { OnChangeValue } from "react-select";
import { SKILL_LIST } from "../util/constants";

type Props = {
  career: Career;
  isOpen: boolean;
  onDismiss: (hasApplication?: boolean) => void;
  application?: Application;
};

type SkillOption = {
  label: string;
  value: string;
};

const skillOptions = SKILL_LIST.map<SkillOption>((skill) => ({
  label: skill,
  value: skill,
}));

const ApplicationModal: React.FC<Props> = ({
  isOpen,
  career,
  application,
  onDismiss,
}) => {
  const [resume, setResume] = useState<Base64File | null>();
  const [files, setFiles] = useState<Base64File[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [presentToast] = useIonToast();
  const { user } = useAuth();

  useIonViewWillEnter(() => {
    //If application provided then we're in edit mode
    if (application) {
      setResume(application.resume);
      setFiles(application.files);
      setSkills(application.skills);
    }
  }, []);

  const onSubmit = async () => {
    try {
      if (!resume) {
        throw Error("Resume is required");
      }

      const res = await API.submitApplication({
        userId: user?.id!,
        careerId: career.id,
        resume: resume,
        files: files,
        skills: skills,
      });
      if (res) {
        presentToast({ message: "Applicatoin submitted!", duration: 1000 });
        onDismiss(true);
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

  const onSkillChange = (newSkillOptions: OnChangeValue<SkillOption, true>) => {
    const skills = newSkillOptions.map((option) => option.value);
    setSkills(skills);
  };

  return (
    <IonModal backdropDismiss={false} isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={() => onDismiss()}>Cancel</IonButton>
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
        <div>
          <h6>Skills</h6>
          <CreatableSelect
            isMulti
            placeholder={"Select or type a new skill"}
            onChange={onSkillChange}
            options={skillOptions}
          ></CreatableSelect>
        </div>
      </IonContent>
      <IonFooter className={"ion-margin"}>
        <IonToolbar>
          <IonButton type="submit" onClick={onSubmit}>
            {application ? "Edit" : "Submit"}
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
};

export default ApplicationModal;
