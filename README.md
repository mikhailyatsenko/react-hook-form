### Write stack: 
TypeScript, Vite (React), React Hook Form, Yup, React Router, Redux Toolkit, ESLint, Prettier, Husky.

### What was done:

1. Routing. There is 3 routes:
   - Main, has links to other 2 routes
   - Route for the form created using uncontrolled components approach
   - Route for the similar form, but created with the help of the **React Hook Form**
2. Redux. Redux is used to store the data provided by both approaches on the Main route. 
3. Forms.
   Both forms are collected the same data:
   - name (validate for first uppercased letter)
   - age (should be number, no negative values)
   - email (validate for email)
   - 2 passwords (should match, display the password strength: 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character)
   - gender (radio buttons)
   - accept T&C (checkbox)
   - input control to upload picture (validate size and extension, allow png jpeg, save in redux store as base64)
   - autocomplete control to select country (all countries stored in the Redux store)
4. Validation.
    **Yup** used for validation. 
   - In uncontrolled components implemented validation on submit
   - In approach with **React Hook Form** implemented live validation
5. After submitting the form
    On successful form submission user redirect to the main route with all the previously entered data.