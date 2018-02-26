import { Component } from '@stencil/core';


@Component({
  tag: 'sp-storybook',
  styleUrl: 'sp-storybook.scss'
})
export class SpStorybook {

  render() {
    return (
      <div>
        Hello from StencilPress! Put your components in sp-storybook.tsx file to show them inside your theme!
      </div>
    );
  }
}