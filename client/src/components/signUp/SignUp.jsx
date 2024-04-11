import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { TextField, Box, Button } from "@mui/material";

const SignUp = () => {
  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          name: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .required("Please enter email")
            .email("Invalid email"),
          name: Yup.string()
            .required("Please enter name")
            .min(2, "Name too short"),
          password: Yup.string()
            .required("Please enter password")
            .min(8, "Password should be minimum 8 characters long"),
        })}
        onSubmit={(data) => console.log(data)}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              name="email"
              type="email"
              as={TextField}
              variant="outlined"
              color="primary"
              label="Email"
              fullWidth
              error={Boolean(errors.email) && Boolean(touched.email)}
              helperText={Boolean(touched.email) && errors.email}
            />
            <Box height={14} />
            <Field
              name="name"
              type="name"
              as={TextField}
              variant="outlined"
              color="primary"
              label="Name"
              fullWidth
              error={Boolean(errors.name) && Boolean(touched.name)}
              helperText={Boolean(touched.name) && errors.name}
            />
            <Box height={14} />
            <Field
              name="password"
              type="password"
              as={TextField}
              variant="outlined"
              color="primary"
              label="Password"
              fullWidth
              error={Boolean(errors.password) && Boolean(touched.password)}
              helperText={Boolean(touched.password) && errors.password}
            />
            <Box height={14} />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Sign up
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
