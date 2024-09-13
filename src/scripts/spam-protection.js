class ProtectedElement {
    static protectAll() {
        const protectedElements = document.querySelectorAll('[data-anti-spam]');
        protectedElements.forEach((element) => {
            const protectedElement = new ProtectedElement(element);
            protectedElement.activateProtection();
            element.removeAttribute('data-anti-spam');
        });
    }

    constructor(element) {
        this.element = element;
        this.rendered = false;
        this.transition = {
            durationMs: 250,
            property: 'opacity',
            values: [0, 1]
        };
    }

    async waitForTransition() {
        return new Promise((resolve) => {
            this.element.addEventListener('transitionend', resolve, { once: true });
        });
    }

    setUpTransition() {
        this.element.style.transitionProperty = this.transition.property;
        this.element.style.transitionDuration = this.transition.durationMs + 'ms';
    }

    async fadeOut() {
        const promise = this.waitForTransition();
        this.element.style[this.transition.property] = this.transition.values[0];
        return promise;
    }

    async fadeIn() {
        const promise = this.waitForTransition();
        this.element.style[this.transition.property] = this.transition.values[1];
        return promise;
    }

    swapContent() {
        this.element.innerHTML = this.element.dataset.content;
    }

    swapAttributes() {
        if (Object.hasOwn(this.element.dataset, 'href')) {
            this.element.setAttribute('href', this.element.dataset['href']);
        }
    }

    async render() {
        if (!this.rendered) {
            await this.fadeOut();
            this.swapContent();
            this.swapAttributes();
            await this.fadeIn();
            this.rendered = true;
        }
    }

    registerEventListeners() {
        const callback = () => this.render();
        const options = { once: true };

        document.body.addEventListener('mousemove', callback, options);
        document.body.addEventListener('click', callback, options);
        document.addEventListener('scroll', callback, options);
        window.addEventListener('keydown', callback, options);
    }

    activateProtection() {
        this.setUpTransition();
        this.registerEventListeners();
    }
}

document.addEventListener('DOMContentLoaded', ProtectedElement.protectAll);