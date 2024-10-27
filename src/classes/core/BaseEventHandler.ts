import { DiscordClient } from '@structures/DiscordClient'

/**
 * Assert the parameters of T.
 */
export type AssertParameters<T> = T extends unknown[] ? T : never

/**
 * The event handler interface.
 */
export interface IEventHandlerConstructor<Events extends Record<string, any> = Record<string, any>, Names extends keyof Events = keyof Events> {
    /**
     * The name of the event.
     */
    name: Names
    /**
     * The description of this event.
     */
    description: string
    /**
     * Event executor.
     */
    call(this: DiscordClient, ...args: AssertParameters<Events[Names]>): Promise<any> | any
}

/**
 * Represents a base BDJS event handler.
 */
export class BaseEventHandler<Events extends Record<string, any> = Record<string, any>, Names extends keyof Events = keyof Events> {
    /**
     * Initializes a new instance of `BaseEventHandler`.
     * @param data - Event data to load to the instance.
     */
    constructor(private data: IEventHandlerConstructor<Events, Names>) {}

    /**
     * Attach the event to a listener.
     * @param client - DiscordClient reference.
     * @returns {void}
     */
    public attach(client: DiscordClient) {}

    /**
     * Returns the name of the event.
     */
    public get name() {
        return this.data.name
    }

    /**
     * Returns the executor of the event.
     */
    public get call() {
        return this.data.call
    }
}