import * as pdfjsLib from 'pdfjs-dist';

import 'pdfjs-dist/build/pdf.worker';
import { downloadEndpoints } from '../../modules/document-download/downloadEndpoints';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/pdf/pdf.worker.js';

const loadingMsg = document.getElementById('loading-msg') as HTMLDivElement;
const pdfContainer = document.getElementById('pdf-container') as HTMLDivElement;
if (pdfContainer) {
  pdfjsLib.getDocument(downloadEndpoints.RESPONDENT_ANSWERS).promise.then(
    async pdfDocument => {
      console.log('PDF loaded');
      const pdf = new PdfDocument(pdfDocument);
      await pdf.load();
      loadingMsg.setAttribute('hidden', 'hidden');
    },
    err => {
      console.log('failed to load pdf', err);
      const downloadLink = document.getElementById('download-link') as HTMLAnchorElement;
      downloadLink.removeAttribute('hidden');
      loadingMsg.setAttribute('hidden', 'hidden');
    }
  );
}

class PdfDocument {
  currentPage = 1;
  pageAwaitingRender: number | undefined;
  renderInProgress = false;

  constructor(private pdf) {}

  async load() {
    if (pdfContainer) {
      if (this.pdf.numPages > 1) {
        const prevLink = pdfContainer.querySelector('#prev-page') as HTMLButtonElement;
        prevLink.removeAttribute('hidden');
        prevLink.onclick = () => this.renderPrevPage();

        const nextLink = pdfContainer.querySelector('#next-page') as HTMLButtonElement;
        nextLink.removeAttribute('hidden');
        nextLink.onclick = () => this.renderNextPage();

        const numberOfPages = document.getElementById('pages-total') as HTMLSpanElement;
        if (numberOfPages) {
          numberOfPages.textContent = this.pdf.numPages;
        }
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
    const canvas = pdfContainer.getElementsByTagName('canvas').item(0) as HTMLCanvasElement;

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
      const currentPage = document.getElementById('current-page') as HTMLSpanElement;
      if (this.pdf.numPages > 1 && currentPage) {
        currentPage.textContent = `${this.currentPage}/`;
      }
      pdfContainer.removeAttribute('hidden');

      console.log('Page rendered', this.currentPage);
    }
  }
}
