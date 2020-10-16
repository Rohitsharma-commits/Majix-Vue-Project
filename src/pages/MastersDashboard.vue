<template>
  <div>
  <br/>
  <div class="row">
  <div class="col-12 col-md-6 q-pa-xs">
    <q-card class="my-card">
    <q-card-section class="bg-white text-center" >
        <q-btn push style="background: #338DFF;color: white;" @click="$router.push({name: 'units'})" label="Units" />
    </q-card-section>
    </q-card>
      </div>
    <div class="col-12 col-md-6 q-pa-xs">
    <q-card class="my-card">
    <q-card-section class="bg-white text-center" >
        <q-btn push style="background: #338DFF;color: white;" @click="$router.push({name: 'sector', params: { pitem: 0 }})" label="Sectors" />
    </q-card-section>
    </q-card>
      </div>
    </div>
    <br/>
    <div class="row">
      <div class="col-12 col-md-6 q-pa-xs">
    <q-card class="my-card">
    <q-card-section class="bg-white text-center" >
        <q-btn push style="background: #338DFF;color: white;" @click="$router.push({name: 'team', params: { pitem: 0 }})" label="Teams" />
    </q-card-section>
    </q-card>
      </div>
  <div class="col-12 col-md-6 q-pa-xs">
    <q-card class="my-card">
    <q-card-section class="bg-white text-center" >
        <q-btn push style="background: #338DFF;color: white;" @click="$router.push({name: 'productgroup', params: { pitem: 0 }})" label="Product Groups" />
    </q-card-section>
    </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.my-card {
  padding: 10px;
  border-radius: 25px;
}
</style>
