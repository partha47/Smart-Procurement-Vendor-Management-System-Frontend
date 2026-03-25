import { useEffect, useState } from "react";
import { getDepartments, createDepartment } from "../../api/departmentService";
import API from "../../api/axios";

import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  TableBody,
  Stack,
  Snackbar,
   Dialog,
   DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Alert,

} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import BusinessIcon from '@mui/icons-material/Business';

export default function Departments() {
const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [searchId, setSearchId] = useState("");

  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedDept, setSelectedDept] = useState({ id: null, name: "", location: "" });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const load = async () => {
    try {
      const res = await getDepartments();
      setDepartments(res.data);
    } catch (err) { console.error("Error loading departments", err); }
  };

  useEffect(() => { load(); }, []);

  const showMsg = (msg, sev = "success") => setSnackbar({ open: true, message: msg, severity: sev });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await createDepartment({ name, location });
      setName("");
      setLocation("");
      load();
      showMsg("Department added successfully!");
    } catch (err) { showMsg("Failed to add department", "error"); }
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/departments/${selectedDept.id}`);
      setOpenDelete(false);
      load();
      showMsg("Department removed", "success");
    } catch (err) { showMsg("Error deleting department", "error"); }
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/departments/${selectedDept.id}`, {
        name: selectedDept.name,
        location: selectedDept.location,
      });
      // console.log("updated Response:" ,res);
      // console.log("Update location:", selectedDept.location);
      setOpenEdit(false);
      load();
      showMsg("Department updated successfully");
    } catch (err) { showMsg("Update failed", "error"); }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#333", display: 'inline-flex', alignItems: 'center', gap: 2 }}>
            <BusinessIcon sx={{ fontSize: 40, color: "#3f51b5" }} />
            Department Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Organize and track company infrastructure and office locations
          </Typography>
        </Box>

      
      <Paper sx={{ p: 3, mb: 3 }}>
        <form onSubmit={submit}>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Department Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />

            <TextField
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
              required
            />

            <Button type="submit" variant="contained">
              Add
            </Button>
          </Stack>
        </form>
      </Paper>


      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Search Department ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            
          />

          <Button variant="outlined" onClick={async () => {
                      try { const res = await API.get(`/departments/${searchId}`); setDepartments(res.data ? [res.data] : []); } catch { setDepartments([]); }
                    }} startIcon={<SearchIcon />}>
            Search
          </Button>

          <Button variant="outlined" onClick={load} startIcon={<RestartAltIcon />}>
            Reset
          </Button>
        </Stack>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Location</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {departments.map((d) => (
              <TableRow key={d.id}>
                <TableCell>{d.id}</TableCell>
                <TableCell>{d.name}</TableCell>
                <TableCell>{d.location}</TableCell>

                <TableCell>
                  <Stack direction="row" spacing={1}>
                    {/* <Button
                      variant="contained"
                      size="small"
                      onClick={() => updateDept(d.id)}
                    >
                      Edit
                    </Button> */}

                    <IconButton onClick={() => { setSelectedDept(d); setOpenEdit(true); }} size="small" sx={{ color: '#3f51b5' }}><EditIcon fontSize="small" />Edit</IconButton>

                    {/* <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => deleteDept(d.id)}
                    >
                      Delete
                    </Button> */}

                    <IconButton onClick={() => { setSelectedDept(d); setOpenDelete(true); }} size="small" color="error"><DeleteIcon fontSize="small" />Delete</IconButton>

                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>


      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 'bold' }}>Update Department</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Name" value={selectedDept.name} onChange={(e) => setSelectedDept({ ...selectedDept, name: e.target.value })} margin="normal" />
          <TextField fullWidth label="Location" value={selectedDept.location} onChange={(e) => setSelectedDept({ ...selectedDept, location: e.target.value })} margin="normal" />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" sx={{ bgcolor: '#3f51b5' }}>Save Changes</Button>
        </DialogActions>
      </Dialog>


      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle sx={{ color: '#d32f2f', fontWeight: 'bold' }}>Remove Department?</DialogTitle>
        <DialogContent>
          <DialogContentText>Deleting <b>{selectedDept.name}</b> will remove it from the system. This cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDelete(false)} color="inherit">Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>{snackbar.message}</Alert>
      </Snackbar>

    </Box>
  );
}