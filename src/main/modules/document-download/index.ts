import { ClientRequest } from 'http';

import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { getServiceAuthToken } from '../../app/auth/service/get-service-auth-token';

const app = express();

const dmStoreProxy = {
  endpoints: ['/downloads/divorce-application'], // is this the end point we listen to in order to know to use this proxy
  target: 'http://dm-store-aat.service.core-compute-aat.internal', // this target is what we need to dynamically set based on the binaryUrl of case document
};

const customRouter = function (req) {
  console.log('using proxy :)');
  return req.session.userCase?.documents.findFirst(doc => doc.type === 'Divorce application').binaryUrl;
};

app.use(
  createProxyMiddleware(dmStoreProxy.endpoints, {
    // using createProxyMiddleware rather than just proxy?
    target: dmStoreProxy.target, // so we use a router to set this dynamically?
    pathRewrite: customRouter,
    onProxyReq: (req: ClientRequest) => {
      req.setHeader('user-roles', 'caseworker'); // is caseworker correct? check what is used for doc upload
      req.setHeader('ServiceAuthorization', getServiceAuthToken()); // will this be the correct service auth - double check last
    },
    secure: false,
    changeOrigin: true,
  })
);

// app.listen(config.port);   not sure if have to add app.listen?
