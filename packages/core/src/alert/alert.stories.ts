/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import '@clr/core/alert';
import '@clr/core/button';
import '@clr/core/internal-components';
import { angleIcon, ClarityIcons, timesCircleIcon, userIcon } from '@clr/core/icon-shapes';
import { cssGroup, propertiesGroup, setStyles } from '@clr/core/internal';
import { action } from '@storybook/addon-actions';
import { color as colorKnob, select, text } from '@storybook/addon-knobs';
import { html } from 'lit-html';

ClarityIcons.addIcons(angleIcon, userIcon, timesCircleIcon);

export default {
  title: 'Experimental/Alert/Stories',
  component: 'cds-alert',
  parameters: {
    options: { showPanel: true },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v2mkhzKQdhECXOx8BElgdA/Clarity-UI-Library---light-2.2.0?node-id=51%3A666',
    },
  },
};

export const API = () => {
  const slot = text('slot', 'This is an alert.', propertiesGroup);
  const alertStatus = select(
    'status',
    {
      'none (default info)': undefined,
      info: 'info',
      success: 'success',
      warning: 'warning',
      danger: 'danger',
      loading: 'loading',
      unknown: 'unknown',
    },
    undefined,
    propertiesGroup
  );
  const iconShape = text('iconShape', undefined, propertiesGroup);
  const iconTitle = text('iconTitle', undefined, propertiesGroup);
  const size = select('size', { '(default)': 'default', sm: 'sm' }, undefined, propertiesGroup);

  const alertColor = colorKnob('--color', undefined, cssGroup);
  const iconColor = colorKnob('--icon-color', undefined, cssGroup);
  const fontSize = text('--font-size', undefined, cssGroup);
  const fontWeight = text('--font-weight', undefined, cssGroup);
  const letterSpacing = text('--letter-spacing', undefined, cssGroup);

  return html`
    <style>
      cds-alert {
        ${setStyles({
        '--color': alertColor,
        '--icon-color': iconColor,
        '--font-size': fontSize,
        '--font-weight': fontWeight,
        '--letter-spacing': letterSpacing,
      })}
    </style>
    <cds-alert .iconShape=${iconShape} .iconTitle=${iconTitle} .size=${size} .status=${alertStatus}>
      ${slot}<cds-inline-button @click=${action('alertActionClicked')}>Dismiss</cds-inline-button>
    </cds-alert>
  `;
};

export const actions = () => {
  return html`
    <div cds-layout="vertical gap:sm">
      <div cds-layout="p:sm" style="background: #333">
        <cds-alert-actions type="banner">
          <cds-button>Button 1</cds-button>
          <cds-button>Button 2</cds-button>
        </cds-alert-actions>
      </div>
      <div cds-layout="p:sm" style="background: #eee">
        <cds-alert-actions type="default">
          <cds-button>Button 1</cds-button><cds-button>Button 2</cds-button>
        </cds-alert-actions>
      </div>
      <div cds-layout="p:sm">
        <cds-alert-actions>
          <cds-button>Button 1</cds-button>
          <cds-button>Button 2</cds-button>
        </cds-alert-actions>
      </div>
    </div>
  `;
};

export const closeButton = () => {
  return html`
    <div cds-layout="vertical gap:sm">
      <div>
        <cds-internal-close-button></cds-internal-close-button> :: plain, check for aria warning (problem: it's throwing
        a warning for every one and not just this one)
      </div>
      <div><cds-internal-close-button aria-label="ohai"></cds-internal-close-button> :: aria-labeled</div>
      <div>
        <cds-internal-close-button icon-size="48" aria-label="ohai"></cds-internal-close-button> :: numeric size
      </div>
      <div>
        <cds-internal-close-button icon-size="lg" aria-label="ohai"></cds-internal-close-button> :: t-shirt size
      </div>
      <div>
        <cds-internal-close-button
          icon-size="sm"
          aria-label="ohai"
          icon-shape="times-circle"
        ></cds-internal-close-button>
        :: custom icon shape...
      </div>
    </div>
  `;
};

export const lightAlerts = () => {
  return html`
    <div cds-layout="vertical gap:xxs">
      <cds-alert>
        <em>Single line alert:</em> This alert example has only a single line of text.<cds-inline-button
          >Use Inline Buttons in Lightweight Alerts</cds-inline-button
        >
      </cds-alert>
      <cds-alert>
        This alert example has many lines of text. A block of lorem ipsum sample text follows: A very small stage in a
        vast cosmic arena descended from astronomers tesseract billions upon billions science Flatland. Invent the
        universe the carbon in our apple pies the only home we've ever known with pretty stories for which there's
        little good evidence citizens of distant epochs rich in heavy atoms. The carbon in our apple pies muse about
        from which we spring star stuff harvesting star light courage of our questions paroxysm of global death and
        billions upon billions upon billions upon billions upon billions upon billions upon billions.<cds-alert-actions>
          <cds-button>Buttons inside alert actions should not be visible inside Lightweight Alerts</cds-button>
        </cds-alert-actions>
      </cds-alert>
    </div>
  `;
};

export const status = () => {
  return html`
    <div cds-layout="vertical gap:xxs">
      <cds-alert status="info">This is an alert with a status of "info"</cds-alert>
      <cds-alert status="success">This is an alert with a status of "success"</cds-alert>
      <cds-alert status="warning">This is an alert with a status of "warning"</cds-alert>
      <cds-alert status="danger">This is an alert with a status of "danger"</cds-alert>
      <cds-alert status="loading">This is an alert with a status of "loading"</cds-alert>
      <cds-alert status="unknown">This is an alert with a status of "unknown"</cds-alert>
      <cds-alert status="danger"
        ><cds-icon shape="times-circle" solid></cds-icon>This is an alert with a status of "danger" and a custom
        icon</cds-alert
      >
      <cds-alert
        ><cds-icon shape="user" solid badge></cds-icon>This is an alert with a badged, solid custom icon</cds-alert
      >
    </div>
  `;
};

export const compact = () => {
  return html`
    <div cds-layout="vertical gap:none">
      <cds-alert size="sm">
        This compact alert example has only a single line of text.<cds-inline-button
          >Use Inline Buttons in Lightweight Alerts<cds-icon direction="right" shape="angle"></cds-icon
        ></cds-inline-button>
      </cds-alert>
      <cds-alert size="sm" status="info">
        This compact alert example has a status of "info" many lines of text. A block of lorem ipsum sample text
        follows: A very small stage in a vast cosmic arena descended from astronomers tesseract billions upon billions
        science Flatland. Invent the universe the carbon in our apple pies the only home we've ever known with pretty
        stories for which there's little good evidence citizens of distant epochs rich in heavy atoms. The carbon in our
        apple pies muse about from which we spring star stuff harvesting star light courage of our questions paroxysm of
        global death and billions upon billions upon billions upon billions upon billions upon billions upon
        billions.<cds-inline-button>Click One</cds-inline-button> <cds-inline-button>Click Two</cds-inline-button
        ><cds-alert-actions>
          <cds-button>Buttons inside alert actions should not be visible inside Lightweight Alerts</cds-button>
        </cds-alert-actions>
      </cds-alert>
      <cds-alert size="sm" status="success">This is a compact alert with a status of "success"</cds-alert>
      <cds-alert size="sm" status="warning">This is a compact alert with a status of "warning"</cds-alert>
      <cds-alert size="sm" status="danger">This is a compact alert with a status of "danger"</cds-alert>
      <cds-alert size="sm" status="loading">This is a compact alert with a status of "loading"</cds-alert>
    </div>
  `;
};

export const customStyles = () => {
  return html`
    <style>
      .alert-branding {
        --color: green;
        --icon-color: #781da0;
        --icon-size: 1.8rem;
        --font-size: 1em;
        --font-weight: bold;
      }
    </style>
    <cds-alert class="alert-branding"
      ><cds-icon shape="user" solid></cds-icon>A custom alert.
      <cds-inline-button>Example Action</cds-inline-button></cds-alert
    >
  `;
};
