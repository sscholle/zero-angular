import { CustomMutatorDefs, Schema, Zero } from '@rocicorp/zero';
import { Injectable, InjectionToken, Provider, inject } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ZERO_TOKEN = new InjectionToken<Zero<any, any>>('ZERO_TOKEN');

@Injectable({
    providedIn: 'root',
})
export class ZeroService<S extends Schema, MD extends CustomMutatorDefs<S> | undefined = undefined> {
    private zero: Zero<S, MD>;

    constructor() {
        this.zero = inject(ZERO_TOKEN) as Zero<S, MD>;
    }

    getZero(): Zero<S, MD> {
        if (!this.zero) {
            throw new Error('ZeroService must be provided with a Zero instance');
        }
        return this.zero;
    }
}

export function provideZero<S extends Schema, MD extends CustomMutatorDefs<S> | undefined = undefined>(
    zero: Zero<S, MD>
): Provider {
    return {
        provide: ZERO_TOKEN,
        useValue: zero,
    };
}
