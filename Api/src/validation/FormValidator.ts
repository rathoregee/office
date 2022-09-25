import { injectable } from 'inversify';
import { Validator } from 'fluentvalidation-ts';
import { IFormData } from '../lib/IFormData';

@injectable()
export class FormValidator extends Validator<IFormData> {
    constructor() {
        super();

        this.ruleFor('correlationId')
            .notEmpty()
            .withMessage('CorrelationId is required');

        this.ruleFor('from')
            .emailAddress()
            .withMessage('From email address is not valid');

        this.ruleForEach('to')
            .emailAddress()
            .withMessage('To email address/addresses are not valid');

        this.ruleForEach('cc')
            .emailAddress()
            .withMessage('CC email address/addresses are not valid');

        this.ruleForEach('bcc')
            .emailAddress()
            .withMessage('BCC email address/addresses are not valid');

        this.ruleFor('subject')
            .notEmpty()
            .withMessage('Email subject is required');

        this.ruleFor('body').notEmpty().withMessage('Email body is required');
    }
}
