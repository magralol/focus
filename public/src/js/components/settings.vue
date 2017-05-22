<template>
<div>
  <navbar :page="'settings'"></navbar>

  <!-- <h3 class="text-center">@Username</h3> -->
  <div class="container">
    <div class="col-md-6 col-md-offset-3 text-center">
      <p class="btn btn-primary create-filter-btn text-center" data-toggle="modal" data-target="#filtermodal">
        Nytt Filter
      </p>
      <div class="row">
         <!-- Open modal button
          ============================================================ -->
        <div class="col-xs-12 text-right crud_btn" v-on:click="openFilterFooter">
          <span v-show="!filterFooter">Redigera</span>
          <span v-show="filterFooter" >Klar</span>
        </div>
      </div>

      <ul class="list-group">
        <li class="list-group-item message_post" v-for="(filter, i) in filters">
          <div class="list-group-container">
            <span class="col-xs-8 filter-info text-left">
            <div class="text-left filter-title">
              <span>{{ filter.name }}</span>
            </div>
            <div class="filter-body-tags">
              <span class="filter-tags" v-for="tag in filter.allawedtags">{{ tag }} </span>
            </div>
            </span>
            <div class="col-xs-4 filter-activate" v-on:click="activateFilter(i)">
              <span v-if="filter.active" class="label label-success">Aktiverad</span>
              <span v-else class="label label-default">Aktivera</span>
            </div>
          </div>
          <div class="panel-footer clearfix" v-show="filterFooter">
            <div class="col-xs-6 text-center edit-filter" v-on:click="editFilter(i)">Redigera</div>
            <div class="col-xs-6 text-center delete-filter" v-on:click="deleteFilter(i)">Ta bort</div>
          </div>
        </li>
      </ul>
    </div>
  </div>

<!-- Filter Modal
 ============================================================ -->
<form class="" v-on:submit.prevent="createFilter">
<div class="modal fade" id="filtermodal" tabindex="-1" role="dialog" aria-labelledby="filtermodal">
  <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <label for="filterTitle"><strong>Namn</strong></label>
            <input type="text" id="filterTitle" name="filterTilte" class="form-control" placeholder="Namn på filtret" v-model="filterName">
        </div>
        <div class="modal-body">
          <label for="filterTags"><strong>Taggar</strong> <br> exempel tag1,tag2,tag3</label>
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
      filterFooter: false,
      editMode: false
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

        if(this.editMode){
          console.error("NOT YET IMPLEMENTED");
        }else{
          this.$store.dispatch('CREATE_FILTER', {name: this.filterName, tags: this.filterTags}).then((res) => {
            console.log(res.data);
            //this.filters.push();
            this.filters.push(res.data)
            this.$store.commit('setfilters', this.filters);
            this.filterName = "";
            this.filterTags = "";
            $('#filtermodal').modal('hide');
          }).catch((err) => {
            //TODO: Real error handling
            console.log(err);
          });
        }


      },
      activateFilter: function(i){
        this.$store.dispatch('ACTIVATE_FILTER', {id: this.filters[i]._id});
      },
      openFilterFooter: function(){
        this.filterFooter = !this.filterFooter;
        console.log(this.filterFooter);
      },
      editFilter: function(i){
        //this.filterName = this.filters[i].name;
        //this.filterTags = this.filters[i].allawedtags.join();
        //$('#filtermodal').modal('show');
        alert("Funktionalitet inte implementera än");
      },
      deleteFilter: function(i){
        if(confirm("Är du säker på att du vill ta bort filter: " + this.filters[i].name + "?")){
         this.$store.dispatch('REMOVE_FILTER', {id: this.filters[i]._id});
        }
      }
    }
}
</script>
