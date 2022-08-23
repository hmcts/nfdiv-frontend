import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/pdf/pdf.worker.js';

pdfjsLib.getDocument('/downloads/respondent-answers').promise.then(
  async pdfDocument => {
    const pdf = new PdfDocument(pdfDocument);
    await pdf.load();
  },
  err => console.log(err)
);

class PdfDocument {
  container: HTMLDivElement | undefined;
  currentPage = 1;
  pageAwaitingRender: number | undefined;
  renderInProgress = false;

  constructor(private pdf) {}

  async load() {
    console.log('PDF loaded', this.pdf.numPages);
    this.container = document.getElementById('pdf-container') as HTMLDivElement;
    if (this.container) {
      if (this.pdf.numPages > 1) {
        const prevLink = this.container.querySelector('#prev-page') as HTMLButtonElement;
        prevLink.removeAttribute('hidden');
        prevLink.onclick = () => this.renderPrevPage();

        const nextLink = this.container.querySelector('#next-page') as HTMLButtonElement;
        nextLink.removeAttribute('hidden');
        nextLink.onclick = () => this.renderNextPage();
      }
      await this.renderPage();
    }
  }

  async renderPrevPage(): Promise<void> {
    if (this.currentPage <= 1) {
      return;
    }
    this.currentPage--;
    await this.queuePageForRender();
  }

  async renderNextPage(): Promise<void> {
    if (this.currentPage >= this.pdf.numPages) {
      return;
    }
    this.currentPage++;
    await this.queuePageForRender();
  }

  async queuePageForRender(): Promise<void> {
    if (this.renderInProgress) {
      this.pageAwaitingRender = this.currentPage;
    } else {
      await this.renderPage();
    }
  }

  async renderPage() {
    this.renderInProgress = true;
    const page = await this.pdf.getPage(this.currentPage);
    const canvas = this.container?.getElementsByTagName('canvas').item(0) as HTMLCanvasElement;

    const viewport = page.getViewport({ scale: 1.5 });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const context = canvas.getContext('2d');
    if (context) {
      const renderContext = {
        canvasContext: context,
        viewport,
      };
      await page.render(renderContext);
      this.renderInProgress = false;
      if (this.pageAwaitingRender) {
        this.currentPage = this.pageAwaitingRender;
        await this.renderPage();
      }
      this.container?.removeAttribute('hidden');

      console.log('Page rendered', this.currentPage);
    }
  }
}
