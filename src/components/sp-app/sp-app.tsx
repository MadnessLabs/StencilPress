import '@ionic/core';
import { Component, Prop, Listen, Element, State } from '@stencil/core';
import { ToastController } from '@ionic/core';


@Component({
  tag: 'sp-app',
  styleUrl: 'sp-app.scss'
})
export class SpApp {
  @Element() appEl: HTMLElement;

  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: ToastController;
  @Prop() menu: any;
  @Prop() brandName: string;
  @Prop() brandLink: string;
  @Prop() brandImage: string;
  @Prop() title: string;

  @State() menuItems: any[];
  @State() subItemsShowing: any = {};
  @State() hasBanner: boolean = false;

  ionMenu: HTMLIonMenuElement;

  componentWillLoad() {
    var slotEl = this.appEl.querySelector('[slot]');
    if (slotEl) {
      this.hasBanner = true;
    }
  }

  componentDidLoad() {
    this.menuItems = this.menu && typeof this.menu === 'string' ? JSON.parse(this.menu) : this.menu;
    console.log(this.menuItems);
    /*
      Handle service worker updates correctly.
      This code will show a toast letting the
      user of the PWA know that there is a 
      new version available. When they click the
      reload button it then reloads the page 
      so that the new service worker can take over
      and serve the fresh content
    */
    window.addEventListener('swUpdate', () => {
      this.toastCtrl.create({
        message: 'New version available',
        showCloseButton: true,
        closeButtonText: 'Reload'
      }).then((toast) => {
        toast.present();
      });
    });
  }

  @Listen('body:ionToastWillDismiss')
  reload() {
    window.location.reload();
  }

  navigateTo(url) {
    window.location.href = url;
  }

  render() {
    return (
      <ion-app>
        <sp-navigation items={this.menuItems} brand-name={this.brandName} title={this.title} />
        <ion-split-pane when="lg">
          {/*<ion-menu content="page-content">*/}
          <ion-menu>
            <ion-content>
              <ion-list>
                {this.menuItems ? this.menuItems.map((item) =>
                  <ion-item class={parseInt(item.menu_item_parent) > 0 ? "sub-item" : window.location.href === item.url ? "active" : null} href={item.url} onClick={this.navigateTo.bind(this, item.url, parseInt(item.menu_item_parent))}>
                    {item.title}
                    <ion-icon name="ios-arrow-forward" />
                  </ion-item>
                ) : null}
              </ion-list>
              <ft-social-icons></ft-social-icons>
              <ion-grid id="partners">
                <ion-row>
                  <ion-col col-6>
                    <lazy-img src="/assets/images/code_blue.jpg" alt="Code Blue Elite Member" />
                  </ion-col>
                  <ion-col col-6>
                    <lazy-img src="/assets/images/iicrc.png" alt="IICRC: Carpet Cleaning Repair Installation Certified" />
                  </ion-col>
                </ion-row>
              </ion-grid>
              <a class="made-by" href="https://madnesslabs.net" target="_system">
                Built with <span>♥</span> by Madness Labs
              </a>
            </ion-content>
          </ion-menu>
          <div role="main" main={true} id="page-content">
            <ion-page>
              <ion-content>
                <ion-card id="content-card">
                  <ion-grid>
                    <ion-row>
                      <ion-col col-12 col-md-9 col-xl-8>
                        {this.hasBanner ? <slot /> : <slot />}
                      </ion-col>
                      <ion-col col-12 col-md-3 col-xl-4>
                        <slot name="sidebar" />
                      </ion-col>
                    </ion-row>
                  </ion-grid>
                </ion-card>
                <footer>
                  <slot name="footer" />
                </footer>
              </ion-content>
            </ion-page>
          </div>
        </ion-split-pane>
      </ion-app>
    );
  }
}
