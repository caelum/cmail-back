import chai from 'chai';
import supertest from 'supertest';
import appServer from '../../../src/app';

export const expect = chai.expect;
export const app = appServer;
export const request = supertest(appServer);