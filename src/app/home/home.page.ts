import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {
  //* [Tarea]: Agregar información de mínimo 3 slides para mostrar en la vista. ✅

  genres = [
    {
      title: '🎧 Hip-Hop',
      image: 'https://www.shutterstock.com/image-vector/street-dancers-dancing-silhouette-hip-260nw-2574432969.jpg',
      description: 'Un género lleno de ritmo, creatividad y estilo. Nació en las calles y se convirtió en una forma de expresión que une música, baile y cultura.'
    },
    {
      title: '🎸 Rock',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtq6-eNJV0PJ2eXcnRE5IKEZGMUKpts9-tGgRskyKF9CfiBB8AN7isNI562Rj7SZAJoOI&usqp=CAU',
      description: 'Energía, pasión y guitarras inolvidables. El rock abarca desde los clásicos legendarios hasta los sonidos más modernos que siguen haciendo vibrar al mundo.'
    },
    {
      title: '🎤 Rap',
      image: 'https://media.vaticannews.va/media/content/dam-archive/vaticannews/multimedia/2019/11/15/02raper.jpg/_jcr_content/renditions/cq5dam.thumbnail.cropped.750.422.jpeg',
      description: 'Más que rimas rápidas, el rap es una forma poderosa de contar historias, compartir ideas y conectar con la realidad a través de la música.'
    }
  ]

  constructor() { }
}
