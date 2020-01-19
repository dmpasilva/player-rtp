import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TvProgram } from '../../models/tv-program';
import { ProgramDownloaderService } from '../../services/program-downloader/program-downloader';
import { KeyCodes } from '../../utils/key-codes';
import { ControllerInputService } from '../../services/controller-input/controller-input.service';

@Component({
  selector: 'app-episode-picker',
  templateUrl: './episode-picker.component.html',
  styleUrls: ['./episode-picker.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EpisodePickerComponent implements OnInit, OnDestroy {

  episodes = [];
  subscriptions = [];
  currentRow = 0;
  currentColumn = 0;

  constructor(private dialogRef: MatDialogRef<EpisodePickerComponent>,
              private programDownloader: ProgramDownloaderService,
              private controllerInputService: ControllerInputService,
              @Inject(MAT_DIALOG_DATA) public data: TvProgram) { }

  ngOnInit() {
    this.programDownloader.getProgramEpisodes(this.data.href)
      .subscribe(episodes => {
        console.log('episodes', episodes);
        this.episodes = episodes.episodes;
      });

    this.subscriptions.push(
      this.controllerInputService.onKeyPress()
        .subscribe(key => this.onKeyPress(key))
    );
  }

  private onKeyPress(key: number) {
    switch (key) {
      case KeyCodes.ARROW_UP:
        if (this.currentRow > 0) {
          this.currentRow -= 1;
        }
        break;
      case KeyCodes.ARROW_DOWN:
        if (this.currentColumn >= 0 && this.currentRow < this.episodes.length - 1) {
          this.currentRow += 1;
          this.currentColumn = 0;
        } else if (this.currentColumn === -1 && this.currentRow < this.episodes.length - 1) {
          this.currentRow += 1;
        }
        break;
      case KeyCodes.ARROW_RIGHT:
        if (this.currentColumn < 4) {
          this.currentColumn += 1;
        }
        if (this.currentRow > this.episodes.length - 1) {
          this.currentRow = this.episodes.length - 1;
        }
        break;
      case KeyCodes.ARROW_LEFT:
        if (this.currentColumn > -1) {
          this.currentColumn -= 1;
        }
        break;
      case KeyCodes.ENTER:
        const program = this.episodes[this.currentRow];
        this.dialogRef.close(program);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.map(sub => sub.unsubscribe());
  }
}
