// import React, { useState } from "react";
// import {
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   Box,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// const initial = { profile: "", exp: 0, techs: [], desc:"" };

// const Create = () => {
//     const skillSet = [
//         {
//           name: "Javascript"
//         },
//         {
//           name: "Java"
//         },
//         {
//           name: "Python"
//         },
//         {
//           name: "Django"
//         },
//         {
//           name: "Rust"
//         }
//       ];
//   const navigate = useNavigate();
//   const [form, setForm] = useState(initial);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetch("http://localhost:8080/post", {
//       method: "POST", // or 'PUT'
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(form),
//     })
//       .then((response) => console.log(response))
//       .then((data) => {
//         console.log("Success:", data);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//       navigate('/employee/feed');
//   };

//   const { profile, exp, desc } = form;

//   const handleChange = (e) => {
//     setForm({...form , techs : [...form.techs, e.target.value]});
//   }

//   return (
//     <Paper sx={{ padding:"2%"}} elevation={3}>
//       <Typography sx={{ margin: "3% auto" }} align="center" variant="h5">
//         Create New Post
//       </Typography>
//       <form autoComplete="off" noValidate onSubmit={handleSubmit}>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             flexDirection: "column",
//           }}
//         >
//           <TextField
//             type="string"
//             sx={{ width: "50%", margin: "2% auto" }}
//             required
//             onChange={(e) => setForm({ ...form, profile: e.target.value })}
//             label="Job-profile"
//             variant="outlined"
//             value={profile}
//           />
//           <TextField
//             min="0"
//             type="number"
//             sx={{ width: "50%", margin: "2% auto" }}
//             required
//             onChange={(e) => setForm({ ...form, exp: e.target.value })}
//             label="Years of Experience"
//             variant="outlined"
//             value={exp}
//           />
//            <TextField
//             type="string"
//             sx={{ width: "50%", margin: "2% auto" }}
//             required
//             multiline
//             rows={4}
//             onChange={(e) => setForm({ ...form, desc: e.target.value })}
//             label="Job-desc"
//             variant="outlined"
//             value={desc}
//           />
//           <Box sx={{ margin:"1% auto"}}>
//           <h3>Please mention required skills</h3>
//          <ul>
//         {skillSet.map(({ name }, index) => {
//           return (
//             <li key={index}>
//               <div >
//                 <div>
//                   <input
//                     type="checkbox"
//                     id={`custom-checkbox-${index}`}
//                     name={name}
//                     value={name}
//                     onChange={handleChange}  
//                   />
//                   <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
//                 </div>
//               </div>
//             </li>
//           );
//         })}
       
//       </ul>
//           </Box>
//           <Button
//             sx={{ width: "50%", margin: "2% auto" }}
//             variant="contained"
//             type="submit"
//           >
//             Submit
//           </Button>
//         </Box>
//       </form>
//     </Paper>
//   );
// };

// export default Create;
import React, { useState } from "react";
import { Typography, TextField, Paper, Box, Button, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";

const initial = { profile: "", exp: 0, techs: [], desc: "" };

const skillSet = ["JavaScript", "Java", "Python", "Django", "Rust"];

const Create = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then(() => navigate("/employee/feed"));
  };

  const handleCheckboxChange = (skill) => {
    setForm((prevForm) => ({
      ...prevForm,
      techs: prevForm.techs.includes(skill)
        ? prevForm.techs.filter((s) => s !== skill)
        : [...prevForm.techs, skill],
    }));
  };

  return (
    <Paper sx={{ padding: "2rem", width: "70%", margin: "2rem auto" }} elevation={4}>
      <Typography variant="h4" align="center" gutterBottom>
        Create New Job Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextField label="Job Profile" required fullWidth value={form.profile}
            onChange={(e) => setForm({ ...form, profile: e.target.value })} />
          <TextField label="Years of Experience" type="number" required fullWidth value={form.exp}
            onChange={(e) => setForm({ ...form, exp: e.target.value })} />
          <TextField label="Job Description" multiline rows={4} required fullWidth value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })} />

          <Typography variant="h6">Required Skills</Typography>
          <FormGroup row>
            {skillSet.map((skill) => (
              <FormControlLabel
                key={skill}
                control={
                  <Checkbox
                    checked={form.techs.includes(skill)}
                    onChange={() => handleCheckboxChange(skill)}
                  />
                }
                label={skill}
              />
            ))}
          </FormGroup>

          <Button variant="contained" type="submit" fullWidth size="large">
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Create;
