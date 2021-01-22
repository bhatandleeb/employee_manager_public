<template>
  <div class="list-employees">
    <div class="container">
      <the-title title="Employee Details"></the-title>
      <div class="row mt-3">
        <ui-confirm
          confirm-button-icon="delete"
          confirm-button-text="Delete"
          deny-button-text="Cancel"
          ref="deleteConfirm"
          title="Delete"
          type="danger"
          @confirm="onConfirmDelete"
        >
          Are you sure you want to delete the employee details?
        </ui-confirm>
      </div>
      <div class="row mt-3" v-if="isDeleted">
        <success-alert
          message="Employee details deleted successfully!"
        ></success-alert>
      </div>
      <div class="row mt-3">
        <div class="table-responsive">
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date of Joining</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody v-if="employee_list.length > 0">
              <tr v-for="(employee, index) in employee_list" :key="employee.id">
                <td>{{ employee_list.length - index }}</td>
                <td>{{ employee.employee_name }}</td>
                <td>{{ employee.email_id }}</td>
                <td>{{ employee.phone_number }}</td>
                <td>{{ employee.joining_date }}</td>
                <td>
                  <router-link
                    :to="{
                      name: 'Edit',
                      params: { id: employee.id },
                    }"
                    ><ui-icon-button
                      color="green"
                      class="material-icons"
                      icon="edit"
                      size="normal"
                      tooltip="Edit"
                      tooltip-position="bottom"
                      @click="isEmployeeEdit = true"
                    ></ui-icon-button>
                  </router-link>

                  <ui-icon-button
                    color="red"
                    class="material-icons"
                    icon="delete"
                    size="normal"
                    tooltip="Delete"
                    tooltip-position="bottom"
                    @click="showConfirm('deleteConfirm', employee.id)"
                  ></ui-icon-button>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="6">No records found!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheTitle from "@/components/TheTitle.vue";
import SuccessAlert from "@/components/SuccessAlert.vue";
export default {
  components: {
    TheTitle,
    SuccessAlert,
  },
  data: function () {
    return {
      employee_list: [],
      selectedId: null,
      isDeleted: false,
    };
  },
  mounted() {
    this.get_data_list();
  },
  methods: {
    get_data_list() {
      this.employee_list = this.get_data_localStorage();
    },
    get_data_localStorage() {
      if (localStorage.getItem("employee_data")) {
        var data = JSON.parse(localStorage.getItem("employee_data"));
        return data;
      }
    },
    showConfirm(ref, id) {
      this.selectedId = id; // get & set selected record id
      this.$refs[ref].open();
    },
    onConfirmDelete() {
      let employee_data_array = this.get_data_localStorage();
      for (let i = 0; i < employee_data_array.length; i++) {
        if (employee_data_array[i].id == this.selectedId) {
          employee_data_array.splice(i, 1);
          localStorage.setItem(
            "employee_data",
            JSON.stringify(employee_data_array)
          );
        }
      }
      this.isDeleted = true; // set isDeleted flag to true
      this.get_data_list(); // reload local storage
    },
  },
};
</script>