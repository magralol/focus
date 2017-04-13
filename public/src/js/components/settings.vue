<template>
<div>
  <navbar></navbar>

  <h3 class="text-center">@Username</h3>

    <p class="btn create-filter-btn text-center" data-toggle="modal" data-target="#newFilterModal">New Filter </p>



   <div class="container">
     <div class="col-md-6 col-md-offset-3">
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
import Navbar from './navbar.vue'
export default {
  name: 'settings',
  components: {
    navbar: Navbar
  },
  data () {
    return {}
  }
}
</script>
