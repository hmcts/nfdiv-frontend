import { Logger } from '@hmcts/nodejs-logging';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/pdf/pdf.worker.js';

const logger = Logger.getLogger('pdfjs');

pdfjsLib.getDocument('/downloads/respondent-answers').promise.then(
  async pdfDocument => {
    logger.info('PDF loaded', pdfDocument.numPages);

    const page = await pdfDocument.getPage(1);
    logger.info('Page loaded');

    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.getElementById('pdf-canvas') as HTMLCanvasElement;
    if (canvas) {
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      if (context) {
        const renderContext = {
          canvasContext: context,
          viewport,
        };

        await page.render(renderContext);
        logger.info('Page rendered');
      }
    }
  },
  err => {
    logger.error(err);
  }
);
