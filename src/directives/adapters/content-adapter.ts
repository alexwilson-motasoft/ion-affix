import { IonAffixContainer } from '../ion-affix-container';
import { Observable, of } from 'rxjs';

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
            var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
            if (st > this.lastScrollTop){
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
        // TODO: get HTMLElement scroll event
        // rather than all three
        // a bit dumber but gives same goal
        return of(this.content.onscroll);
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
        // find a way of finding if we are scrolling down???
        return this.directionY === 'down';
    }
}
