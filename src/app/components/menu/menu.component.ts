import { Component, OnDestroy, OnInit } from '@angular/core';
import { ControllerInputService } from '../../services/controller-input/controller-input.service';
import { Subscription } from 'rxjs';
import { KeyCodes } from '../../utils/key-codes';
import { TvProgram } from '../../models/tv-program';
import { ListDownloaderService } from '../../services/list-downloader/list-downloader.service';
import * as SpatialNavigation from 'spatial-navigation-js/spatial_navigation';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { EpisodePickerComponent } from '../episode-picker/episode-picker.component';
import { Episode } from '../../models/episode';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  ready = false;
  currentCategory = 0;

  constructor(private controllerInputService: ControllerInputService,
              private listDownloader: ListDownloaderService,
              private dialog: MatDialog,
              private router: Router) { }

  keyCode = KeyCodes.ENTER;
  rows: TvProgram[][] = [];
  categories = [];
  programs: any[] = [];

  currentRow = 0;
  currentColumn = 0;

  ngOnInit() {
    this.subscriptions.push(
      this.controllerInputService.onKeyPress()
        .subscribe(key => this.onKeyPress(key))
    );

    this.listDownloader.getPrograms()
      .subscribe(programs => {
        this.programs = programs;
        for (let i = 0; i < this.programs.length; i++) {
          if (i % 5 === 0) {
            this.rows.push([]);
          }
          this.rows[this.rows.length - 1].push(this.programs[i]);
        }
        this.ready = true;
      });

    this.listDownloader.getVodCategories()
      .subscribe(categories => {
        console.log('categories', categories);
        this.categories = categories;
      });
    SpatialNavigation.init();
  }

  private onKeyPress(key: number) {
    switch (key) {
      case KeyCodes.ARROW_UP:
        if (this.currentRow > 0) {
          this.currentRow -= 1;
        }
        break;
      case KeyCodes.ARROW_DOWN:
        if (this.currentColumn >= 0 && this.currentRow < this.rows.length - 1) {
          this.currentRow += 1;
          this.currentColumn = 0;
        } else if (this.currentColumn === -1 && this.currentRow < this.categories.length - 1) {
          this.currentRow += 1;
        }
        break;
      case KeyCodes.ARROW_RIGHT:
        if (this.currentColumn < 4) {
          this.currentColumn += 1;
        }
        if (this.currentRow > this.rows.length - 1) {
          this.currentRow = this.rows.length - 1;
        }
        break;
      case KeyCodes.ARROW_LEFT:
        if (this.currentColumn > -1) {
          this.currentColumn -= 1;
        }
        break;
      case KeyCodes.ENTER:
        const program = this.rows[this.currentRow][this.currentColumn];
        this.ngOnDestroy();
        this.dialog.open(EpisodePickerComponent, {data: program})
          .afterClosed()
          .subscribe((episode: any) => {
            console.log('will go to', episode);
            if (episode) {
              this.router.navigate(['program', ... episode.href.split('/')]);
            } else {
              this.subscriptions.push(
                this.controllerInputService.onKeyPress()
                  .subscribe(k => this.onKeyPress(k))
              );
            }
            }
          );

    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
