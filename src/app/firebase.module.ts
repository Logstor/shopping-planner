import { NgModule } from "@angular/core";
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from "src/environments/environment";


@NgModule({
    imports: [
        provideFirebaseApp(() => initializeApp(environment.firebaseProjectCfg)),
        provideFirestore(() => getFirestore())
    ]
})
export class FirebaseModule { }
