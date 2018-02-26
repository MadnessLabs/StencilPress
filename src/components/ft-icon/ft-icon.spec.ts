import { flush, render } from '@stencil/core/testing';
import { FtIcon } from './ft-icon';

describe('ft-icon', () => {
  it('should build', () => {
    expect(new FtIcon()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [FtIcon],
        html: '<ft-icon></ft-icon>'
      });
    });

    it('should work without parameters', () => {
      expect(element.textContent).toEqual('Your new ft-icon component');
    });
  });
});