import fs from 'fs';
import { createRequire } from 'module';
import path, { extname } from 'path';

import config from 'config';
import { Application, NextFunction, RequestHandler, Response } from 'express';
import multer from 'multer';

import { AccessCodePostController } from './app/access-code/AccessCodePostController.js';
import { getEndIdamSessionUrl } from './app/auth/user/oidc.js';
import { AppRequest } from './app/controller/AppRequest.js';
import { GetController } from './app/controller/GetController.js';
import { PostController } from './app/controller/PostController.js';
import { getServiceOrigin } from './app/controller/url.js';
import { DocumentManagerController } from './app/document/DocumentManagementController.js';
import { MAX_UPLOAD_FILE_COUNT, MAX_UPLOAD_FILE_SIZE_BYTES } from './app/document/DocumentUploadLimits.js';
import { AccessibilityStatementGetController } from './steps/accessibility-statement/get.js';
import * as applicant1AccessCodeContent from './steps/applicant1/enter-your-access-code/content.js';
import { Applicant1AccessCodeGetController } from './steps/applicant1/enter-your-access-code/get.js';
import { PostcodeLookupPostController } from './steps/applicant1/postcode-lookup/post.js';
import { ApplicationWithdrawnPreIssueGetController } from './steps/applicant1/withdraw-pre-issue/application-withdrawn/get.js';
import * as applicant2AccessCodeContent from './steps/applicant2/enter-your-access-code/content.js';
import { Applicant2AccessCodeGetController } from './steps/applicant2/enter-your-access-code/get.js';
import { ApplicationWithdrawnGetController } from './steps/application-withdrawn/get.js';
import { ContactUsGetController } from './steps/contact-us/get.js';
import { CookiesGetController } from './steps/cookies/get.js';
import { DraftApplicationSaveSignOutGetController } from './steps/draft-application-save-sign-out/get.js';
import { ErrorController, HTTPError } from './steps/error/error.controller.js';
import * as existingApplicationContent from './steps/existing-application/content.js';
import { ExistingApplicationGetController } from './steps/existing-application/get.js';
import { ExistingApplicationPostController } from './steps/existing-application/post.js';
import { HomeGetController } from './steps/home/get.js';
import { getUserSequence, stepsWithContent } from './steps/index.js';
import { NoResponseYetApplicationGetController } from './steps/no-response-yet/get.js';
import { PrivacyPolicyGetController } from './steps/privacy-policy/get.js';
import { RequestForInformationSaveSignOutGetController } from './steps/request-for-information-save-sign-out/get.js';
import { shouldHideRouteFromUser, shouldRedirectRouteToHub } from './steps/routeHiding.js';
import { SaveSignOutGetController } from './steps/save-sign-out/get.js';
import * as switchToSoleAppContent from './steps/switch-to-sole-application/content.js';
import { SwitchToSoleApplicationGetController } from './steps/switch-to-sole-application/get.js';
import { SwitchToSoleApplicationPostController } from './steps/switch-to-sole-application/post.js';
import { TermsAndConditionsGetController } from './steps/terms-and-conditions/get.js';
import { TimedOutGetController } from './steps/timed-out/get.js';
import {
  ACCESSIBILITY_STATEMENT_URL,
  ACTIVE,
  APPLICANT_1,
  APPLICANT_2,
  APPLICATION_WITHDRAWN,
  CONTACT_US,
  COOKIES_URL,
  CSRF_TOKEN_ERROR_URL,
  DOCUMENT_MANAGER,
  DRAFT_SAVE_AND_SIGN_OUT,
  ENTER_YOUR_ACCESS_CODE,
  EXISTING_APPLICATION,
  EXIT_SERVICE,
  HOME_URL,
  HUB_PAGE,
  NO_RESPONSE_YET,
  POSTCODE_LOOKUP,
  PRIVACY_POLICY_URL,
  REQUEST_FOR_INFORMATION_SAVE_AND_SIGN_OUT,
  RESPONDENT,
  SAVE_AND_SIGN_OUT,
  SIGN_OUT_URL,
  SWITCH_TO_SOLE_APPLICATION,
  TERMS_AND_CONDITIONS_URL,
  TIMED_OUT_URL,
  WEBCHAT_URL,
  WITHDRAW_CONFIRMATION,
} from './steps/urls.js';
import { WebChatGetController } from './steps/webchat/get.js';

const handleUploads = multer({
  limits: {
    fileSize: MAX_UPLOAD_FILE_SIZE_BYTES,
    files: MAX_UPLOAD_FILE_COUNT,
  },
});

const uploadFilesMiddleware: RequestHandler = (req, res, next) => {
  handleUploads.array('files[]', MAX_UPLOAD_FILE_COUNT)(req, res, err => {
    if (!err) {
      return next();
    }

    if (err instanceof multer.MulterError) {
      (req as AppRequest).locals?.logger?.warn(
        `Multer rejected upload(code=${err.code}, contentLength=${req.headers['content-length'] || 'n/a'})`
      );

      if (err.code === 'LIMIT_FILE_SIZE') {
        return next(new HTTPError('Uploaded file exceeds the 25MB limit', 413));
      }

      if (err.code === 'LIMIT_FILE_COUNT') {
        return next(new HTTPError('Uploaded file count exceeds the allowed limit', 400));
      }
    }

    return next(err);
  });
};

const requireFromRoot = createRequire(path.resolve(process.cwd(), 'package.json'));
const isTestRuntime = process.env.NODE_ENV === 'test' || Boolean(process.env.JEST_WORKER_ID);
const routesFilePath = isTestRuntime
  ? path.resolve(process.cwd(), 'src/main/routes.ts')
  : path.resolve(process.cwd(), 'src/main/main/routes.js');
const ext = extname(routesFilePath);

export class Routes {
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;
    const errorController = new ErrorController();

    app.get(CSRF_TOKEN_ERROR_URL, errorHandler(errorController.CSRFTokenError));
    app.get(EXISTING_APPLICATION, errorHandler(new ExistingApplicationGetController().get));
    app.post(
      EXISTING_APPLICATION,
      errorHandler(new ExistingApplicationPostController(existingApplicationContent.form.fields).post)
    );
    app.get(HOME_URL, errorHandler(new HomeGetController().get));
    app.get(DRAFT_SAVE_AND_SIGN_OUT, errorHandler(new DraftApplicationSaveSignOutGetController().get));
    app.get(
      REQUEST_FOR_INFORMATION_SAVE_AND_SIGN_OUT,
      errorHandler(new RequestForInformationSaveSignOutGetController().get)
    );
    app.get(SAVE_AND_SIGN_OUT, errorHandler(new SaveSignOutGetController().get));
    app.get(TIMED_OUT_URL, errorHandler(new TimedOutGetController().get));
    app.get(PRIVACY_POLICY_URL, errorHandler(new PrivacyPolicyGetController().get));
    app.get(TERMS_AND_CONDITIONS_URL, errorHandler(new TermsAndConditionsGetController().get));
    app.get(COOKIES_URL, errorHandler(new CookiesGetController().get));
    app.get(ACCESSIBILITY_STATEMENT_URL, errorHandler(new AccessibilityStatementGetController().get));
    app.get(WEBCHAT_URL, errorHandler(new WebChatGetController().get));
    app.get(APPLICATION_WITHDRAWN, errorHandler(new ApplicationWithdrawnGetController().get));
    app.get(WITHDRAW_CONFIRMATION, errorHandler(new ApplicationWithdrawnPreIssueGetController().get));
    app.get(
      `${APPLICANT_2}${WITHDRAW_CONFIRMATION}`,
      errorHandler(new ApplicationWithdrawnPreIssueGetController().get)
    );
    app.get(CONTACT_US, errorHandler(new ContactUsGetController().get));
    app.post(POSTCODE_LOOKUP, errorHandler(new PostcodeLookupPostController().post));

    const documentManagerController = new DocumentManagerController();
    app.post(DOCUMENT_MANAGER, uploadFilesMiddleware, errorHandler(documentManagerController.post));
    app.post(`${DOCUMENT_MANAGER}/delete/:index`, errorHandler(documentManagerController.delete));

    for (const step of stepsWithContent) {
      const getController = fs.existsSync(`${step.stepDir}/get${ext}`)
        ? requireFromRoot(`${step.stepDir}/get${ext}`).default
        : GetController;

      app.get(
        step.url,
        this.isRouteForUser as RequestHandler,
        errorHandler(new getController(step.view, step.generateContent).get)
      );

      if (step.form) {
        const postController = fs.existsSync(`${step.stepDir}/post${ext}`)
          ? requireFromRoot(`${step.stepDir}/post${ext}`).default
          : PostController;
        app.post(step.url, errorHandler(new postController(step.form.fields).post));
      }
    }

    app.get(
      [APPLICANT_2, RESPONDENT, `${APPLICANT_2}${ENTER_YOUR_ACCESS_CODE}`],
      errorHandler(new Applicant2AccessCodeGetController().get)
    );
    app.post(
      [APPLICANT_2, RESPONDENT, `${APPLICANT_2}${ENTER_YOUR_ACCESS_CODE}`],
      errorHandler(new AccessCodePostController(applicant2AccessCodeContent.form.fields).post)
    );

    // New routes for APPLICANT_1
    app.get(
      [APPLICANT_1, `${APPLICANT_1}${ENTER_YOUR_ACCESS_CODE}`],
      errorHandler(new Applicant1AccessCodeGetController().get)
    );
    app.post(
      [APPLICANT_1, `${APPLICANT_1}${ENTER_YOUR_ACCESS_CODE}`],
      errorHandler(new AccessCodePostController(applicant1AccessCodeContent.form.fields).post)
    );

    app.get(NO_RESPONSE_YET, errorHandler(new NoResponseYetApplicationGetController().get));

    app.get(SWITCH_TO_SOLE_APPLICATION, errorHandler(new SwitchToSoleApplicationGetController().get));
    app.post(
      SWITCH_TO_SOLE_APPLICATION,
      errorHandler(new SwitchToSoleApplicationPostController(switchToSoleAppContent.form.fields).post)
    );

    app.get(
      ACTIVE,
      errorHandler((req: AppRequest, res: Response) => {
        if (!req.session.user) {
          return res.redirect(SIGN_OUT_URL);
        }
        req.session.cookie.expires = new Date(Date.now() + (config.get('session.maxAge') as number));
        req.session.cookie.maxAge = config.get('session.maxAge');
        req.session.save(err => {
          if (err) {
            throw err;
          }
          res.end();
        });
      })
    );

    app.get(
      EXIT_SERVICE,
      errorHandler((req: AppRequest, res: Response) => {
        req.session.destroy(err => {
          if (err) {
            throw err;
          }

          const postLogoutRedirectUri = getServiceOrigin(req, res);

          res.redirect(getEndIdamSessionUrl(postLogoutRedirectUri));
        });
      })
    );

    app.use(errorController.notFound as unknown as RequestHandler);
  }

  private isRouteForUser(req: AppRequest, res: Response, next: NextFunction): void {
    const isApp2Route = [APPLICANT_2, RESPONDENT].some(prefixUrl => req.path.includes(prefixUrl));
    if (
      isApp2Route !== req.session.isApplicant2 ||
      !getUserSequence(req).some(r => req.path.includes(r.url)) ||
      shouldHideRouteFromUser(req)
    ) {
      return shouldRedirectRouteToHub(req) ? res.redirect(HUB_PAGE) : res.redirect('/error');
    }
    next();
  }
}
