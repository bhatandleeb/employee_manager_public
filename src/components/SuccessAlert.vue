<template>
  <div class="col-md-12">
    <ui-alert @dismiss="showAlert1 = false" type="success" v-show="showAlert1"
      >{{ message }}
    </ui-alert>
  </div>
</template>

<script>
export default {
  props: ["message"],
  data: function () {
    return {
      showAlert1: true,
    };
  },
};
</script>