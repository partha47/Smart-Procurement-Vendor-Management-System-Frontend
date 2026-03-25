import { useEffect, useState } from "react";
import api from "../../api/axios";

import {
  Box, Typography, TextField, Button, Paper, Table, TableHead,
  TableRow, TableCell, TableBody, Select, MenuItem, Stack,
  Container, Grid, IconButton, InputAdornment, Chip, Tooltip,
  Snackbar, Alert, FormControl, InputLabel
} from "@mui/material";

import InventoryIcon from '@mui/icons-material/Inventory';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    quantityAvailable: "",
    warehouseLocation: "",
    itemId: "",
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const inv = await api.get("/inventory");
      const item = await api.get("/items");
      setInventory(inv.data);
      setItems(item.data);
    } catch (err) { showMsg("Failed to load inventory data", "error"); }
  };

  const showMsg = (message, severity = "success") => 
    setSnackbar({ open: true, message, severity });

  const save = async () => {
    if (!form.itemId || !form.quantityAvailable) {
        showMsg("Please fill in required fields", "warning");
        return;
    }
    try {
      if (editId) {
        await api.put(`/inventory/${editId}`, form);
        showMsg("Inventory updated");
        setEditId(null);
      } else {
        await api.post("/inventory", {
          quantityAvailable: form.quantityAvailable,
          warehouseLocation: form.warehouseLocation,
          item: { id: form.itemId },
        });
        showMsg("Item added to warehouse");
      }
      setForm({ quantityAvailable: "", warehouseLocation: "", itemId: "" });
      load();
    } catch (err) { showMsg("Error saving inventory", "error"); }
  };

  const deleteInventory = async (id) => {
    if (window.confirm("Remove this item from inventory?")) {
      await api.delete(`/inventory/${id}`);
      showMsg("Record deleted");
      load();
    }
  };

  const getById = async (id) => {
    const res = await api.get(`/inventory/${id}`);
    setForm({
      quantityAvailable: res.data.quantityAvailable,
      warehouseLocation: res.data.warehouseLocation,
      itemId: res.data.item.id,
    });
    setEditId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ bgcolor: "#f4f7f6", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#333", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <WarehouseIcon sx={{ fontSize: 40, color: "#43a047" }} />
            Inventory Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track real-time stock levels across all warehouse locations
          </Typography>
        </Box>

        <Paper elevation={0} sx={{ p: 2, mb: 3, border: "1px solid #e0e0e0", borderRadius: "12px" }}>
            <TextField
                fullWidth
                placeholder="Search inventory by item name..."
                size="small"
                variant="outlined"
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                    startAdornment: <InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>
                }}
            />
        </Paper>

        <Paper elevation={0} sx={{ p: 3, mb: 4, border: "1px solid #e0e0e0", borderRadius: "12px" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={3.5}>
              <FormControl fullWidth size="small">
                <InputLabel>Select Item</InputLabel>
                <Select
                  value={form.itemId}
                  label="Select Item"
                  onChange={(e) => setForm({ ...form, itemId: e.target.value })}
                >
                  {items.map((i) => <MenuItem key={i.id} value={i.id}>{i.itemName}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={2.5}>
              <TextField
                fullWidth label="Quantity" type="number" size="small"
                value={form.quantityAvailable}
                onChange={(e) => setForm({ ...form, quantityAvailable: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} sm={3.5}>
              <TextField
                fullWidth label="Warehouse Location" size="small"
                value={form.warehouseLocation}
                placeholder="e.g. Zone A, Rack 4"
                onChange={(e) => setForm({ ...form, warehouseLocation: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} sm={2.5}>
              <Button 
                fullWidth variant="contained" 
                onClick={save}
                startIcon={editId ? <EditIcon /> : <AddBoxIcon />}
                sx={{ bgcolor: "#43a047", '&:hover': { bgcolor: "#2e7d32" }, fontWeight: 'bold' }}
              >
                {editId ? "UPDATE" : "ADD STOCK"}
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={0} sx={{ borderRadius: "12px", border: "1px solid #e0e0e0", overflow: "hidden" }}>
          <Table>
            <TableHead sx={{ bgcolor: "#43a047", "& .MuiTableCell-head": { color: "white", fontWeight: "bold", borderRight: "1px solid rgba(255,255,255,0.2)" } }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Stock Level</TableCell>
                <TableCell>Location</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventory
                .filter((inv) => inv.item.itemName.toLowerCase().includes(search.toLowerCase()))
                .map((inv) => (
                  <TableRow key={inv.id} hover sx={{ "&:last-child td": { borderBottom: 0 } }}>
                    <TableCell sx={{ borderRight: "1px solid #eee", fontFamily: 'monospace' }}>#{inv.id}</TableCell>
                    <TableCell sx={{ borderRight: "1px solid #eee", fontWeight: 'bold' }}>{inv.item.itemName}</TableCell>
                    <TableCell sx={{ borderRight: "1px solid #eee" }}>
                        <Chip 
                            label={inv.quantityAvailable}
                            size="small"
                            sx={{ 
                                fontWeight: 'bold', 
                                bgcolor: inv.quantityAvailable < 10 ? "#ffebee" : "#e8f5e9",
                                color: inv.quantityAvailable < 10 ? "#d32f2f" : "#2e7d32",
                                border: `1px solid ${inv.quantityAvailable < 10 ? "#ef9a9a" : "#c8e6c9"}`
                            }}
                        />
                    </TableCell>
                    <TableCell sx={{ borderRight: "1px solid #eee" }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <WarehouseIcon fontSize="inherit" color="action" />
                            <Typography variant="body2">{inv.warehouseLocation}</Typography>
                        </Stack>
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <IconButton onClick={() => getById(inv.id)} size="small" color="primary"><EditIcon fontSize="small" />Edit </IconButton>
                        <IconButton onClick={() => deleteInventory(inv.id)} size="small" color="error"><DeleteIcon fontSize="small" />Delete </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}