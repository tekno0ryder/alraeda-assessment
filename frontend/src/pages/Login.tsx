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
import styles from "./Login.module.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [present] = useIonToast();
  const { push } = useIonRouter();
  const { setUser } = useAuth();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const user = await API.login(username, password);
      if (user) {
        setUser(user);
        push("careers");
      } else {
        present({ message: "Username or password is wrong", duration: 1000 });
      }
    } catch (error) {
      if (typeof error === "string") {
        present({ message: error, duration: 1000 });
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
          <IonRouterLink routerLink="register">Sign up</IonRouterLink>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
