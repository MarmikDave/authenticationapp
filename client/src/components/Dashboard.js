import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import AuthContext from "../context/AuthContext";

const tyrePurchaseData = [
  { name: "Apollo", new: 400, retread: 240, scrap: 240 },
  { name: "Bridgestone", new: 300, retread: 139, scrap: 221 },
  { name: "CEAT", new: 200, retread: 980, scrap: 229 },
  { name: "MRF", new: 278, retread: 390, scrap: 200 },
  { name: "JK Tyre", new: 189, retread: 480, scrap: 218 },
];

const monthWiseData = [
  { name: "Jan", purchase: 4000, retread: 2400, scrap: 2400 },
  { name: "Feb", purchase: 3000, retread: 1398, scrap: 2210 },
  { name: "Mar", purchase: 2000, retread: 9800, scrap: 2290 },
  { name: "Apr", purchase: 2780, retread: 3908, scrap: 2000 },
  { name: "May", purchase: 1890, retread: 4800, scrap: 2181 },
];

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/protected",
          {
            headers: { Authorization: token },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);
  

  return (
    <Container
      sx={{
        backgroundColor: "#1e1e1e",
        color: "#fff",
        padding: "20px",
        borderRadius: "8px",
        height:"100vh",
        overflow:"auto",
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: "#333" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={() => logout(navigate)}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: "#333", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6">Summary</Typography>
              <Typography>Total Vehicles: 220</Typography>
              <Typography>Total Tyres: 456</Typography>
              <Typography>Tyres on Wheel: 345</Typography>
              {/* Add more summary items here */}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: "#333", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6">Alerts</Typography>
              <Typography>Unidentified Tyre: 35</Typography>
              <Typography>Missing Tyre: 122</Typography>
              <Typography>Low NSD: 89</Typography>
              {/* Add more alert items here */}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: "#333", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6">Tyre Inventory</Typography>
              <TableContainer
                component={Paper}
                sx={{ backgroundColor: "#333", color: "#fff" }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "#fff" }}>Size</TableCell>
                      <TableCell sx={{ color: "#fff" }}>New</TableCell>
                      <TableCell sx={{ color: "#fff" }}>Retread</TableCell>
                      <TableCell sx={{ color: "#fff" }}>Scrap</TableCell>
                      <TableCell sx={{ color: "#fff" }}>Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ color: "#fff" }}>8-16</TableCell>
                      <TableCell sx={{ color: "#fff" }}>45</TableCell>
                      <TableCell sx={{ color: "#fff" }}>69</TableCell>
                      <TableCell sx={{ color: "#fff" }}>185</TableCell>
                      <TableCell sx={{ color: "#fff" }}>299</TableCell>
                    </TableRow>
                    {/* Add more rows here */}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        <Grid item xs={12}>
          <Card sx={{ backgroundColor: "#333", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6">Pending Actions</Typography>
              <TableContainer
                component={Paper}
                sx={{ backgroundColor: "#333", color: "#fff" }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "#fff" }}>Date</TableCell>
                      <TableCell sx={{ color: "#fff" }}>
                        Action Category
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }}>Tyre ID</TableCell>
                      <TableCell sx={{ color: "#fff" }}>Brand</TableCell>
                      <TableCell sx={{ color: "#fff" }}>Model</TableCell>
                      <TableCell sx={{ color: "#fff" }}>Size</TableCell>
                      <TableCell sx={{ color: "#fff" }}>Vehicle No.</TableCell>
                      <TableCell sx={{ color: "#fff" }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ color: "#fff" }}>22 Aug 24</TableCell>
                      <TableCell sx={{ color: "#fff" }}>Inspection</TableCell>
                      <TableCell sx={{ color: "#fff" }}>
                        CZ68031332021
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }}>Bridgestone</TableCell>
                      <TableCell sx={{ color: "#fff" }}>XYZ123PQR</TableCell>
                      <TableCell sx={{ color: "#fff" }}>100/20</TableCell>
                      <TableCell sx={{ color: "#fff" }}>
                        RJ 13 SR 2299
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }}>Completed</TableCell>
                    </TableRow>
                    {/* Add more rows here */}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: "#333", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6">Tyre Purchases</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={tyrePurchaseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="new" fill="#8884d8" />
                  <Bar dataKey="retread" fill="#82ca9d" />
                  <Bar dataKey="scrap" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: "#333", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6">Month Wise</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthWiseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="purchase" fill="#8884d8" />
                  <Bar dataKey="retread" fill="#82ca9d" />
                  <Bar dataKey="scrap" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
