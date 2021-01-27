import { IonAffixContainer } from '../ion-affix-container';
import { Observable, merge } from 'rxjs';

/**
 * Adapter for ion-content.
 *
 * @author Jonas Zuberbuehler <jonas.zuberbuehler@gmail.com>
 */
export class ContentAdapter implements IonAffixContainer {

    constructor(public content: HTMLElement) {
    }

    onScroll(): Observable<any> {
        // TODO: get HTMLElement scroll event
        return merge(this.content.ionScrollStart, this.content.ionScroll, this.content.ionScrollEnd);
    }

    getClientTop(): number {
        // Get client view port top
        return this.content.getBoundingClientRect().top;
    }

    getScrollTop(): number {
        // get element top
        return this.content.scrollTop;
    }

    appendFixedHeader(headerElement: any): void {
        this.content.appendChild(headerElement);
    }

    isScrollingDown(): boolean {
        // TODO: Understand what is happening here
        // TODO: Migrate to HTML Element
        return this.content.directionY === 'down';
    }
}
