import { Component, Prop, State } from '@stencil/core';


@Component({
  tag: 'ft-icon',
  styleUrl: 'ft-icon.scss',
  assetsDir: 'svg/ft'
})
export class FtIcon {
  /**
   * Specifies the label to use for accessibility. Defaults to the icon name.
   */
  @Prop() ariaLabel = '';

  /**
   * Specifies which icon to use. The appropriate icon will be used based on the mode.
   * For more information, see [Ionicons](/docs/ionicons/).
   */
  @Prop() name: string = '';

  @Prop({ context: 'publicPath' }) private publicPath: string;

  @Prop({ context: 'isServer' }) private isServer: boolean;

  @Prop() size: string;

  @State() private svgContent: string = null;
  @State() wrapperStyles: any;

  componentWillLoad() {
    if (this.size) {
      this.wrapperStyles = {
        height: this.size,
        width: this.size
      };
    }
  }

  private get iconName() {
    let iconName = 'ft-' + this.name.toLowerCase();

    // only allow alpha characters and dash
    const invalidChars = iconName.replace(/[a-z]|-|\d/g, '');
    if (invalidChars !== '') {
      console.error(`invalid characters in ion-icon name: ${invalidChars}`);
      return null;
    }

    return iconName;
  }


  hostData() {
    const attrs: { [attrName: string]: string } = {
      'role': 'img'
    };

    if (this.ariaLabel) {
      // user provided label
      attrs['aria-label'] = this.ariaLabel;

    } else {
      // come up with the label based on the icon name
      const iconName = this.iconName;
      if (iconName) {
        attrs['aria-label'] = iconName
          .replace('ft-', '')
          .replace('-outline', '')
          .replace(/\-/g, ' ');
      }
    }

    return attrs;
  }


  render() {
    if (this.isServer) {
      return <div class="icon-inner">{/* ssr */}</div>;
    }

    const iconName = this.iconName;
    if (!iconName) {
      // we don't have good data
      return <div class="icon-inner" style={this.wrapperStyles}>{/* invalid svg */}</div>;
    }

    const svgContent = svgContents[iconName];
    if (svgContent === this.svgContent) {
      // we've already loaded up this svg at one point
      // and the svg content we've loaded and assigned checks out
      // render this svg!!
      return <div class="icon-inner" style={this.wrapperStyles} innerHTML={svgContent}></div>;
    }

    // haven't loaded this svg yet
    // start the request
    loadSvgContent(iconName, this.publicPath, loadedSvgContent => {
      // we're finished loading the svg content!
      // set to this.svgContent so we do another render
      console.log(iconName);
      this.svgContent = loadedSvgContent;
    });

    // actively requesting the svg, so let's just render a div for now
    return <div class="icon-inner" style={this.wrapperStyles}>{/* loading svg */}</div>;
  }

}


function loadSvgContent(iconName: string, publicPath: string, callback: { (loadedSvgContent: string): void }) {
  // static since all IonIcons use this same function and pointing at global/shared data
  // passed in callback will have instance info
  // add to the list of callbacks to fiure when this url is finished loading
  (loadCallbacks[iconName] = loadCallbacks[iconName] || []).push(callback);

  if (activeRequests[iconName]) {
    // already requesting this icon, don't bother kicking off another
    return;
  }

  // add this icons to our list of active requests
  activeRequests[iconName] = true;


  // kick off the request for the external svg file
  // create a script element to add to the document.head
  var scriptElm = document.createElement('script');
  scriptElm.charset = 'utf-8';
  scriptElm.async = true;
  scriptElm.src = `${publicPath}svg/ft/${iconName}.js`;

  // create a fallback timeout if something goes wrong
  var tmrId = setTimeout(onScriptComplete, 120000);

  function onScriptComplete() {
    clearTimeout(tmrId);
    scriptElm.onerror = scriptElm.onload = null;
    scriptElm.parentNode.removeChild(scriptElm);

    // remove from our list of active requests
    delete activeRequests[iconName];
  }

  // add script completed listener to this script element
  scriptElm.onerror = scriptElm.onload = onScriptComplete;

  // inject a script tag in the head
  // kick off the actual request
  document.head.appendChild(scriptElm);
}


const activeRequests: { [iconName: string]: boolean } = {};
const loadCallbacks: { [iconName: string]: { (loadedSvgContent: string): void }[] } = [] as any;
const svgContents: { [iconName: string]: string } = {};

// add a jsonp handler to the window
// as svg jsonp files are requested
// once they load they'll call this method
(window as any).loadIonicon = function loadIonicon(svgContent: string, iconName: string) {
  // awesome, we've finished loading the svg file
  // remove this url from the active requests
  delete activeRequests[iconName];

  svgContents[iconName] = svgContent

  // find any callbacks waiting on this icon
  const svgLoadCallbacks = loadCallbacks[iconName];
  if (svgLoadCallbacks) {
    // loop through all the callbacks that are waiting on the svg content
    svgLoadCallbacks.forEach(cb => {
      // fire off this callback which was provided by an instance
      cb(svgContent);
    });
    delete loadCallbacks[iconName];
  }

};