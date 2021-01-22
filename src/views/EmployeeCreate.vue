<template>
  <div class="add-employee">
    <div class="container">
      <div class="row mt-5">
        <div class="col-md-12">
          <h3 class="text-success text-center">Add Employee Details</h3>
        </div>
      </div>
      <div class="row" v-if="!formValid">
        <ui-alert
          @dismiss="showAlert1 = false"
          type="error"
          v-show="showAlert1"
        >
          There are some errors. Please check &amp; correct them.
        </ui-alert>
      </div>
      <form
        class="px-3 py-3"
        autocomplete="off"
        method="POST"
        @submit.prevent="onSubmit"
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
            <v-button>Submit</v-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
export default {
  components: {
    "v-button": Button,
  },
  data: function () {
    return {
      employee: {
        id: null,
        employee_name: "",
        phone_number: "",
        email_id: "",
        joining_date: new Date(),
      },
      showAlert1: true,
      formValid: true,
    };
  },
  methods: {
    joiningFormatter: function (date) {
      let newDate = date.toISOString().split("T")[0];
      return newDate;
    },
    onDateSelect: function () {
      event.preventDefault();
    },
    generateUid: function () {
      let uuid = Math.floor(Math.random() * Date.now());
      return uuid * 100;
    },
    get_data_localStorage: function () {
      if (localStorage.getItem("employee_data")) {
        var data = JSON.parse(localStorage.getItem("employee_data"));
        return data;
      }
    },
    onSubmit: function () {
      this.$validator.validate().then((success) => {
        if (!success) {
          this.formValid = false;
          return;
        }
        this.formValid = true;

        let json_object_data = {};
        const form = event.target;
        const formData = new FormData(form); // get all named inputs in form
        for (const [key, value] of formData) {
          json_object_data[key] = value;
        }
        json_object_data["id"] = this.generateUid(); // generate unique id & add to obj
        console.log("json_object_data---", json_object_data);

        let data_save;
        if (window.localStorage.getItem("employee_data")) {
          data_save = this.get_data_localStorage();
        } else {
          data_save = new Array();
        }
        data_save.push(json_object_data);
        console.log("data_save---", data_save);
        window.localStorage.setItem("employee_data", JSON.stringify(data_save));
        console.log("window.localStorage---", window.localStorage);
      });
    },
  },
};
</script>