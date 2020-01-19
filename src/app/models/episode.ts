export class Episode {
  season?: number;
  episode: number;
  title: string;
  synopsis: string;
  duration?: number;
  thumbnail: string;
  parts: string[] = [];
  url: string;

  constructor(episode: any) {
    this.title = episode.title;
    this.url = episode.potentialUrls.filter(url => url != null)[0];

    if (episode.parts && episode.parts.length) {
      this.parts = episode.parts;
    }
  }
}
