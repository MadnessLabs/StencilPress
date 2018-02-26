@extends('layouts.app')

@section('content')
  <div slot="banner">
  </div>
  <div slot="card">
    @while(have_posts()) @php(the_post())
      @include('partials.content-single-'.get_post_type())
    @endwhile
  </div>
@endsection
