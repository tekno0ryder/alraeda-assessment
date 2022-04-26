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
import "./Register.css";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string | any>("");
  const [password, setPassword] = useState<string | any>("");
  const [name, setName] = useState<string | any>("");

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
            <IonBackButton defaultHref="/login" />
          </IonButtons>
          <IonTitle>Create account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h3>Welcome back!</h3>
        <form onSubmit={onSubmit}>
          <IonItem>
            <IonLabel position="floating">Full Name</IonLabel>
            <IonInput
              required
              value={name}
              onInput={(e) => setName(e.currentTarget.value)}
            />
          </IonItem>
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
