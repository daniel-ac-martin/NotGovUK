import { existsSync } from 'fs';
import { resolve } from 'path';
import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';

const storybookDirectoryDefault = 'storybook-static';
const storybookDirectory = process.env.STORYBOOK_DIR || (existsSync(storybookDirectoryDefault) && storybookDirectoryDefault);
const storybookStaticUrl = storybookDirectory && 'file://' + resolve(storybookDirectory);
const storybookUrl = process.env.STORYBOOK_URL || storybookStaticUrl || 'http://localhost:9009';

initStoryshots({
  suite: 'Image storyshots',
  test: imageSnapshot({
    storybookUrl: storybookUrl,
    customizePage: page => page.setViewport({ width: 641, height: 320 })
  })
});
