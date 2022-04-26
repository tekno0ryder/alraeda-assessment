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
import { AuthContext, useAuth } from "../hooks/useAuth";
import "./Login.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string | any>("");
  const [password, setPassword] = useState<string | any>("");

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
        console.log("PUSHED");
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
          <IonItem>
            <IonLabel position="floating">Username</IonLabel>
            <IonInput
              required
              value={username}
              onInput={(e) => setUsername(e.currentTarget.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              required
              value={password}
              type="password"
              onInput={(e) => setPassword(e.currentTarget.value)}
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
