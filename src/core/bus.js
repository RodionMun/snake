class EventBus {
    constructor () {
        if (!EventBus.instance) {
            EventBus.instance = this
        }

        this.subscriptions = {};
        this.unsubscribeTokens = [];
        this.subscriptionPointers = [];

        return EventBus.instance
    }

    subscribe (nameOfMessage, callback) {
        let i;
        let subscriptionPointer;
        let unsubscribeToken;

        if (typeof nameOfMessage !== 'string') {
            throw new Error("eventBus.subscribe requires a first string argument 'nameOfMessage'");
        }
        if (typeof callback !== 'function') {
            throw new Error("eventBus.subscribe requires a second function argument 'callback'")
        }

        if (!this.subscriptions[nameOfMessage]) {
            this.subscriptions[nameOfMessage] = [];
        }

        this.subscriptions[nameOfMessage] = callback;

        // package and return an unsubscribe token.
        subscriptionPointer = {nameOfMessage: nameOfMessage};
        i = this.subscriptionPointers.length;
        unsubscribeToken = {};
        this.subscriptionPointers[i] = subscriptionPointer;
        this.unsubscribeTokens[i] = unsubscribeToken;
        return unsubscribeToken;
    };

    publish (nameOfMessage, data) {
        if (typeof nameOfMessage !== 'string') {
            throw new Error("eventBus.publish requires a first string argument 'nameOfMessage'");
        }

        if (!data) {
            throw new Error("eventBus.publish requires a second argument 'data'");
        }

        let callback;

        if (this.subscriptions[nameOfMessage]) {
            callback = this.subscriptions[nameOfMessage];
            callback(data);
        }
    }

    unsubscribe (unsubscribeToken) {
        if (unsubscribeToken === null) {
            this.subscriptions = {};
        }
        else {
            let subscriptionPointer = this.subscriptionPointers[this.unsubscribeTokens.indexOf(unsubscribeToken)];
            this.subscriptions[subscriptionPointer.nameOfMessage] = null;
        }
    }
}

const bus = new EventBus()
Object.freeze(bus)

export default bus
