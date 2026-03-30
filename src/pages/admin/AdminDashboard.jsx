import React from "react";
import { useNavigate, useLocation,Link } from "react-router-dom";

import {
 Box, 
 Drawer, 
 AppBar, 
 Toolbar, 
 Typography, 
 List, 
 ListItemButton,
 ListItemIcon, 
 ListItemText,
 Divider, 
 Button, 
 Grid, 
 Paper,
 Avatar
} from "@mui/material";

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import InventoryIcon from '@mui/icons-material/Inventory';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const drawerWidth = 260;

function StatCard({ title, value, color }) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          borderRadius: 3, 
          borderLeft: `6px solid ${color}`, 
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          bgcolor: 'white' 
        }}
      >
        <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ mt: 1, fontWeight: 'bold', color: '#333' }}>
          {value}
        </Typography>
      </Paper>
    </Grid>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const menuItems = [
    { text: "Roles", icon: <VerifiedUserIcon />, path: "/master/roles" },
    { text: "Departments", icon: <BusinessCenterIcon />, path: "/master/departments" },
    { text: "Users", icon: <PeopleIcon />, path: "/master/users" },
  ];

  const procurementItems = [
    { text: "Items", icon: <InventoryIcon />, path: "/admin/items" },
    { text: "Purchase Order", icon: <ShoppingCartIcon />, path: "/admin/PurchaseOrder" },
    {text: "Inventory",icon:<InventoryIcon/> ,path:"/admin/Inventory"},
    { text: "Vendor Approval", icon: <VerifiedUserIcon />, path: "/admin/VendorApproval" },
  ];

  return (
    <Box sx={{ display: "flex", bgcolor: "#f4f7f6", minHeight: "100vh" }}>
      
      <AppBar
        position="fixed"
        elevation={0} sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: "white",
        color: "text.primary",
        borderBottom: "1px solid #e0e0e0"
      }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            SMART <span style={{ color: '#333' }}>PROCURE</span>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">Welcome, <b>Admin</b></Typography>
            <Avatar sx={{ bgcolor: '#1976d2', width: 32, height: 32 }}>A</Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box", border: 'none', boxShadow: '2px 0 10px rgba(0,0,0,0.05)' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", display: 'flex', flexDirection: 'column', height: '100%' }}>
          <List>
            <Typography variant="overline" sx={{ px: 3, fontWeight: 'bold', color: 'text.secondary' }}>Master Data</Typography>
            {menuItems.map((item) => (
              <ListItemButton 
                key={item.text} 
                component={Link} 
                to={item.path}
                selected={location.pathname === item.path}
                sx={{ mx: 1, borderRadius: 2, mb: 0.5 }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: location.pathname === item.path ? '#1976d2' : 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '0.9rem' }} />
              </ListItemButton>
            ))}
          </List>

          <Divider sx={{ my: 1, mx: 2 }} />

          <List>
            <Typography variant="overline" sx={{ px: 3, fontWeight: 'bold', color: 'text.secondary' }}>Procurement</Typography>
            {procurementItems.map((item) => (
              <ListItemButton 
                key={item.text} 
                component={Link} 
                to={item.path}
                selected={location.pathname === item.path}
                sx={{ mx: 1, borderRadius: 2, mb: 0.5 }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: location.pathname === item.path ? '#1976d2' : 'inherit' }}>
                  {item.icon}
                  </ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '0.9rem' }} />
              </ListItemButton>
            ))}
          </List>

          <Box sx={{ mt: 'auto', p: 2 }}>
             <Button fullWidth variant="outlined" color="error" startIcon={<LogoutIcon />} onClick={logout}>
             Logout
             </Button>
          </Box>
        </Box>
      </Drawer>


      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        <Toolbar />
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
        {/* <DashboardIcon sx={{ fontSize: 40, color: "#1976d2" }} /> */}
        Dashboard Overview
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>Manage your vendors and procurement cycles.</Typography>

        <Grid container spacing={3}>
          <StatCard title="Pending Approvals" value="12" color="#ed6c02" />
          <StatCard title="Active Vendors" value="48" color="#1976d2" />
          <StatCard title="Total Orders" value="156" color="#2e7d32" />
          <StatCard title="Inventory Alerts" value="5" color="#d32f2f" />
        </Grid>
      </Box>
    </Box>
  );
}