import { Component, Prop } from '@stencil/core';


@Component({
  tag: 'sp-navigation',
  styleUrl: 'sp-navigation.scss'
})
export class SpNavigation {

  @Prop() brandLink: string;
  @Prop() brandImage: string;
  @Prop() brandName: string;
  @Prop() items: any[];
  @Prop() title: string;

  toggleMenu(event) {
    event.preventDefault();
    var ionMenu: HTMLIonMenuElement = document.querySelector('ion-menu');
    ionMenu.toggle();
  }

  render() {
    return (
      <header>
        <a class="brand" href={this.brandLink ? this.brandLink : '/'} onClick={(event: UIEvent) => this.toggleMenu(event)}>
          <ion-icon name="md-menu"></ion-icon>
          <img src={this.brandImage ? this.brandImage : '/assets/images/logo.jpg'} alt={this.brandName} />
        </a>
        <h2 class="page-title">
          {this.title ? this.title : <slot />}
        </h2>
        <a class="call-button" href="tel:3147290233">
          <ion-button>
            <ion-icon name="ios-call"></ion-icon>
            314.729.0233
          </ion-button>
        </a>
      </header>
    );
  }
}