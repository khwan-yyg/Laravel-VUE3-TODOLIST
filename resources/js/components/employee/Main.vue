<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-8 form-section">
                <h4 class="mb-3">List of employee</h4>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">State</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="value in list_of_employees">
                            <th scope="row">{{ value.id }}</th>
                            <td>
                                {{ value.first_name }} {{ value.last_name }}
                            </td>
                            <td>{{ value.email }}</td>
                            <td>{{ value.state }}</td>
                            <td>
                                <span class="mr-2">
                                    <font-awesome-icon
                                        icon="trash-alt"
                                        :style="{ color: 'red' }"
                                    />
                                </span>
                                <span>
                                    <font-awesome-icon
                                        :icon="['fas', 'user-edit']"
                                    />
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="col-4">
                <Form @submit="saveData">
                    <div class="form-row form-section">
                        <h4 class="mb-3">Add Employee Info</h4>

                        <!-- First Name -->
                        <div class="col-12 mb-3">
                            <label
                                class="form-label form-label-top"
                                for="firstName"
                            >
                                First Name <span class="form-required">*</span>
                            </label>
                            <Field
                                name="first_name"
                                rules="required"
                                class="form-control"
                                placeholder="First Name"
                            />
                            <ErrorMessage
                                name="first_name"
                                class="text-danger"
                            />
                        </div>

                        <!-- Last Name -->
                        <div class="col-12 mb-3">
                            <label
                                class="form-label form-label-top"
                                for="lastName"
                            >
                                Last Name <span class="form-required">*</span>
                            </label>
                            <Field
                                name="last_name"
                                rules="required"
                                class="form-control"
                                placeholder="Last Name"
                            />
                            <ErrorMessage
                                name="last_name"
                                class="text-danger"
                            />
                        </div>

                        <!-- Email -->
                        <div class="col-12 mb-3">
                            <label
                                class="form-label form-label-top"
                                for="email"
                            >
                                Email <span class="form-required">*</span>
                            </label>
                            <Field
                                name="email"
                                type="email"
                                rules="validateEmail"
                                class="form-control"
                                placeholder="Email"
                            />
                            <ErrorMessage name="email" class="text-danger" />
                        </div>

                        <!-- Phone -->
                        <div class="col-12 mb-3">
                            <label
                                class="form-label form-label-top"
                                for="phone"
                            >
                                Phone No. <span class="form-required">*</span>
                            </label>
                            <Field
                                name="phone"
                                rules="required|min:10"
                                class="form-control"
                                placeholder="Phone No."
                            />
                            <ErrorMessage name="phone" class="text-danger" />
                        </div>

                        <!-- Current Experience -->
                        <div class="col-12 mb-3">
                            <label
                                class="form-label form-label-top"
                                for="currentExperience"
                                >Current Experience
                                <span class="form-required">*</span>
                            </label>
                            <Field
                                name="current_experience"
                                rules="required"
                                class="form-control"
                                placeholder="Current Experience"
                            />
                            <ErrorMessage
                                name="current_experience"
                                class="text-danger"
                            />
                        </div>

                        <!-- City -->
                        <div class="col-12 mb-3">
                            <label class="form-label form-label-top" for="city"
                                >City
                                <span class="form-required">*</span>
                            </label>
                            <Field
                                name="city"
                                rules="required"
                                class="form-control"
                                placeholder="City"
                            />
                            <ErrorMessage name="city" class="text-danger" />
                        </div>

                        <!-- State -->
                        <div class="col-12 mb-3">
                            <label class="form-label form-label-top" for="state"
                                >State
                                <span class="form-required">*</span>
                            </label>
                            <Field
                                name="state"
                                rules="required"
                                class="form-control"
                                placeholder="State"
                            />
                            <ErrorMessage name="state" class="text-danger" />
                        </div>

                        <!-- Gender -->
                        <div class="col-12 mb-3">
                            <label class="form-label form-label-top"
                                >Gender
                                <span class="form-required">*</span>
                            </label>
                            <div class="form-check form-check-inline">
                                <Field
                                    name="gender"
                                    type="radio"
                                    value="male"
                                    rules="required"
                                    class="form-check-input"
                                />
                                <label class="form-check-label">Male</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <Field
                                    name="gender"
                                    type="radio"
                                    value="female"
                                    class="form-check-input"
                                />
                                <label class="form-check-label">Female</label>
                            </div>
                            <ErrorMessage name="gender" class="text-danger" />
                        </div>

                        <!-- Submit Button -->
                        <button class="btn btn-primary" type="submit">
                            SUBMIT
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
import { useToast } from "vue-toastification";
const toast = useToast();

import { Form, Field, ErrorMessage, defineRule } from "vee-validate";
import { required, min } from "@vee-validate/rules";

defineRule("required", required);
defineRule("min", min);

defineRule("validateEmail", (value) => {
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailRegex.test(value)) {
        return "Invalid email format";
    }
    return true;
});

export default {
    data() {
        return {
            employee: {
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                city: "",
                current_experience: "",
                state: "",
                gender: "",
            },

            list_of_employees: [],
        };
    },

    mounted() {
        console.log("on mounted");
        axios
            .get("employee/list")
            .then((response) => {
                console.log(response.data);
                this.list_of_employees = response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },

    created() {
        console.log("on created");
    },

    components: {
        Form,
        Field,
        ErrorMessage,
    },

    methods: {
        saveData(values) {
            axios
                .post("/employee/create", values)
                .then((response) => {
                    console.log(response);
                    toast.success("Your data has been saved successfully!");
                })
                .catch((error) => {
                    console.error("Error:", error);
                    toast.error("Something went wrong!");
                });
        },
    },
};
</script>

<style scope>
.form-label-top {
    width: 100%;
    margin-left: 2px;
    margin-bottom: 10px;
}

.form-label {
    color: #2c3345;
    display: inline-block;
    font-size: 16px;
    font-weight: 500;
    word-break: break-word;
}

.form-required {
    color: #f23a3c;
}

.form-section {
    border-radius: 10px;
    overflow: hidden;
    padding: 62px 55px 65px;
    box-shadow: 0 3px 20px 0 rgb(0 0 0 / 10%);
    -moz-box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: 0 3px 20px 0 rgb(0 0 0 / 10%);
    -o-box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.1);
    -ms-box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.1);
}

input.form-control {
    height: 44px;
}

tbody,
td,
tfoot,
th,
thead,
tr {
    line-height: 48px;
}

.mr-2 {
    margin-right: 10px;
}
</style>
