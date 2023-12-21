'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">planning-poker-pp documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-887dd1943f6bc4b4813dd9ce42195d824676c218bec4b968c7b3c9753425ac5918a16aa8f40434f39b79fb46aba09c4dbb2d32a33192f3130bd0e3b602ae27ef"' : 'data-bs-target="#xs-components-links-module-AppModule-887dd1943f6bc4b4813dd9ce42195d824676c218bec4b968c7b3c9753425ac5918a16aa8f40434f39b79fb46aba09c4dbb2d32a33192f3130bd0e3b602ae27ef"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-887dd1943f6bc4b4813dd9ce42195d824676c218bec4b968c7b3c9753425ac5918a16aa8f40434f39b79fb46aba09c4dbb2d32a33192f3130bd0e3b602ae27ef"' :
                                            'id="xs-components-links-module-AppModule-887dd1943f6bc4b4813dd9ce42195d824676c218bec4b968c7b3c9753425ac5918a16aa8f40434f39b79fb46aba09c4dbb2d32a33192f3130bd0e3b602ae27ef"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GameComponentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GameComponentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InformationButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InformationButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PlayerCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlayerCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SettingsComponentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SettingsComponentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StartButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StartButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TitleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TitleComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AverageDecorator.html" data-type="entity-link" >AverageDecorator</a>
                            </li>
                            <li class="link">
                                <a href="classes/GameConcret.html" data-type="entity-link" >GameConcret</a>
                            </li>
                            <li class="link">
                                <a href="classes/HtmlBalise.html" data-type="entity-link" >HtmlBalise</a>
                            </li>
                            <li class="link">
                                <a href="classes/HtmlDisplay.html" data-type="entity-link" >HtmlDisplay</a>
                            </li>
                            <li class="link">
                                <a href="classes/MajabsDecorator.html" data-type="entity-link" >MajabsDecorator</a>
                            </li>
                            <li class="link">
                                <a href="classes/ModeDecorator.html" data-type="entity-link" >ModeDecorator</a>
                            </li>
                            <li class="link">
                                <a href="classes/StrictDecorator.html" data-type="entity-link" >StrictDecorator</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/GameOptionServiceService.html" data-type="entity-link" >GameOptionServiceService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Game.html" data-type="entity-link" >Game</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});