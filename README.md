# @shelex/cypress-wait-network

> Plugin that adds `cy.waitForNetwork` command that ensures background network requests are finished
> You can also enable automatic waiting before every cy.get by setting env var `waitForRequestsBeforeCyGet`

![Build][gh-image]
[![Downloads][downloads-image]][npm-url]
[![semantic-release][semantic-image]][semantic-url]  
[![version][version-image]][npm-url]
[![License][license-image]][license-url]

## Installation

-   download package:

    -   using yarn:

    ```bash
    yarn add -D @shelex/cypress-wait-network
    ```

    -   using npm:

    ```
    npm i -D @shelex/cypress-wait-network
    ```

-   register command in `cypress/support/index.js` file:

    -   with `import`:

    ```js
    import '@shelex/cypress-wait-network';
    ```

    -   or with `require`:

    ```js
    require('@shelex/cypress-wait-network');
    ```

-   for IntelliSense (autocompletion) support in your IDE

    -   add to your files:

    ```js
    /// <reference types="@shelex/cypress-wait-network" />
    ```

    -   or update your tsconfig.json `include` section:

    ```json
    "include": [
        "cypress",
        "@shelex/cypress-wait-network",
    ]
    ```

## Options

Command `cy.waitForNetwork` accepts an options object with such properties:

| property  | description                                            | default                                |
| :-------- | :----------------------------------------------------- | :------------------------------------- |
| `timeout` | timeout for requests loading (ms)                      | Cypress.config().responseTimeout (30s) |
| `idle`    | time to wait till network is recognized as idle (ms)\* | 1000 ms                                |

\* `idle` could be used to apply waiting strategy to your specific needs, as requests may be triggered after default `idle` is finished, usually caused by debouncing on front-end. By default command uses 1 second idle check which means in case there are no requests loading - it will wait minimum ~ 1s before finishing command, in case there are requests - it will reset timer until there would be at least 1 second when all responses are received, no other requests loading so we can treat network as idle.

## Configuration

Plugin is customizable via Cypress environment variables:

| env variable name            | description                                        | default |
| :--------------------------- | :------------------------------------------------- | :------ |
| `waitForRequestsBeforeCyGet` | run `waitForNetwork` command before every `cy.get` | false   |

This options could be passed:

-   via `cypress.json`

    ```json
    {
        "env": {
            "waitForRequestsBeforeCyGet": true
        }
    }
    ```

-   via `command line`:
    as [Cypress environment variables](https://docs.cypress.io/guides/guides/environment-variables#Option-4-env) are used please take into account that cli should have only one argument `--env` or `-e`, otherwise values will not be passed

        ```bash
        yarn cypress run --env waitForRequestsBeforeCyGet=true

        # for windows:
        yarn cypress run --env  "waitForRequestsBeforeCyGet=true","otherEnvVar=value"
        ```

## Credits

Inspired by Gleb Bahmutov <gleb.bahmutov@gmail.com> who made [cypress-network-idle](https://github.com/bahmutov/cypress-network-idle) plugin that has same purpose. Moreover command `cy.waitForNetworkIdle(2000)` from `cypress-network-idle` is quite same as `cy.waitForNetwork(2000)` from this package, first is based on interception and counters, this package just checks requests and responses from `cy.state`

## License

Copyright 2021 Oleksandr Shevtsov <ovr.shevtsov@gmail.com>.  
This project is licensed under the MIT License.

[npm-url]: https://npmjs.com/package/@shelex/cypress-wait-network
[gh-image]: https://github.com/Shelex/cypress-wait-network/workflows/build/badge.svg?branch=master
[types-path]: ./index.d.ts
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[license-image]: https://img.shields.io/npm/l/@shelex/cypress-wait-network
[license-url]: https://opensource.org/licenses/MIT
[version-image]: https://badgen.net/npm/v/@shelex/cypress-wait-network/latest
[downloads-image]: https://badgen.net/npm/dt/@shelex/cypress-wait-network
