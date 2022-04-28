import {
  IonButton,
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
import { ROUTES } from "../util/constants";
import styles from "./Login.module.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [presentToast] = useIonToast();
  const { push } = useIonRouter();
  const { setUser } = useAuth();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const user = await API.login(username, password);
      if (user) {
        setUser(user);
        push(user.isAdmin ? ROUTES.applications : ROUTES.careers);
      }
    } catch (error) {
      if (error instanceof Error) {
        presentToast({ message: error.message, duration: 1000 });
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h3>Welcome back!</h3>
        <form onSubmit={onSubmit}>
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
            Login
          </IonButton>
        </form>
        <div className="ion-margin">
          <span>Don't have an account? </span>
          <IonRouterLink routerLink={ROUTES.regiser}>Sign up</IonRouterLink>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
