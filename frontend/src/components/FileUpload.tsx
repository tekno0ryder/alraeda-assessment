import { IonButton, IonContent, IonIcon, IonItem } from "@ionic/react";
import { cloudUploadOutline } from "ionicons/icons";
import { ChangeEvent, ChangeEventHandler, useRef } from "react";
import styles from "./FileUpload.module.css";
import { Base64File } from "../util/types";
import { fileToBase64 } from "../util/base64";
type Props = {
  OnFileUpload: (file: Base64File) => void;
};

const FileUpload: React.FC<Props> = ({ OnFileUpload }) => {
  const inputRef = useRef<any>();

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
      const base64File: Base64File = {
        name: file.name,
        type: file.type,
        content: await fileToBase64(file),
      };
      OnFileUpload(base64File);
    }
    // Reset hidden input value so in case we upload the same file again it works
    inputRef.current.value = "";
  };

  return (
    <IonButton
      fill="clear"
      className={styles.uploadButton}
      onClick={openFileDialog}
    >
      <input hidden ref={inputRef} type={"file"} onChange={onChange} />
      <IonIcon slot="start" icon={cloudUploadOutline} />
      Upload
    </IonButton>
  );
};

export default FileUpload;
