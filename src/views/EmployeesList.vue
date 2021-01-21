<template>
  <div class="list-employees">
    <div class="container">
      <div class="row mt-3">
        <div class="col-md-12">
          <h3 class="text-success text-center">Employee Details</h3>
        </div>
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
export default {
  data: function () {
    return {
      employee_list: [],
    };
  },
  mounted() {
    this.get_data_list();
  },
  methods: {
    get_data_list: function () {
      this.employee_list = this.get_data_localStorage();
    },
    get_data_localStorage: function () {
      if (localStorage.getItem("employee_data")) {
        var data = JSON.parse(localStorage.getItem("employee_data"));
        return data;
      }
    },
  },
};
</script>