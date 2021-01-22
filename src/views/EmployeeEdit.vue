<template>
  <div class="edit-employee">
    <div class="container">
      <the-title title="Update Employee Details"></the-title>
      <div class="row mt-3" v-if="isUpdated">
        <success-alert
          message="Employee details updated successfully!"
        ></success-alert>
      </div>
      <form
        class="px-3 py-3"
        autocomplete="off"
        method="POST"
        @submit.prevent="onUpdate"
      >
        <div class="row">
          <div class="col-md-6 mt-3">
            <ui-textbox
              floating-label
              icon="account_box"
              class="material-icons"
              label="Employee Name"
              placeholder="Enter employee name"
              type="text"
              data-vv-as="Employee Name"
              name="employee_name"
              v-validate="'required|alpha_spaces|min:5|max:35'"
              v-model="employee.employee_name"
            ></ui-textbox>
            <p class="text-danger">{{ errors.first("employee_name") }}</p>
          </div>
          <div class="col-md-6 mt-3">
            <ui-textbox
              floating-label
              icon="phone"
              class="material-icons"
              label="Phone Number"
              placeholder="Enter phone number"
              type="tel"
              data-vv-as="Phone Number"
              name="phone_number"
              v-validate="'required|numeric|min:10|max:11'"
              v-model="employee.phone_number"
            ></ui-textbox>
            <p class="text-danger">{{ errors.first("phone_number") }}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mt-3">
            <ui-textbox
              floating-label
              icon="mail"
              class="material-icons"
              label="Email Id"
              placeholder="Enter email id"
              type="email"
              data-vv-as="Email Id"
              name="email_id"
              v-validate="'required|email|max:150'"
              v-model="employee.email_id"
            ></ui-textbox>
            <p class="text-danger">{{ errors.first("email_id") }}</p>
          </div>
          <div class="col-md-6 mt-3">
            <ui-datepicker
              floating-label
              icon="date_range"
              class="material-icons"
              label="Date of Joining"
              placeholder="Select date of joining"
              type="text"
              data-vv-as="Date of Joining"
              name="joining_date"
              v-model="employee.joining_date"
              :custom-formatter="joiningFormatter"
              @close="onDateSelect()"
            ></ui-datepicker>
            <p class="text-danger">{{ errors.first("joining_date") }}</p>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-md-12">
            <ui-button
              color="green"
              class="material-icons"
              icon="done"
              size="normal"
              raised
              >Update
            </ui-button>
            <ui-button
              color="red"
              class="material-icons"
              icon="clear"
              size="normal"
              raised
              buttonType="reset"
              @click="get_data_localStorage"
              >Cancel</ui-button
            >
          </div>
        </div>
      </form>
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
      employee: {},
      showAlert1: true,
      isUpdated: false,
    };
  },
  mounted() {
    this.get_particular_data();
  },
  methods: {
    joiningFormatter(date) {
      let newDate = date.toISOString().split("T")[0];
      return newDate;
    },
    onDateSelect() {
      event.preventDefault();
    },
    get_particular_data() {
      if (localStorage.getItem("employee_data")) {
        let data = JSON.parse(localStorage.getItem("employee_data"));
        let empId = this.$route.params.id;
        console.log("empId---", empId);
        console.log("data---", data);
        let result = data.find((element) => element.id == empId);
        console.log("result---", result);
        this.employee = result;
      }
    },
    get_data_localStorage() {
      if (localStorage.getItem("employee_data")) {
        var data = JSON.parse(localStorage.getItem("employee_data"));
        return data;
      }
    },
    onUpdate() {
      this.$validator.validate().then((success) => {
        if (!success) {
          return;
        }

        let json_object_data = {};
        const form = event.target;
        const formData = new FormData(form); // get all named inputs in form
        for (const [key, value] of formData) {
          json_object_data[key] = value;
        }
        //console.log("json_object_data---", json_object_data);

        let employee_data_array = this.get_data_localStorage();
        let empId = this.$route.params.id;
        for (let i = 0; i < employee_data_array.length; i++) {
          if (employee_data_array[i].id == empId) {
            json_object_data["id"] = empId;
            employee_data_array.splice(i, 1, json_object_data);
            localStorage.setItem(
              "employee_data",
              JSON.stringify(employee_data_array)
            );
          }
        }
        this.isUpdated = true;
        this.get_data_localStorage(); // reload local storage
      });
    },
  },
};
</script>