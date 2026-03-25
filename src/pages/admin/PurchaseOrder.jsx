import { useEffect, useState } from "react";
import api from "../../api/axios";

import {
  Box, Typography, TextField, Button, Paper, Table, TableHead,
  TableRow, TableCell, TableBody, Stack, Select, MenuItem,
  FormControl, InputLabel, Container, Grid, IconButton,
  Chip, Dialog, DialogActions, DialogContent, DialogTitle,
  Snackbar, Alert, InputAdornment,DialogContentText
} from "@mui/material";

import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export default function PurchaseOrder() {
  const [reqs, setReqs] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [poList, setPoList] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const [form, setForm] = useState({
    requisitionId: "",
    vendorId: "",
    orderDate: "",
    expectedDelivery: "",
    totalAmount: "",
  });

  useEffect(() => { load(); }, []);

  const showMsg = (message, severity = "success") => setSnackbar({ open: true, message, severity });

  const load = async () => {
    try {
      const [r, v, p] = await Promise.all([
        api.get("/requisitions"),
        api.get("/vendors"),
        api.get("/po")
      ]);
      setReqs(r.data);
      setVendors(v.data);
      setPoList(p.data);
    } catch (err) { showMsg("Failed to sync data", "error"); }
  };

  const savePO = async (e) => {
    e.preventDefault();
    if (!form.vendorId || !form.requisitionId) {
      showMsg("Select Vendor and Requisition", "warning");
      return;
    }

    try {
      
      await api.post(`/po?vendorId=${form.vendorId}&requisitionId=${form.requisitionId}`);
      showMsg("Purchase Order generated!");
      setForm({ requisitionId: "", vendorId: "", orderDate: "", expectedDelivery: "", totalAmount: "" });
      setEditId(null);
      load();
    } catch (err) { showMsg("Error generating PO", "error"); }
  };

  const getPO = async (id) => {
    const res = await api.get(`/po/${id}`);
    const data = res.data;
    console.log("PO Data:", data);
    setForm({
      requisitionId: data.requisition?.id || "",
      vendorId: data.vendor?.id || "",
      orderDate: data.orderDate || "",
      expectedDelivery: data.expectedDelivery || "",
      totalAmount: data.totalAmount || "",
    });
    setEditId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async () => {
    await api.delete(`/po/${selectedId}`);
    setOpenDelete(false);
    load();
    showMsg("Order deleted");
  };

  const searchPO = async () => {
    const res = await api.get(`/po/search?keyword=${search}`);
    setPoList(res.data);
  };

  return (
    <Box sx={{ bgcolor: "#f4f7f6", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        
      
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#1a237e", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <ReceiptLongIcon sx={{ fontSize: 40 }} />
            Purchase Orders
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage procurement requests and official vendor orders
          </Typography>
        </Box>

        
        <Paper elevation={0} sx={{ p: 2, mb: 3, border: "1px solid #e0e0e0", borderRadius: "12px" }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField 
              fullWidth
              placeholder="Search PO Number/Vendor" 
              size="small" 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small"/></InputAdornment> }}
            />
            <Button variant="contained" onClick={searchPO} sx={{ bgcolor: "#1a237e", px: 4, minWidth: '120px' }}>SEARCH</Button>
            <IconButton onClick={load} sx={{ border: '1px solid #ccc', borderRadius: '4px' }}><RestartAltIcon /></IconButton>
          </Stack>
        </Paper>

        

        <Paper elevation={0} sx={{ p: 3, mb: 4, border: "1px solid #e0e0e0", borderRadius: "12px" }}>

          <Typography variant="h6" sx={{ mb: 2.5, fontWeight: 'bold', color: '#1a237e' }}>

            Generate New Order

          </Typography>

          <form onSubmit={savePO}>

            <Grid container spacing={1.5} alignItems="center">

              <Grid item xs={12} sm={2.2}>

                <FormControl fullWidth size="small">

                  <InputLabel>Req.</InputLabel>

                  <Select value={form.requisitionId} label="Req." onChange={(e) => setForm({ ...form, requisitionId: e.target.value })}>

                    {reqs.map((r) => <MenuItem key={r.id} value={r.id}>#{r.id}</MenuItem>)}

                  </Select>

                </FormControl>

              </Grid>



              <Grid item xs={12} sm={1.2}>

                <FormControl fullWidth size="small">

                  <InputLabel>Vendor</InputLabel>

                  <Select value={form.vendorId} label="Vendor" onChange={(e) => setForm({ ...form, vendorId: e.target.value })}>

                    {vendors.map((v) => <MenuItem key={v.id} value={v.id}>{v.companyName}</MenuItem>)}

                  </Select>

                </FormControl>

              </Grid>



              <Grid item xs={12} sm={2.2}>

                <TextField fullWidth type="date" label="Order Date" size="small" InputLabelProps={{ shrink: true }} value={form.orderDate} onChange={(e) => setForm({ ...form, orderDate: e.target.value })} />

              </Grid>



              <Grid item xs={12} sm={2.2}>

                <TextField fullWidth type="date" label="Expected Delivery" size="small" InputLabelProps={{ shrink: true }} value={form.expectedDelivery} onChange={(e) => setForm({ ...form, expectedDelivery: e.target.value })} />

              </Grid>



              <Grid item xs={12} sm={1.6}>

                <TextField

                  fullWidth label="Total Amount" type="number" size="small"

                  value={form.totalAmount} onChange={(e) => setForm({ ...form, totalAmount: e.target.value })}

                  InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}

                />

              </Grid>



              <Grid item xs={12} sm={3}>

                <Button fullWidth variant="contained" type="submit" sx={{ bgcolor: "#1a237e", fontWeight: 'bold', py: 1 }}>

                   CONFIRM & CREATE ORDER

                </Button>

              </Grid>

            </Grid>

          </form>

        </Paper>
        
        <Paper elevation={0} sx={{ borderRadius: "12px", border: "1px solid #e0e0e0", overflow: "hidden" }}>
          <Table>
            <TableHead sx={{ bgcolor: "#43a047", "& .MuiTableCell-head": { color: "white", fontWeight: "bold", borderRight: "1px solid rgba(255,255,255,0.2)" } }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>PO Number</TableCell>
                <TableCell>Vendor</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {poList.map((p) => (
                <TableRow key={p.id} hover sx={{ "&:last-child td": { borderBottom: 0 } }}>
                  <TableCell sx={{ borderRight: '1px solid #eee' }}>#{p.id}</TableCell>
                  <TableCell sx={{ borderRight: '1px solid #eee', fontWeight: 'bold' }}>{p.poNumber}</TableCell>
                  <TableCell sx={{ borderRight: '1px solid #eee' }}>{p.vendor?.companyName}</TableCell>
                  <TableCell sx={{ borderRight: '1px solid #eee', color: '#1a237e', fontWeight: 'bold' }}>
                    
                    ₹ {isNaN(parseFloat(p.totalAmount)) ? "0" : parseFloat(p.totalAmount).toLocaleString()}
                  </TableCell>
                  <TableCell sx={{ borderRight: '1px solid #eee' }}>
                    <Chip 
                      label={p.status || "CREATED"} 
                      size="small" 
                      sx={{ 
                        bgcolor: "#fff3e0", 
                        color: "#ef6c00", 
                        fontWeight: 'bold', 
                        borderRadius: '6px' 
                      }} 
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Button variant="contained" size="small" onClick={() => getPO(p.id)} sx={{ bgcolor: '#1a237e', fontSize: '0.7rem' }}>EDIT</Button>
                      <Button variant="contained" size="small" color="error" onClick={() => { setSelectedId(p.id); setOpenDelete(true); }} sx={{ fontSize: '0.7rem' }}>DELETE</Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>

      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle sx={{ fontWeight: 'bold', color: '#d32f2f' }}>Cancel Purchase Order?</DialogTitle>
        <DialogContent><DialogContentText>Are you sure you want to delete PO #{selectedId}?</DialogContentText></DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Confirm Delete</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}