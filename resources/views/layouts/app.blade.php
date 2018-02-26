<!doctype html>
<html @php(language_attributes())>
  @include('partials.head')
  <body @php(body_class())>
    @php
      $menuLocations = get_nav_menu_locations();                                 
      $menuID = $menuLocations['primary_navigation'];
      $primaryNav = wp_get_nav_menu_items($menuID);
    @endphp
    @php(do_action('get_header'))
    <ft-app menu='{{json_encode($primaryNav)}}' brand-name="{{ get_bloginfo('name', 'display') }}" title="{{App::title()}}">
      @yield('content')
      @if (App\display_sidebar())
        <div slot="sidebar">
          <aside class="sidebar">
            @include('partials.sidebar')
          </aside>
        </div>
      @endif
      </div>
      <div slot="footer">
        @include('partials.footer')
      </div>
    </ft-app> 
  </body>
</html>
