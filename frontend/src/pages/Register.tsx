import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRouterLink,
  IonTitle,
  IonToolbar,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { FormEvent, useState } from "react";
import { API } from "../api";
import { useAuth } from "../hooks/useAuth";
import styles from "./Register.module.css";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [present] = useIonToast();
  const { push } = useIonRouter();
  const { setUser } = useAuth();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const user = await API.register(username, password, { name });
      if (user) {
        setUser(user);
        push("careers");
      } else {
        present({ message: "Username or password is wrong", duration: 1000 });
      }
    } catch (error) {
      if (error instanceof Error) {
        present({ message: error.message, duration: 1000 });
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Create account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h3>Welcome back!</h3>
        <form onSubmit={onSubmit}>
          <IonItem className={styles.input}>
            <IonLabel position="floating">Full Name</IonLabel>
            <IonInput
              required
              value={name}
              onIonChange={(e) => setName(e.detail.value!)}
            />
          </IonItem>
          <IonItem className={styles.input}>
            <IonLabel position="floating">Username</IonLabel>
            <IonInput
              required
              value={username}
              onIonChange={(e) => setUsername(e.detail.value!)}
            />
          </IonItem>
          <IonItem className={styles.input}>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              required
              value={password}
              type="password"
              onIonChange={(e) => setPassword(e.detail.value!)}
            />
          </IonItem>
          <IonButton className="ion-margin" type="submit">
            Register
          </IonButton>
        </form>
        <div className="ion-margin">
          <span>Have an account? </span>
          <IonRouterLink routerLink="login">Sign in</IonRouterLink>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
