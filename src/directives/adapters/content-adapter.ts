import { IonAffixContainer } from '../ion-affix-container';
import { fromEvent, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Adapter for ion-content.
 *
 * @author Jonas Zuberbuehler <jonas.zuberbuehler@gmail.com>
 */
export class ContentAdapter implements IonAffixContainer {

    private lastScrollTop = 0;
    private directionY = "";

    constructor(public content: HTMLElement) {
        // https://stackoverflow.com/a/31223774 for help
        content.addEventListener("scroll", () => {
            const st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
            if (st > this.lastScrollTop) {
                // downscroll code
                this.directionY = "down";
            } else {
                // upscroll code
                this.directionY = "up";
            }
            this.lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
        }, false);
    }

    onScroll(): Observable<any> {
        // a bit dumber but gives same goal
        const source = fromEvent(this.content, 'scroll');
        return source.pipe(map(e => "Scrolled!"));
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
        // achieved with the event listener in the constructor
        return this.directionY === 'down';
    }
}
