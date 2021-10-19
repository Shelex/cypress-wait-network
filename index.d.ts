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
             */
            waitForNetwork(options?: waitNetworkOptions): Chainable<void>;
        }
    }
}

// hack for ts engine to avoid complaining about global scope augmentations
export {};
