<template>
<div>
  <navbar :page="'settings'"></navbar>

  <!-- FILIP, Lägg till dynamiskt användarnamn, plz -->
  <h3 class="text-center">@Username</h3>

    <p class="btn create-filter-btn text-center" data-toggle="modal" data-target="#filtermodal">Nytt Filter </p>



   <div class="container">
     <div class="col-md-6 col-md-offset-3">
       <div class="row">
         <div class="col-xs-6 text-left">
           <p>Filter</p>
         </div>

         <!-- När man klickar på edit ska .panel-footer bli display: block
          ============================================================ -->
       <div class="col-xs-6 text-right" v-on:click="openFilterFooter">Redigera</div>
       </div>

      <ul class="list-group">
        <li class="list-group-item" v-for="(filter, i) in filters">
          <div style="padding: 0" class="col-xs-8 text-left">
            <span class="filter-title">{{ filter.name }}</span>
          </div>
          <div style="padding: 0" class="col-xs-4 text-right" v-on:click="activateFilter(i)">
            <span v-if="filter.active" class="label label-success">Aktiverad</span>
            <span v-else class="label label-default">Aktivera</span>
          </div>
          <div class="filter-body-tags">
            <span class="filter-tags" v-for="tag in filter.allawedtags">{{ tag }} </span>
          </div>
          <div class="panel-footer clearfix" v-show="filterFooter">
            <div class="col-xs-6 text-center edit-filter" v-on:click="editFilter(i)">Redigera filter</div>
            <div class="col-xs-6 text-center delete-filter" v-on:click="deleteFilter(i)">Ta bort filter</div>
          </div>
        </li>

      </ul>
    </div>
  </div>

<!-- Modal -->
<form class="" v-on:submit.prevent="createFilter">
<div class="modal fade" id="filtermodal" tabindex="-1" role="dialog" aria-labelledby="filtermodal">
  <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <label for="filterTitle">Namn</label>
            <input type="text" id="filterTitle" name="filterTilte" class="form-control" placeholder="Namn på filtret" v-model="filterName">
        </div>
        <div class="modal-body">
          <label for="filterTags">Taggar (separera med ,)</label>
          <input type="text" id="filterTags" name="filterTags" class="form-control" placeholder="Taggar..." v-model="filterTags">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Stäng</button>
          <button type="submit" class="btn btn-primary">Spara filter</button>
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
    return {
      filterTags: "",
      filterName: "",
      filterFooter: false
    }
  },
  computed: {
    filters: function () {
      return this.$store.state.filters;
    }
  },
  beforeMount: function(){
    this.$store.dispatch('GET_FILTERS').then((res) => {
        console.log(res.data);
        this.$store.commit('setfilters', res.data);
      })
      .catch((err) => {
        //TODO: Real error handling
        console.log(err);
      });
   },
    methods: {
      createFilter: function(){
        console.log(this.filterTags, this.filterName);
        this.$store.dispatch('CREATE_FILTER', {name: this.filterName, tags: this.filterTags}).then((res) => {
          console.log(res.data);
          //this.filters.push();
          this.filters.push(res.data)
          this.$store.commit('setfilters', this.filters);
          this.filterName = "";
          this.filterTags = "";
          $('#filtermodal').modal('hide');
        })
        .catch((err) => {
          //TODO: Real error handling
          console.log(err);
        });

      },
      activateFilter: function(i){
        this.$store.dispatch('ACTIVATE_FILTER', {id: this.filters[i]._id});
      },
      openFilterFooter: function(){
        this.filterFooter = !this.filterFooter;
        console.log(this.filterFooter);
      },
      editFilter: function(i){
        alert('Funktionalitet är ännu inte genomförd!')
      },
      deleteFilter: function(i){
        if(confirm("Är du säker på att du vill ta bort filter: " + this.filters[i].name + "?")){
         this.$store.dispatch('REMOVE_FILTER', {id: this.filters[i]._id});
        }
      }
    }
}
</script>
