class ProtectedElement {
    static protectAll() {
        const protectedElements = document.querySelectorAll('[data-content-src]');
        protectedElements.forEach((element) => {
            const protectedElement = new ProtectedElement(element);
            protectedElement.activateProtection();
        });
    }

    constructor(element) {
        this.original = element;
        this.substitute = this.findSubstitute();
        this.rendered = false;
        this.transition = {
            durationMs: 250,
            property: 'opacity',
        };

        this.setUpTransitions();
    }

    findSubstitute() {
        const selector = this.original.dataset.contentSrc;
        const template = document.querySelector(selector);
        const clone = template.content.cloneNode(true);
        return clone.firstElementChild;
    }

    setUpTransition(target, initialValue) {
        target.style[this.transition.property] = initialValue;
        target.style.transitionProperty = this.transition.property;
        target.style.transitionDuration = this.transition.durationMs + 'ms';
        console.log(target);
    }

    setUpTransitions() {
        this.setUpTransition(this.original, 1);
        this.setUpTransition(this.substitute, 0);
    }

    async waitForTransition(target) {
        return new Promise((resolve) => {
            target.addEventListener('transitionend', resolve, { once: true });
        });
    }

    async fade(target, inOut) {
        const promise = this.waitForTransition(target);
        target.style[this.transition.property] = +inOut;
        return promise;
    }

    async fadeOut() {
        return this.fade(this.original, false);
    }

    async fadeIn() {
        return this.fade(this.substitute, true);
    }

    swap() {
        const parent = this.original.parentElement;
        parent.insertBefore(this.substitute, this.original);
        parent.removeChild(this.original);
    }

    async render() {
        if (!this.rendered) {
            await this.fadeOut();
            this.swap();
            await this.fadeIn();
            this.rendered = true;
        }
    }

    activateProtection() {
        const callback = () => this.render();
        const options = { once: true };

        document.body.addEventListener('mousemove', callback, options);
        document.body.addEventListener('click', callback, options);
        document.addEventListener('scroll', callback, options);
        window.addEventListener('keydown', callback, options);
    }
}

document.addEventListener('DOMContentLoaded', ProtectedElement.protectAll);