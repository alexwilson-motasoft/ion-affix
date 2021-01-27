import { ContentAdapter } from './content-adapter';
import { ScrollAdapter } from './scroll-adapter';

export function adapterFactory (container) {
    if (container instanceof HTMLElement) {
        return new ContentAdapter(container);
    }
    throw 'Invalid container element (expected HTMLElement)';
}
