import { IonButton, IonIcon, IonItem } from "@ionic/react";
import { trashBinOutline } from "ionicons/icons";
import { Base64File } from "../util/types";

type Props = {
  onFileDelete: (file: Base64File) => void;
  file: Base64File;
};

const FileItem: React.FC<Props> = ({ file, onFileDelete }) => {
  return (
    <>
      <IonItem key={file.name}>
        <p>{file.name}</p>
        <IonButton slot="end" fill="clear" onClick={(e) => onFileDelete(file)}>
          <IonIcon icon={trashBinOutline} />
        </IonButton>
      </IonItem>
    </>
  );
};

export default FileItem;
