import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './lib/index.scss';

import {
  BackLink,
  Breadcrumbs,
  Details,
  StartButton
} from './lib';

const page = (
    <>
        <a id="skip-link" href="#content">Skip to main content</a>
        <header id="top">
            <div class="inner">
                <a id="logo" href="/"></a>
                <div id="nav">
                    <a id="service-title" href="/">NOT GovUK</a>
                    <ul>
                        <li class="active"><a href="/one" title="One">One</a></li>
                        <li><a href="/two" title="Two">Two</a></li>
                        <li><a href="/three" title="Three">Three</a></li>
                        <li><a href="/four" title="Four">Four</a></li>
                    </ul>
                    </div>
                    <div id="sign-out">
                    <a href="/auth/logout">Sign&nbsp;out</a>
                </div>
            </div>
        </header>
        <div id="middle">
            <div class="inner">
                <div id="phase-banner"><strong>Beta</strong> This is a new service - your <a href="/feedback">feedback</a> will help us to improve it.</div>
                <BackLink id="back-link" href="#" />
                <Breadcrumbs id="breadcrumbs" items={[
                  { text: 'Section', href: '#' },
                  { text: 'Subsection', href: '#' },
                  { text: 'Subsection', href: '#' }
                ]} />
                <main id="content">
                    <h1>This is NOT GovUK!</h1>
                    <p class="lead">Whilst this site might <em>look</em> like GovUK it is in fact <strong>NOT</strong> GovUK.</p>
                    <StartButton href="#" />
                    <hr />
                    <h1><span class="caption">Caption</span> Typography</h1>
                    <h2><span class="caption">Typography</span> Sub-heading</h2>
                    <h3><span class="caption">Typography</span> Sub-sub-heading</h3>
                    <h4><span class="caption">Typography</span> Sub-sub-sub-heading</h4>
                    <p class="lead">This is a leading paragraph.</p>
                    <p>This is another paragraph</p>
                    <p class="small">This is a small paragraph</p>
                    <h2><span class="caption">Typography</span> Lists</h2>
                    <h3>Plain lists</h3>
                    <ul class="plain">
                        <li><a href="#">Benefits calculators</a></li>
                        <li><a href="#">Benefit overpayments</a></li>
                        <li><a href="#">Benefit fraud</a></li>
                        <li><a href="#">More</a></li>
                    </ul>
                    <h3>Bulletted lists</h3>
                    <p>You can buy:</p>
                    <ul>
                        <li>apples</li>
                        <li>oranges</li>
                        <li>pears</li>
                    </ul>
                    <h3>Ordered lists</h3>
                    <ol>
                        <li>Delivery address.</li>
                        <li>Payment.</li>
                        <li>Confirmation.</li>
                    </ol>
                    <hr />
                    <h1>Components</h1>
                    <form>
                        <h2>Back links</h2>
                        <BackLink href="#" />
                        <h2>Breadcrumbs</h2>
                        <Breadcrumbs items={[
                          { text: 'Section', href: '#' },
                          { text: 'Subsection', href: '#' },
                          { text: 'Subsection', href: '#' }
                        ]} />
                        <h2>Buttons</h2>
                        <input type="submit" value="Save and continue" />
                        <input type="button" value="Save as draft" />
                        <input type="button" class="warning" value="Delete" />
                        <input type="submit" disabled="disabled" value="Delete" />
                        <h2>Checkboxes</h2>
                        <div class="form-group">
                            <fieldset class="checkboxes">
                                <legend>Which types of waste do you transport?</legend>
                                <span class="hint">Select all that apply.</span>
                                <div class="item">
                                    <input id="waste-type-1" name="waste-type" type="checkbox" value="1" />
                                    <label for="waste-type-1">Waste from animal carcasses</label>
                                </div>
                                <div class="item">
                                    <input id="waste-type-2" name="waste-type" type="checkbox" value="2" />
                                    <label for="waste-type-2">Waste from mines or quarries</label>
                                </div>
                                <div class="item">
                                    <input id="waste-type-4" name="waste-type" type="checkbox" value="4" disabled="disabled" />
                                    <label for="waste-type-4">Farm or agricultural waste </label>
                                </div>
                            </fieldset>
                        </div>
                        <h3>Errors</h3>
                        <div class="form-group error">
                            <fieldset class="checkboxes">
                                <legend>What is your nationality?</legend>
                                <span class="hint">If you have dual nationality, select all options that are relevant to you.</span>
                                <span id="nationality-error-error" class="message"><span class="invisible">Error:</span> Select if you are British, Irish or a citizen of a different country</span>
                                <div class="item">
                                    <input id="nationality-error-1" name="nationality-error" type="checkbox" value="1" />
                                    <label for="nationality-error-1">British</label>
                                    <span class="hint">including English, Scottish, Welsh and Northern Irish </span>
                                </div>
                                <div class="item">
                                    <input id="nationality-error-2" name="nationality-error" type="checkbox" value="2" />
                                    <label for="nationality-error-2">Irish</label>
                                </div>
                                <div class="item">
                                    <input id="nationality-error-4" name="nationality-error" type="checkbox" value="4" />
                                    <label for="nationality-error-4">Citizen of another country</label>
                                </div>
                            </fieldset>
                        </div>
                        <h2>Date input</h2>
                        <div class="form-group">
                            <fieldset class="date-input" role="group" aria-describedby="passport-issued-hint">
                                <legend>When was your passport issued?</legend>
                                <span class="hint" id="passport-issued-hint">For example, 12 11 2007</span>
                                <div class="item">
                                    <label for="passport-issued-day">Day</label>
                                    <input id="passport-issued-day" name="passport-issued-day" type="number" pattern="[0-9]*" class="width-2" />
                                </div>
                                <div class="item">
                                    <label for="passport-issued-month">Month</label>
                                    <input id="passport-issued-month" name="passport-issued-month" type="number" pattern="[0-9]*" class="width-2" />
                                </div>
                                <div class="item">
                                    <label for="passport-issued-year">Year</label>
                                    <input id="passport-issued-year" name="passport-issued-year" type="number" pattern="[0-9]*" class="width-4" />
                                </div>
                            </fieldset>
                        </div>
                        <h3>Errors</h3>
                        <div class="form-group error">
                            <fieldset class="date-input" role="group" aria-describedby="passport-issued-error-hint">
                                <legend>When was your passport issued?</legend>
                                <span class="hint" id="passport-issued-error-hint">For example, 12 11 2007</span>
                                <span id="passport-issued-error-error" class="message"><span class="invisible">Error:</span> The date your passport was issued must be in the past</span>
                                <div class="item">
                                    <label for="passport-issued-error-day">Day</label>
                                    <input id="passport-issued-error-day" name="passport-issued-error-day" type="number" pattern="[0-9]*" class="width-2" />
                                </div>
                                <div class="item">
                                    <label for="passport-issued-error-month">Month</label>
                                    <input id="passport-issued-error-month" name="passport-issued-error-month" type="number" pattern="[0-9]*" class="width-2" />
                                </div>
                                <div class="item">
                                    <label for="passport-issued-error-year">Year</label>
                                    <input id="passport-issued-error-year" name="passport-issued-error-year" type="number" pattern="[0-9]*" class="width-4" />
                                </div>
                            </fieldset>
                        </div>
                        <h2>Details</h2>
                        <Details summary="Help with nationality">
                          We need to know your nationality so we can work out which elections you’re entitled to vote in. If you cannot provide your nationality, you’ll have to send copies of identity documents through the post.
                        </Details>
                        <h2>Phase banner</h2>
                        <div class="phase-banner"><strong>Beta</strong> This is a new service - your <a href="/feedback">feedback</a> will help us to improve it.</div>
                        <h2>Radios</h2>
                        <div class="form-group">
                            <fieldset class="radios">
                                <legend>Have you changed your name?</legend>
                                <span class="hint">This includes changing your last name or spelling your name differently.</span>
                                <div class="item">
                                    <input id="changed-name-1" name="changed-name" type="radio" value="1" />
                                    <label for="changed-name-1">Yes</label>
                                </div>
                                <div class="item">
                                    <input id="changed-name-0" name="changed-name" type="radio" value="0" />
                                    <label for="changed-name-0">No</label>
                                </div>
                                <div class="item">
                                    <input id="changed-name-2" name="changed-name" type="radio" value="2" disabled="disabled" />
                                    <label for="changed-name-2">Maybe</label>
                                </div>
                            </fieldset>
                        </div>
                        <h3>Errors</h3>
                        <div class="form-group error">
                            <fieldset class="radios">
                                <legend>Have you changed your name?</legend>
                                <span class="hint">This includes changing your last name or spelling your name differently.</span>
                                <span id="changed-name-error-error" class="message"><span class="invisible">Error:</span> Select yes if you have changed your name</span>
                                <div class="item">
                                    <input id="changed-name-error-1" name="changed-name-error" type="radio" value="1" />
                                    <label for="changed-name-error-1">Yes</label>
                                </div>
                                <div class="item">
                                    <input id="changed-name-error-0" name="changed-name-error" type="radio" value="0" />
                                    <label for="changed-name-error-0">No</label>
                                </div>
                                <div class="item">
                                    <input id="changed-name-error-2" name="changed-name-error" type="radio" value="2" disabled="disabled" />
                                    <label for="changed-name-error-2">Maybe</label>
                                </div>
                            </fieldset>
                        </div>
                        <h2>Text input</h2>
                        <div class="form-group">
                            <label for="event-name">Event name</label>
                            <span id="event-name-hint" class="hint">The name you’ll use on promotional material.</span>
                            <input id="event-name" name="event-name" type="text" aria-describedby="event-name-hint" />
                        </div>
                        <h3>Errors</h3>
                        <div class="form-group error">
                            <label for="event-name-error">Event name</label>
                            <span id="event-name-error-hint" class="hint">The name you’ll use on promotional material.</span>
                            <span id="event-name-error-error" class="message"><span class="invisible">Error:</span> Enter an event name</span>
                            <input id="event-name-error" name="event-name-error" type="text" aria-describedby="event-name-error-hint" />
                        </div>
                        <h3>Fixed width</h3>
                        <div class="form-group">
                            <label for="width-20">20 character width</label>
                            <input class="width-20" id="width-20" name="width-20" type="text"/ >
                        </div>
                        <div class="form-group">
                            <label for="width-10">10 character width</label>
                            <input class="width-10" id="width-10" name="width-10" type="text"/ >
                        </div>
                        <div class="form-group">
                            <label for="width-5">5 character width</label>
                            <input class="width-5" id="width-5" name="width-5" type="text"/ >
                        </div>
                        <div class="form-group">
                            <label for="width-4">4 character width</label>
                            <input class="width-4" id="width-4" name="width-4" type="text"/ >
                        </div>
                        <div class="form-group">
                            <label for="width-3">3 character width</label>
                            <input class="width-3" id="width-3" name="width-3" type="text"/ >
                        </div>
                        <div class="form-group">
                            <label for="width-2">2 character width</label>
                            <input class="width-2" id="width-2" name="width-2" type="text"/ >
                        </div>
                        <h3>Fluid width</h3>
                        <div class="form-group">
                            <label for="full">Full width</label>
                            <input class="width-full" id="full" name="full" type="text"/ >
                        </div>
                        <div class="form-group">
                            <label for="three-quarters">Three-quarters width</label>
                            <input class="width-three-quarters" id="three-quarters" name="three-quarters" type="text"/ >
                        </div>
                        <div class="form-group">
                            <label for="two-thirds">Two-thirds width</label>
                            <input class="width-two-thirds" id="two-thirds" name="two-thirds" type="text"/ >
                        </div>
                        <div class="form-group">
                            <label for="one-half">One-half width</label>
                            <input class="width-one-half" id="one-half" name="one-half" type="text"/ >
                        </div>
                        <div class="form-group">
                            <label for="one-third">One-third width</label>
                            <input class="width-one-third" id="one-third" name="one-third" type="text"/ >
                        </div>
                        <div class="form-group">
                            <label for="one-quarter">One-quarter width</label>
                            <input class="width-one-quarter" id="one-quarter" name="one-quarter" type="text"/ >
                        </div>
                    </form>
                </main>
                <aside>
                    <h2>Sub-section</h2>
                    <p>This is the side bar.</p>
                </aside>
            </div>
        </div>
        <footer id="bottom">
            <div class="inner">
                <div id="open-government-license">All content is available under the Open Government Licence v3.0, except where otherwise stated</div>
                <a id="crown-copyright">&copy; Crown copyright</a>
            </div>
        </footer>
    </>
);

ReactDOM.render(page, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
