<template>
<div>
  <div class="filter-active-bar">
    <p><span>Work</span><i class="fa fa-circle" style="color: green;"></i></p>
  </div>
  <!-- Navigation bar
   ============================================================ -->
   <div class="navbar navbar-inverse navigation-bar" role="navigation">

     <div class="container">
       <div class="navbar-header text-center">
         <span class="visible-xs">
          <a href="#/feed">
            <div class="col-xs-3 mobile-icon">
              <i class="fa fa-commenting-o fa-2x"></i>
            </div>
          </a>

          <a href="#/profile">
            <div class="col-xs-3 mobile-icon">
              <i class="fa fa-user fa-2x"></i>
            </div>
          </a>

          <a href="#/settings">
            <div class="col-xs-3 mobile-icon mobile-active">
              <i class="fa fa-cog fa-2x"></i>
            </div>
          </a>

          <a href="#">
            <div class="col-xs-3 mobile-icon">
              <i class="fa fa-times-circle-o fa-2x"></i>
            </div>
          </a>
         </span>

         <!-- <a href="" class="navbar-brand"><img src=""></a> -->
       </div>
       <div class="navbar-collapse collapse">
         <ul class="nav navbar-nav navbar-right">
           <li class="active"><a href="blog.html">Sign out</a></li>
         </ul>
       </div>
     </div>

   </div>

  <h3 class="text-center">@Username</h3>

    <p class="btn create-filter-btn text-center" data-toggle="modal" data-target="#newFilterModal">New Filter </p>



   <div class="container">
     <div class="row">
       <div class="col-xs-6 text-left">
         <p>Filters</p>
       </div>

       <!-- När man klickar på edit ska .panel-footer bli display: block
        ============================================================ -->
       <div class="col-xs-6 text-right">Edit</div>
     </div>

    <ul class="list-group">
      <li class="list-group-item">
        <div style="padding: 0" class="col-xs-8 text-left">
          <span class="filter-title">Work</span>
        </div>
        <div style="padding: 0" class="col-xs-4 text-right">
          <span class="label label-success">Activated</span>
        </div>
        <div class="filter-body-tags">
          <span class="filter-tags">Work</span>, <span class="filter-tags">Friends</span>, <span class="filter-tags">Friends</span>
        </div>
        <div class="panel-footer clearfix">
          <div class="col-xs-6 text-center edit-filter" data-toggle="modal" data-target="#newFilterModal">Edit filter</div>
          <div class="col-xs-6 text-center delete-filter">Delete filter</div>
        </div>
      </li>

      <li class="list-group-item">
        <div style="padding: 0" class="col-xs-8 text-left">
          <span class="filter-title">Work</span>
        </div>
        <div style="padding: 0" class="col-xs-4 text-right">
          <span class="label label-default">Activated</span>
        </div>
        <div class="filter-body-tags">
          <span class="filter-tags">Work</span>, <span class="filter-tags">Friends</span>, <span class="filter-tags">Friends</span>
        </div>
        <div class="panel-footer clearfix">
          <div class="col-xs-6 text-center edit-filter" data-toggle="modal" data-target="#newFilterModal">Edit filter</div>
          <div class="col-xs-6 text-center delete-filter">Delete filter</div>
        </div>
      </li>
    </ul>

  </div>

<!-- Modal -->
<form class="" action="index.html" method="post">
<div class="modal fade" id="newFilterModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <label for="filterTitle">Name on filter</label>
            <input type="text" id="filterTitle" name="filterTilte" value="" class="form-control" placeholder="Name on filter">
        </div>
        <div class="modal-body">
          <label for="filterTags">Separate tags with ",""</label>
          <input type="text" id="filterTags" name="filterTags" value="" class="form-control" placeholder="Tags...">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save filter</button>
        </div>
    </div>
  </div>
</div>
</form>
</div>
</template>

<script>
export default {
  name: 'settings',
  data () {
    return {}
  }
}
</script>
