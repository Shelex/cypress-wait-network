interface waitNetworkOptions {
    timeout?: number;
    idle?: number;
}

declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            /**
             * wait until network requests are loaded.
             * uses cypress responseTimeout (30s) as global timeout and 1s as idle check
             * @deprecated does not work for cypress v12+, please check docs for details
             * @link https://github.com/Shelex/cypress-wait-network
             */
            waitForNetwork(options?: waitNetworkOptions): Chainable<void>;
        }
    }
}

// hack for ts engine to avoid complaining about global scope augmentations
export {};
