import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import ImageUpload from "../upload-image/ImageFormUpload";
import { useState, useEffect } from "react";
import { writeDataToPath } from "../../firebase/FirebaseConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { database } from "../../firebase/FirebaseConfig";
import { getDatabase, ref, onValue } from "firebase/database";
import { env_map } from "../../env";
const Form = () => {
  const MAIN_API_SERVICE_URL = env_map.MAIN_API_SERVICE_URL;
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const defaultToastStyle = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };
  const [users, setUsers] = useState(null)
  useEffect(() => {
    onValue(ref(database, '/users'), (snapshot) => {
      console.log("Data: " + JSON.stringify(snapshot.val()))

      setUsers(Object.values(snapshot.val()))
    }, {
      onlyOnce: false
    });
  }, [])
  const requestForDetectFaceAndSaveNewUser = (values) => {
    const request_body = {
      'username': values.username,
      'image_url': [
        values.image1,
        values.image2
      ]
    }
    console.log("REQUEST FOR DETECT FACE: ", request_body)
    fetch(MAIN_API_SERVICE_URL.concat("/sign-up/detect-face"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request_body),
    })
      .then((response) => response.text())
      .then((result) => {
        console.log("Upload Image Response: ", JSON.parse(result));
        toast.success('Detect new user\'s face ' + values.fullName + ' successfully!', defaultToastStyle);
        values.id = (new Date()).getTime()
        writeDataToPath("/users/" + values.id + "/", values)
        toast.success('Save new user\'s credential ' + values.fullName + ' successfully!', defaultToastStyle)
      })
      .catch((error) => {
        console.log("error", error)
        toast.error('Failed to detect new user\'s face ' + values.fullName, defaultToastStyle);
      });
  }

  const handleFormSubmit = (values) => {
    console.log("SUBMIT: ", values);

    // check username or phone or email is available
    if (users.find(data => data.username == values.username)) {
      toast.error('Username was exist!', defaultToastStyle);
      return;
    }
    if (users.find(data => data.contact == values.contact)) {
      toast.error('Phone number was exist!', defaultToastStyle);
      return;
    }
    if (users.find(data => data.email == values.email)) {
      toast.error('Email was exist!', defaultToastStyle);
      return;
    }
    toast.info('Register new user account!', defaultToastStyle);
    requestForDetectFaceAndSaveNewUser(values)
  };

  return (
    <div>
      <Box m="20px">
        <Header title="CREATE USER" subtitle="Create a New User Profile" />


        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <div>
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    error={!!touched.firstName && !!errors.firstName}
                    helperText={touched.firstName && errors.firstName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={!!touched.lastName && !!errors.lastName}
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    name="username"
                    error={!!touched.username && !!errors.username}
                    helperText={touched.username && errors.username}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="password"
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Contact Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.contact}
                    name="contact"
                    error={!!touched.contact && !!errors.contact}
                    helperText={touched.contact && errors.contact}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Address 1"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address1}
                    name="address1"
                    error={!!touched.address1 && !!errors.address1}
                    helperText={touched.address1 && errors.address1}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Address 2"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address2}
                    name="address2"
                    error={!!touched.address2 && !!errors.address2}
                    helperText={touched.address2 && errors.address2}
                    sx={{ gridColumn: "span 4" }}
                  />
                </Box>
              </form>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <ImageUpload setImageUrl={setImage1} />
                <ImageUpload setImageUrl={setImage2} />
              </div>


              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained" onClick={() => {
                  values.image1 = image1
                  values.image2 = image2
                  values['fullName'] = values.firstName + ' ' + values.lastName
                  values.access = 'admin'
                  handleFormSubmit(values)

                }}>
                  Create New User
                </Button>
              </Box>
            </div>
          )}
        </Formik>
      </Box>
      <ToastContainer />
    </div>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
  username: yup.string().required("required"),
  password: yup.string().required("required"),
  image1: yup.string(),
  image2: yup.string(),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
  username: "",
  password: "",
  image1: "",
  image2: "",
  fullName: "",
  id: "",
  access: ""
};

export default Form;
