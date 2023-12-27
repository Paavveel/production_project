// / <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

import { login } from './commands/login';

Cypress.Commands.add('login', login);

declare global {
  namespace Cypress {
    interface Chainable {
      login(username?: string, password?: string): Chainable<void>;
    }
  }
}

export {};
