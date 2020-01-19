import { AfterViewInit, Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as videojs from 'video.js/dist/video';
import { ControllerInputService } from '../../services/controller-input/controller-input.service';
import { KeyCodes } from '../../utils/key-codes';
import { ListDownloaderService } from '../../services/list-downloader/list-downloader.service';
import { ProgramDownloaderService } from '../../services/program-downloader/program-downloader';
import { Episode } from '../../models/episode';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit, AfterViewInit, OnDestroy {

  private subscriptions = [];
  id = '';
  episode = '';
  name = '';
  url = '';

  @ViewChild('programVideo', { static: false })
  vid: ElementRef;

  player: any;

  showFF = false;
  showRw = false;

  constructor(private route: ActivatedRoute,
              private programDownloader: ProgramDownloaderService,
              private controllerInputService: ControllerInputService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.episode = this.route.snapshot.paramMap.get('episode');
    this.name = this.route.snapshot.paramMap.get('name');

    this.subscriptions.push(
      this.controllerInputService.onKeyPress()
        .subscribe(key => this.onKeyPress(key))
    );
  }

  ngAfterViewInit(): void {
    this.programDownloader.getEpisodeDetails(`${this.id}/${this.episode}/${this.name}`)
      .subscribe(ep => {
        const episode = new Episode(ep);
        this.url = episode.url;
        setTimeout(() => this.onEpisodeDownloaded());
      });
  }

  private onKeyPress(key: number) {
    switch (key) {
      case KeyCodes.ENTER:
        this.player.paused() ? this.player.play() : this.player.pause();
        break;
      case KeyCodes.ARROW_LEFT:
        this.player.currentTime(this.player.currentTime() - 15);

        this.showRw = true;
        setTimeout(() => {
          this.showRw = false;
        }, 500);


        break;
      case KeyCodes.ARROW_RIGHT:
        this.player.currentTime(this.player.currentTime() + 30);
        this.showFF = true;
        setTimeout(() => {
          this.showFF = false;
        }, 500);
        break;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onEpisodeDownloaded() {
    const options = {
      controls: true,
      autoplay: false,
      preload: 'auto',
      techOrder: ['html5']
    };
    this.player = new videojs(this.vid.nativeElement, options, function onPlayerReady() {
      videojs.log('Your player is ready!');
    });
    console.log(this.player);
    this.player.play();
  }
}
