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
} from "@ionic/react";
import {
  Application,
  ApplicationRequest,
  Base64File,
  Career,
} from "../util/types";
import FileUpload from "./FileUpload";
import { useEffect, useState } from "react";
import FileItem from "./FileItem";
import { useAuth } from "../hooks/useAuth";
import CreatableSelect from "react-select/creatable";
import { OnChangeValue } from "react-select";
import { SKILL_LIST } from "../util/constants";
import toasts from "../util/toasts";

type SkillOption = {
  label: string;
  value: string;
};

type Props = {
  isOpen: boolean;
  career: Career;
  onApplicationSubmit: (
    ApplicationRequest: ApplicationRequest
  ) => Promise<void>;
  onClose: () => void;
  // In case of Edit Mode
  application?: Application;
  onApplicationDelete?: (id: number) => Promise<void>;
};

const ApplicationModal: React.FC<Props> = ({
  isOpen,
  career,
  onApplicationSubmit,
  onClose,
  // In case of Edit Mode
  application,
  onApplicationDelete,
}) => {
  const [resume, setResume] = useState<Base64File | null>();
  const [files, setFiles] = useState<Base64File[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [presentToast] = useIonToast();
  const { user } = useAuth();

  const isEditMode = !!application;

  useEffect(() => {
    //If application provided then we're in edit mode
    if (application) {
      setResume(application.resume);
      setFiles(application.files);
      setSkills(application.skills);
    }
  }, [application]);

  const onSubmit = async () => {
    if (!resume) {
      return presentToast(toasts.error("Resume is required"));
    }

    const applicationRequest: ApplicationRequest = {
      userId: isEditMode ? application.userId : user?.id!,
      careerId: career.id,
      resume: resume,
      files: files,
      skills: skills,
    };

    onApplicationSubmit(applicationRequest);
    onClose();
  };

  const onDelete = async () => {
    if (application && onApplicationDelete) {
      onApplicationDelete(application.id);
      onClose();
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

  const mapSkillsToOptions = (skills: string[]) => {
    return skills.map<SkillOption>((skill) => ({
      label: skill,
      value: skill,
    }));
  };

  return (
    <IonModal backdropDismiss={false} isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>{application && "Edit"} Application</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonNote>
          {application
            ? `Editing application #${application.id} for ${application.user.name} for position ${career.title}`
            : `Please fill the form to apply for position [${career.title} in ${career.city}]`}
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
            defaultValue={mapSkillsToOptions(skills)}
            options={mapSkillsToOptions(SKILL_LIST)}
          />
        </div>
      </IonContent>
      <IonFooter className={"ion-margin"}>
        <IonToolbar>
          <IonButton className="ion-margin-horizontal" onClick={onSubmit}>
            {application ? "Edit" : "Submit"}
          </IonButton>
          {isEditMode && onDelete && (
            <IonButton
              className="ion-margin-horizontal"
              color={"danger"}
              onClick={onDelete}
            >
              Delete
            </IonButton>
          )}
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
};

export default ApplicationModal;
