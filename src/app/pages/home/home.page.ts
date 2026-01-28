import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StorageService } from '../../services/storage-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MusicService } from 'src/app/services/music-service';
import { TracksModalPage } from '../tracks-modal/tracks-modal.page';
import { NowPlayingService } from 'src/app/services/now-playing-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {

  //* [Tarea]: Agregar información de mínimo 3 slides para mostrar en la vista. ✅
  //* [Tarea]: Cambiar mediante el click de un boton el tema (color) de los slides. ✅

  isLoadingTracks: boolean = false;
  isLoadingAlbums: boolean = false;
  isLoadingArtists: boolean = false;
  tema: any = {
    modo: 'oscuro',
    bg: 'var(--eco-bg-app)',
    texto: 'var(--eco-texto-principal)',
    icon: 'sunny-sharp'
  }
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
  ];
  localArtists: any[] = [];
  tracks: any[] = [];
  albums: any[] = [];
  artists: any[] = [];

  constructor(
    private storageService: StorageService,
    private router: Router,
    private musicService: MusicService,
    private modalCtrl: ModalController,
    private nowPlayingService: NowPlayingService
  ) { }

  async ngOnInit() {
    this.simularCargarDatos();
    this.loadTracks();
    this.loadAlbums();
    this.loadArtists();
    this.getLocalArtists();
    await this.nowPlayingService.initialize();
    await this.loadStorageData();
  }

  async loadTracks() {
    this.isLoadingTracks = true;

    this.musicService.getTracks().then(tracks => {
      this.tracks = tracks;

      this.tracks.forEach(track => {
        this.musicService.getAlbumByArtist(track.artist_id).then(artist => {
          track.artist = artist[0]?.name;
          track.image = artist[0]?.image;
        });
      });

      this.isLoadingTracks = false;
    });
  }

  async loadAlbums() {
    this.isLoadingAlbums = true;

    this.musicService.getAlbums().then(albums => {
      this.albums = albums;

      this.albums.forEach(album => {
        this.musicService.getArtist(album.artist_id).then(artist => {
          album.artist = artist.name;
        });
      });

      this.isLoadingAlbums = false;
    });
  }

  // * [Tarea]: Crear servicio para obtener artistas desde el servicio API. ✅
  async loadArtists() {
    this.isLoadingArtists = true;

    this.musicService.getArtists().then(artists => {
      this.isLoadingArtists = false;
      this.artists = artists;
    });
  }

  getLocalArtists() {
    this.localArtists = this.musicService.getLocalArtists().artists;
    console.log('Artistas locales:', this.localArtists);
  }

  async cambiarTema() {
    const temaClaro = {
      modo: 'claro',
      bg: 'var(--eco-bg-app)',
      texto: 'var(--eco-texto-principal)',
      icon: 'moon-sharp'
    };

    const temaOscuro = {
      modo: 'oscuro',
      bg: 'var(--eco-bg-app)',
      texto: 'var(--eco-texto-principal)',
      icon: 'sunny-sharp'
    };

    this.tema = this.tema.modo === 'oscuro' ? temaClaro : temaOscuro;

    await this.storageService.set('theme', this.tema);
  }

  async loadStorageData() {
    const theme = await this.storageService.get("theme");
    if (theme) this.tema = theme;
  }

  async simularCargarDatos() {
    const data = await this.obtenerDatosSimulados();
    console.log('Datos simulados:', data);
  }

  async obtenerDatosSimulados() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(['🎧 Hip-Hop', '🎸 Rock', '🎤 Rap']);
        // reject('Hubo un error al cargar los datos simulados');
      }, 6000);
    });
  }

  async showTracksByAlbums(album: any) {
    const tracks = await this.musicService.getTracksByAlbum(album.id);
    const artist = await this.musicService.getArtist(album.artist_id);

    const modal = await this.modalCtrl.create({
      component: TracksModalPage,
      componentProps: {
        info: {
          tracks: tracks,
          type: 'album',
          name: album.name,
          image: album.image,
          artist: artist.name,
          image_artist: artist.image,
          release_date: album.release_date
        }
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const selectedTrack = result.data;
        selectedTrack.image = album.image;
        selectedTrack.artist = artist.name;

        this.nowPlayingService.setTrack(selectedTrack);
      }
    });

    modal.present();
  }

  // * [Tarea]: Crear un servicio para obtener las canciones de un artista. ✅
  // * [Tarea]: Crear funcion para abrir la modal ya creada y enviar en los props las canciones del artista. ✅
  async showTracksByArtist(artist: any) {
    const tracks = await this.musicService.getTracksByArtist(artist.id);
    const album = await this.musicService.getAlbumByArtist(artist.id);

    const modal = await this.modalCtrl.create({
      component: TracksModalPage,
      componentProps: {
        info: {
          tracks: tracks,
          type: 'artist',
          name: artist.name,
          image: artist.image,
          popularity: artist.popularity,
          followers: artist.followers
        }
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const selectedTrack = result.data;
        selectedTrack.image = album[0]?.image;
        selectedTrack.artist = artist.name;

        this.nowPlayingService.setTrack(selectedTrack);
      }
    });

    modal.present();
  }

  //* [Tarea]: Agregar función para navegar a la página intro. ✅
  navigateTo() {
    this.router.navigateByUrl('/intro');
  }
}
