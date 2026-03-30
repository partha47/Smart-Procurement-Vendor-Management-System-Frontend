import React, { useEffect, useState } from "react";
import API from "../../api/axios";

import {
  Box, Typography, Paper, Table, TableHead, TableRow, TableCell,
  TableBody, Container, Chip
} from "@mui/material";

import AssessmentIcon from '@mui/icons-material/Assessment';

export default function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = () => {
    API.get("/reports/spend")
      .then(res => setReports(res.data))
      .catch(err => console.error(err));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#333", display: 'flex', alignItems: 'center', gap: 2 }}>
          <AssessmentIcon sx={{ fontSize: 40, color: "#1976d2" }} />
          Company Spend Report
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Overview of total company spend and purchase orders
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ borderRadius: "12px", border: "1px solid #e0e0e0", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
        <Table>
          <TableHead sx={{ bgcolor: "#fafafa",background:'#1976d2' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>PO NUMBER</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>ORDER DATE</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>VENDOR</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.length > 0 ? reports.map((po) => (
              <TableRow key={po.id} hover>
                <TableCell sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>#{po.poNumber}</TableCell>
                <TableCell>{po.orderDate}</TableCell>
                <TableCell>{po.vendor?.companyName || po.vendor?.email}</TableCell>
                <TableCell>
                  <Chip
                    label={po.status} size="small"
                    sx={{
                      fontWeight: 'bold', borderRadius: '6px', fontSize: '0.7rem',
                      bgcolor: po.status === "COMPLETED" || po.status === "APPROVED" ? "#e8f5e9" : "#fff3e0",
                      color: po.status === "COMPLETED" || po.status === "APPROVED" ? "#2e7d32" : "#ef6c00"
                    }}
                  />
                </TableCell>
              </TableRow>
            )) : <TableRow><TableCell colSpan={4} align="center" sx={{ py: 4 }}>No reports available.</TableCell></TableRow>}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}