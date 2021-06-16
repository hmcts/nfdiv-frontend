import fs from 'fs';

import { Application, RequestHandler, Response } from 'express';
import multer from 'multer';

import { UserRole } from './app/case/definition';
import { AppRequest } from './app/controller/AppRequest';
import { DocumentManagerController } from './app/controller/DocumentManagementController';
import { GetController } from './app/controller/GetController';
import { PostController } from './app/controller/PostController';
import { Form } from './app/form/Form';
import { cookieMaxAge } from './modules/session';
import { stepsWithContent } from './steps';
import { AccessibilityStatementGetController } from './steps/accessibility-statement/get';
import { CookiesGetController } from './steps/cookies/get';
import { ErrorController } from './steps/error/error.controller';
import { HomeGetController } from './steps/home/get';
import { PostcodeLookupPostController } from './steps/postcode-lookup/post';
import { PrivacyPolicyGetController } from './steps/privacy-policy/get';
import { SaveSignOutGetController } from './steps/save-sign-out/get';
import { TermsAndConditionsGetController } from './steps/terms-and-conditions/get';
import { TimedOutGetController } from './steps/timed-out/get';
import {
  ACCESSIBILITY_STATEMENT_URL,
  COOKIES_URL,
  CSRF_TOKEN_ERROR_URL,
  DOCUMENT_MANAGER,
  HOME_URL,
  POSTCODE_LOOKUP,
  PRIVACY_POLICY_URL,
  SAVE_AND_SIGN_OUT,
  SIGN_OUT_URL,
  TERMS_AND_CONDITIONS_URL,
  TIMED_OUT_URL,
} from './steps/urls';

const handleUploads = multer();

export class Routes {
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;
    const errorController = new ErrorController();

    app.get(CSRF_TOKEN_ERROR_URL, errorHandler(errorController.CSRFTokenError));
    app.get(HOME_URL, errorHandler(new HomeGetController().get));
    app.get(SAVE_AND_SIGN_OUT, errorHandler(new SaveSignOutGetController().get));
    app.get(TIMED_OUT_URL, errorHandler(new TimedOutGetController().get));
    app.get(PRIVACY_POLICY_URL, errorHandler(new PrivacyPolicyGetController().get));
    app.get(TERMS_AND_CONDITIONS_URL, errorHandler(new TermsAndConditionsGetController().get));
    app.get(COOKIES_URL, errorHandler(new CookiesGetController().get));
    app.get(ACCESSIBILITY_STATEMENT_URL, errorHandler(new AccessibilityStatementGetController().get));
    app.post(POSTCODE_LOOKUP, errorHandler(new PostcodeLookupPostController().post));

    const documentManagerController = new DocumentManagerController();
    app.post(DOCUMENT_MANAGER, handleUploads.array('files[]', 5), errorHandler(documentManagerController.post));
    app.get(`${DOCUMENT_MANAGER}/delete/:id`, errorHandler(documentManagerController.delete));

    for (const step of stepsWithContent) {
      const dir = `${__dirname}/steps${step.url}`;
      if (!fs.existsSync(dir)) {
        setUpCustomApplicantControllers(app, step);
      } else {
        const view = getStepView(dir);
        const getController = getGetController(dir);

        app.get(step.url, errorHandler(new getController(view, step.generateContent).get));

        if (step.form) {
          const postController = getPostController(dir);
          app.post(step.url, errorHandler(new postController(new Form(step.form)).post));
        }
      }
    }

    app.get(
      '/active',
      errorHandler((req: AppRequest, res: Response) => {
        if (!req.session.user) {
          return res.redirect(SIGN_OUT_URL);
        }
        req.session.cookie.expires = new Date(Date.now() + cookieMaxAge);
        req.session.cookie.maxAge = cookieMaxAge;
        req.session.save(err => {
          if (err) {
            throw err;
          }
          res.end();
        });
      })
    );

    app.use(errorController.notFound as unknown as RequestHandler);
  }
}

const getDir = (userRoles: string[]) => {
  return userRoles.includes(UserRole.APPLICANT_2_SOLICITOR)
    ? `${__dirname}/steps/applicant2`
    : `${__dirname}/steps/applicant1`;
};

const getStepView = (dir: string) => {
  const customView = `${dir}/template.njk`;
  return fs.existsSync(customView) ? customView : `${dir}/../common/template.njk`;
};

const getStepContent = (dir: string) => {
  const customContent = `${dir}/content.ts`;
  return fs.existsSync(customContent) ? require(customContent) : {};
};

const getGetController = (dir: string) => {
  return fs.existsSync(`${dir}/get.ts`) ? require(`${dir}/get.ts`).default : GetController;
};

const getPostController = (dir: string) => {
  return fs.existsSync(`${dir}/post.ts`) ? require(`${dir}/post.ts`).default : PostController;
};

const setUpCustomApplicantControllers = (app: Application, step) => {
  const { errorHandler } = app.locals;
  app.get(
    step.url,
    errorHandler((req, res) => {
      const dir = getDir(req.session.user.roles) + step.url;

      const view = getStepView(dir);
      const getController = getGetController(dir);

      new getController(view, getStepContent(dir).generateContent).get(req, res);
    })
  );
  if (step.form) {
    app.post(
      step.url,
      errorHandler((req, res) => {
        const dir = getDir(req.session.user.roles) + step.url;

        const postController = getPostController(dir);
        new postController(new Form(step.form)).post(req, res);
      })
    );
  }
};
