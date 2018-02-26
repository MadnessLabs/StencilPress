import { flush, render } from '@stencil/core/testing';
import { SpStorybook } from './sp-storybook';

describe('sp-storybook', () => {
  it('should build', () => {
    expect(new SpStorybook()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [SpStorybook],
        html: '<sp-storybook></sp-storybook>'
      });
    });

    it('should work without parameters', () => {
      expect(element.textContent).toEqual('Your new sp-storybook component');
    });
  });
});