const readCyStatePropLength = (prop) =>
    cy && cy.state(prop) ? cy.state(prop).length : 0;

const getResponseCount = () => readCyStatePropLength('responses');

const getRequestCount = () => readCyStatePropLength('requests');

const pluralize = (count, message) =>
    `${count} ${message}${
        count.toString().endsWith('1') && count !== 11 ? '' : 's'
    }`;

Cypress.Commands.add('waitForNetwork', (options) => {
    options = Cypress._.defaults(options, {
        timeout: Cypress.config().responseTimeout,
        idle: 1000
    });
    const commandStart = Date.now();
    let idleStart = commandStart;

    const responseCountInit = getResponseCount();

    cy.wrap(null, { timeout: options.timeout, log: false }).should(() => {
        const requestsFinished = getRequestCount() === getResponseCount();

        if (!requestsFinished) {
            idleStart = Date.now();
        }

        const elapsed = Date.now() - idleStart;

        const responseLoadedCount = getResponseCount() - responseCountInit;

        const message = requestsFinished
            ? `${pluralize(responseLoadedCount, 'request')} loaded in ${
                  Date.now() - commandStart
              } ms`
            : `waiting for ${pluralize(
                  getRequestCount() - getResponseCount(),
                  'request'
              )} to load`;

        assert(requestsFinished && elapsed >= options.idle, message);
    });
});

// run network checks for every cy.get request if waitForRequestsBeforeCyGet env var is true
if (Cypress.env('waitForRequestsBeforeCyGet') === true) {
    Cypress.Commands.overwrite('get', (originalGet, selector, options) => {
        return cy.waitForNetwork().then(() => originalGet(selector, options));
    });
}
